import { useEffect, useState } from "react";
import { useClickSound } from "@/hooks/useClickSound";
import { Menu, X } from "lucide-react";
import { API_BASE } from "@/lib/api";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const scrollToSection = (href: string) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const headerOffset = 80;
  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  const distance = target - start;
  const duration = Math.min(Math.max(Math.abs(distance) * 0.6, 600), 1200);
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const Navbar = () => {
  const [config, setConfig] = useState<any>(null);
  const [links, setLinks] = useState([
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const playClick = useClickSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${API_BASE}/navbar/`);
        const result = await response.json();
        if (result.success && result.data) {
          setConfig(result.data);
          if (result.data.links && result.data.links.length > 0) {
            setLinks(result.data.links);
          }
        }
      } catch (error) {
        console.error("Failed to fetch navbar links:", error);
      }
    };
    fetchLinks();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick();
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl md:text-2xl font-bold font-[Poppins]"
        >
          <span className="gradient-text">{config?.logo_text || "Abdullah"}</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-smooth" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={config?.button_link || "#contact"}
          onClick={(e) => {
            if ((config?.button_link || "#contact").startsWith("#")) {
              handleNavClick(e, config?.button_link || "#contact");
            }
          }}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full gradient-primary text-primary-foreground text-sm font-semibold shadow-md hover:shadow-glow hover:-translate-y-0.5 transition-spring"
        >
          {config?.button_text || "Hire Me"}
        </a>

        <button
          onClick={() => {
            playClick();
            setOpen(!open);
          }}
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-smooth"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <ul className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="block py-2 text-base font-medium text-foreground hover:text-primary transition-smooth"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <a
              href={config?.button_link || "#contact"}
              onClick={(e) => {
                if ((config?.button_link || "#contact").startsWith("#")) {
                  handleNavClick(e, config?.button_link || "#contact");
                }
              }}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full gradient-primary text-primary-foreground font-semibold"
            >
              {config?.button_text || "Hire Me"}
            </a>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
