import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Abhishek Vyas" },
      {
        name: "description",
        content:
          "Get in touch about booking platforms, admin dashboards, or guest-facing product UI.",
      },
      { property: "og:title", content: "Contact — Abhishek Vyas" },
      {
        property: "og:description",
        content:
          "Get in touch about booking platforms, admin dashboards, or guest-facing product UI.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
        <h1 className="font-display text-5xl leading-[1] tracking-tight md:text-8xl">
          Let's build
          <br />
          something people <em className="font-serif italic text-muted-foreground">want to use</em>.
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Form */}
          <form
            suppressHydrationWarning
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setSending(true);
              try {
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                const payload = {
                  name: String(fd.get("name") ?? ""),
                  email: String(fd.get("email") ?? ""),
                  biz: String(fd.get("biz") ?? ""),
                  msg: String(fd.get("msg") ?? ""),
                };

                const res = await fetch("/api/send-email", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(payload),
                });

                const json = await res.json().catch(() => ({}));
                if (!res.ok) {
                  setError(json?.error ?? "Failed to send message");
                  setSent(false);
                } else {
                  setSent(true);
                }
              } catch (err: unknown) {
                setError(err instanceof Error ? err.message : String(err));
                setSent(false);
              } finally {
                setSending(false);
              }
            }}
            className="space-y-8 md:col-span-7"
          >
            {[
              { label: "Your name", id: "name", type: "text", placeholder: "Jane Doe" },
              { label: "Email", id: "email", type: "email", placeholder: "jane@business.com" },
              {
                label: "Project type",
                id: "biz",
                type: "text",
                placeholder: "Booking platform, admin dashboard, guest app",
              },
            ].map((f) => (
              <div key={f.id} className="border-b border-foreground/30 pb-3">
                <label
                  htmlFor={f.id}
                  className="block text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {f.label}
                </label>
                <input
                  suppressHydrationWarning
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  className="mt-2 w-full bg-transparent font-display text-2xl tracking-tight outline-none placeholder:text-foreground/20 md:text-3xl"
                />
              </div>
            ))}

            <div className="border-b border-foreground/30 pb-3">
              <label
                htmlFor="msg"
                className="block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Tell me about the project
              </label>
              <textarea
                suppressHydrationWarning
                id="msg"
                name="msg"
                required
                rows={4}
                placeholder="We need a clean booking flow with an admin panel and payment history…"
                className="mt-2 w-full resize-none bg-transparent font-display text-2xl tracking-tight outline-none placeholder:text-foreground/20 md:text-3xl"
              />
            </div>

            <button
              suppressHydrationWarning
              type="submit"
              disabled={sending}
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {sending ? "Sending…" : sent ? "Thanks — I'll reply soon" : "Send message"}
              <span className="transition group-hover:translate-x-1">→</span>
            </button>
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          </form>

          {/* Side */}
          <aside className="space-y-10 md:col-span-4 md:col-start-9">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Direct</p>
              <a
                href="mailto:abhivyas571@gmail.com"
                className="mt-2 block font-display text-2xl underline underline-offset-4 hover:opacity-60"
              >
                abhivyas571@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Based in</p>
              <p className="mt-2 font-display text-2xl">Gandhinagar, India</p>
              <p className="text-sm text-muted-foreground">Working with clients globally · IST</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</p>
              <ul className="mt-2 space-y-1 font-display text-xl">
                <li>
                  <a
                    href="https://www.linkedin.com/in/abhishek-vyas-67aa6b314/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline underline-offset-4"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/hereisabhivyas"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline underline-offset-4"
                  >
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:abhivyas571@gmail.com"
                    className="hover:underline underline-offset-4"
                  >
                    Email ↗
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-sm border border-foreground/30 p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Response time
              </p>
              <p className="mt-2 font-display text-lg">Usually within 24 hours.</p>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
