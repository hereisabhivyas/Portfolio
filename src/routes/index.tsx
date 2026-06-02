import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import brozoneAdminPayments from "@/assets/Brozone(admin)/Screenshot 2026-05-30 130708.png";
import brozoneAdminDashboard from "@/assets/Brozone(admin)/Screenshot 2026-05-30 130657.png";
import brozoneAdminAlt from "@/assets/Brozone(admin)/Screenshot 2026-05-30 130632.png";
import brozoneUserHome from "@/assets/Brozone(user)/Screenshot 2026-05-30 124720.png";
import brozoneUserBrowse from "@/assets/Brozone(user)/Screenshot 2026-05-30 124912.png";
import brozoneUserEventsAlt from "@/assets/Brozone(user)/Screenshot 2026-05-30 125048.png";
import brozoneUserVenueAlt from "@/assets/Brozone(user)/Screenshot 2026-05-30 125944.png";
import brozoneUserEvents from "@/assets/Brozone(user)/Screenshot 2026-05-30 130015.png";
import sereneAdminRooms from "@/assets/Serene stays(admin)/Screenshot 2026-05-30 130737.png";
import sereneAdminManagement from "@/assets/Serene stays(admin)/Screenshot 2026-05-30 130753.png";
import sereneAdminHistory from "@/assets/Serene stays(admin)/Screenshot 2026-05-30 130747.png";
import sereneAdminGallery from "@/assets/Serene stays(admin)/Screenshot 2026-05-30 130801.png";
import sereneUserBooking from "@/assets/Serene stays(user)/Screenshot 2026-05-30 130818.png";
import sereneUserRoom from "@/assets/Serene stays(user)/Screenshot 2026-05-30 130829.png";
import sereneUserFind from "@/assets/Serene stays(user)/Screenshot 2026-05-30 130839.png";
import sereneUserReviews from "@/assets/Serene stays(user)/Screenshot 2026-05-30 130852.png";
import sereneUserGallery from "@/assets/Serene stays(user)/Screenshot 2026-05-30 130900.png";
import sereneUserLocation from "@/assets/Serene stays(user)/Screenshot 2026-05-30 130914.png";
import sereneUserRooms from "@/assets/Serene stays(user)/Screenshot 2026-05-30 130921.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abhishek Vyas — Product UI & Booking Systems" },
      { name: "description", content: "Portfolio of booking platforms, admin dashboards, and guest experiences for Brozone and Serene Stays." },
      { property: "og:title", content: "Abhishek Vyas — Product UI & Booking Systems" },
      { property: "og:description", content: "Portfolio of booking platforms, admin dashboards, and guest experiences for Brozone and Serene Stays." },
    ],
  }),
  component: Index,
});

type ProjectGallery = {
  title: string;
  subtitle: string;
  tag: string;
  deployedUrl: string;
  preview: string;
  gallery: Array<{ src: string; alt: string }>;
};

const projects: ProjectGallery[] = [
  {
    title: "Brozone Admin",
    subtitle: "Payments, host requests, and booking operations.",
    tag: "Admin dashboard",
    deployedUrl: "https://bookitadmin.vercel.app",
    preview: brozoneAdminPayments,
    gallery: [
      { src: brozoneAdminPayments, alt: "Brozone admin payment history screenshot" },
      { src: brozoneAdminDashboard, alt: "Brozone admin dashboard screenshot" },
      { src: brozoneAdminAlt, alt: "Brozone admin overview screenshot" },
      { src: brozoneUserHome, alt: "Brozone guest home screenshot" },
    ],
  },
  {
    title: "Brozone Guest",
    subtitle: "Event discovery and venue booking for users.",
    tag: "Consumer app",
    deployedUrl: "https://bookit-cyan.vercel.app",
    preview: brozoneUserHome,
    gallery: [
      { src: brozoneUserHome, alt: "Brozone guest home screenshot" },
      { src: brozoneUserEvents, alt: "Brozone events browse screenshot" },
      { src: brozoneUserBrowse, alt: "Brozone venue listing screenshot" },
      { src: brozoneUserEventsAlt, alt: "Brozone events categories screenshot" },
      { src: brozoneUserVenueAlt, alt: "Brozone venue detail screenshot" },
    ],
  },
  {
    title: "Serene Stays Admin",
    subtitle: "Room details, booking history, and hotel management.",
    tag: "Operations",
    deployedUrl: "https://serene-stay-qzsv.vercel.app",
    preview: sereneAdminRooms,
    gallery: [
      { src: sereneAdminRooms, alt: "Serene Stays admin room details screenshot" },
      { src: sereneAdminManagement, alt: "Serene Stays hotel management screenshot" },
      { src: sereneAdminHistory, alt: "Serene Stays booking history screenshot" },
      { src: sereneAdminGallery, alt: "Serene Stays image gallery screenshot" },
    ],
  },
  {
    title: "Serene Stays Guest",
    subtitle: "Reservation and inquiry flows for guests.",
    tag: "Booking flow",
    deployedUrl: "https://serene-stay-nu.vercel.app",
    preview: sereneUserBooking,
    gallery: [
      { src: sereneUserBooking, alt: "Serene Stays reservation form screenshot" },
      { src: sereneUserRoom, alt: "Serene Stays room and rates screenshot" },
      { src: sereneUserFind, alt: "Serene Stays contact page screenshot" },
      { src: sereneUserReviews, alt: "Serene Stays reviews screenshot" },
      { src: sereneUserGallery, alt: "Serene Stays gallery screenshot" },
      { src: sereneUserLocation, alt: "Serene Stays location screenshot" },
      { src: sereneUserRooms, alt: "Serene Stays rooms listing screenshot" },
    ],
  },
];

