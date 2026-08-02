export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center pt-28"
      role="status"
      aria-label="Loading"
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="size-2 animate-pulse rounded-full bg-brand" />
        …
      </div>
    </div>
  );
}
