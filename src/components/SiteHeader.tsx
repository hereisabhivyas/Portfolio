import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isContact = location.pathname === "/contact";
  const [homeSection, setHomeSection] = useState<"projects" | "about">("projects");

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const setSectionFromScroll = () => {
      const aboutSection = document.getElementById("about");
      if (!aboutSection) {
        setHomeSection("projects");
        return;
      }

      const activateAboutAt = 140;
      const aboutTop = aboutSection.getBoundingClientRect().top;
      setHomeSection(aboutTop <= activateAboutAt ? "about" : "projects");
    };

    setSectionFromScroll();
    window.addEventListener("scroll", setSectionFromScroll, { passive: true });
    window.addEventListener("resize", setSectionFromScroll);

    return () => {
      window.removeEventListener("scroll", setSectionFromScroll);
      window.removeEventListener("resize", setSectionFromScroll);
    };
  }, [isHome]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          Abhishek<span className="text-muted-foreground">.</span>
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          <Link
            to="/"
            className={`relative pb-1 transition-opacity duration-300 hover:opacity-60 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-out ${isHome && homeSection === "projects" ? "after:scale-x-100 nav-underline-active" : "after:scale-x-0"}`}
            activeOptions={{ exact: true }}
          >
            Projects
          </Link>
          <a
            href="/#about"
            className={`relative pb-1 transition-opacity duration-300 hover:opacity-60 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-out ${isHome && homeSection === "about" ? "after:scale-x-100 nav-underline-active" : "after:scale-x-0"}`}
          >
            About
          </a>
          <Link
            to="/contact"
            className={`relative pb-1 transition-opacity duration-300 hover:opacity-60 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-out ${isContact ? "after:scale-x-100 nav-underline-active" : "after:scale-x-0"}`}
          >
            Contact
          </Link>
        </nav>
        <Link
          to="/contact"
          className="rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
        >
          Book a call
        </Link>
      </div>
    </header>
  );
}