function Index() {
  const [activeProject, setActiveProject] = useState<ProjectGallery | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60 grain">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <p className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-block h-px w-10 bg-foreground/40" />
              Portfolio / 2026
            </p>
            <h1 className="font-display text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl lg:text-[88px]">
              I design <em className="font-serif italic text-muted-foreground">booking</em>,<br />
              dashboard, and guest<br />
              experiences that <span className="underline decoration-2 underline-offset-[10px]">feel calm</span>.
            </h1>
            <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
              Hi, I'm Abhishek Vyas. I build product UI for booking platforms,
              admin dashboards, and customer-facing flows. The latest work below
              comes from Brozone and Serene Stays.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Book a free consult
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <a href="#work" className="text-sm underline underline-offset-4 hover:opacity-60">
                See the work
              </a>
            </div>
          </div>

          <div className="relative md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: brozoneAdminDashboard, alt: "Brozone admin dashboard screenshot" },
                { src: brozoneUserEvents, alt: "Brozone user event discovery screenshot" },
                { src: sereneAdminManagement, alt: "Serene Stays admin management screenshot" },
                { src: sereneUserGallery, alt: "Serene Stays guest gallery screenshot" },
              ].map((image, index) => (
                <img
                  key={image.alt}
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  className={`aspect-[4/3] w-full rounded-2xl object-cover shadow-lg ${index === 0 || index === 3 ? "translate-y-6" : ""}`}
                />
              ))}
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-full bg-foreground px-4 py-2 text-xs uppercase tracking-widest text-background">
              4 live interfaces
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden border-t border-border/60 py-6">
          <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl tracking-tight md:text-3xl">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12">
                {["Brozone", "Serene Stays", "Dashboards", "Booking flows", "Guest apps", "Admin tools", "Reservation UI", "Operations"].map((w) => (
                  <span key={w} className="flex items-center gap-12">
                    {w} <span className="text-muted-foreground">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Selected work</p>
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">Recent projects.</h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            Real product screens from the Brozone and Serene Stays builds,
            showing both the guest side and the admin side of each system.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <Dialog key={p.title} open={activeProject?.title === p.title} onOpenChange={(open) => setActiveProject(open ? p : null)}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group relative overflow-hidden rounded-sm border border-border bg-secondary text-left hover-lift"
                >
                  <img
                    src={p.preview}
                    alt={`${p.title} — ${p.subtitle}`}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-background opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">{p.tag}</p>
                    <h3 className="font-display text-xl">{p.title}</h3>
                    <p className="text-sm opacity-80">{p.subtitle}</p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.25em] opacity-80">Click to view more screens</p>
                  </div>
                  <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-widest text-foreground">
                    {p.tag}
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl tracking-tight md:text-4xl">
                    <a
                      href={p.deployedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 underline decoration-1 underline-offset-4 hover:opacity-70"
                    >
                      {p.title}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </DialogTitle>
                  <DialogDescription className="text-base">{p.subtitle}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 xl:grid-cols-3">
                  {p.gallery.map((image) => (
                    <figure key={image.alt} className="overflow-hidden rounded-2xl border border-border bg-secondary">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </figure>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-border/60 bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">A builder, not a vendor.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed md:col-span-7 md:col-start-6">
            <p>
              I build booking systems and operational dashboards for product
              teams that need both polished guest experiences and clean admin
              tools.
            </p>
            <p>
              My focus is the messy middle: the host workflows, the booking
              states, the payment histories, and the interfaces staff need to
              trust every day.
            </p>
            <dl className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Based</dt>
                <dd className="mt-1 font-display text-lg">Gandhinagar</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Role</dt>
                <dd className="mt-1 font-display text-lg">Product UI</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Studying</dt>
                <dd className="mt-1 font-display text-lg">CS @ PDEU</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-20 md:flex-row md:items-center">
          <h2 className="font-display text-4xl tracking-tight md:text-6xl">
            Need a booking<br />experience that feels clean?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
          >
            Let's talk →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
