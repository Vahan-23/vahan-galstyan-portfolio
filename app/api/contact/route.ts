import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_MESSAGE_LENGTH = 4000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "text/plain",
]);

const hits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string
) {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage failed: ${body}`);
  }
}

async function sendTelegramAttachment(
  token: string,
  chatId: string,
  file: File,
  caption: string
) {
  const endpoint = file.type.startsWith("image/")
    ? "sendPhoto"
    : "sendDocument";
  const field = file.type.startsWith("image/") ? "photo" : "document";

  const form = new FormData();
  form.append("chat_id", chatId);
  form.append(field, file, file.name);
  if (caption) form.append("caption", caption.slice(0, 1024));

  const response = await fetch(
    `https://api.telegram.org/bot${token}/${endpoint}`,
    {
      method: "POST",
      body: form,
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram ${endpoint} failed: ${body}`);
  }
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "not_configured" },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Honeypot — bots fill this, humans never see it
  if (String(formData.get("website") || "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const goal = String(formData.get("goal") || "").trim();
  const budget = String(formData.get("budget") || "").trim();
  const timeline = String(formData.get("timeline") || "").trim();
  const attachment = formData.get("attachment");

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (!isValidEmail(email) || email.length > 200) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }
  // Need a goal selection and/or a written note
  if (!goal && message.length < 10) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }

  let file: File | null = null;
  if (attachment instanceof File && attachment.size > 0) {
    if (attachment.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "file_too_large" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(attachment.type)) {
      return NextResponse.json({ error: "file_type" }, { status: 400 });
    }
    file = attachment;
  }

  const text = [
    "New message from portfolio",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    goal ? `Need: ${goal}` : null,
    budget ? `Budget: ${budget}` : null,
    timeline ? `Timeline: ${timeline}` : null,
    file ? `Attachment: ${file.name}` : null,
    message ? "" : null,
    message || null,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    await sendTelegramMessage(token, chatId, text);

    if (file) {
      await sendTelegramAttachment(
        token,
        chatId,
        file,
        `${name} · ${file.name}`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("Contact form delivery failed:", detail);

    if (detail.includes("chat not found")) {
      return NextResponse.json({ error: "chat_not_found" }, { status: 502 });
    }

    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
