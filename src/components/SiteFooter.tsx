export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center">
        <p className="font-display text-2xl tracking-tight">Abhishek Vyas</p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} — Booking systems, dashboards, and guest experiences.
        </p>
      </div>
    </footer>
  );
}
