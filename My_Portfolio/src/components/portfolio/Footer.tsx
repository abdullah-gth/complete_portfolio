import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";
import { API_BASE } from "@/lib/api";

const scrollToSection = (href: string) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const headerOffset = 80;
  const elPosition = el.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

const Footer = () => {
  const playClick = useClickSound();
  const [footerData, setFooterData] = useState<any>(null);
  const [quickLinks, setQuickLinks] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/footer/`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data) {
          setFooterData(result.data);
        }
      })
      .catch((err) => console.error("Failed to fetch footer data:", err));

    fetch(`${API_BASE}/navbar/`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data) {
          setQuickLinks(result.data.links || []);
        }
      })
      .catch((err) => console.error("Failed to fetch quick links:", err));
  }, []);

  return (
    <footer className="bg-foreground text-background py-14 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="text-2xl font-bold font-[Poppins]"
          >
            <span className="gradient-text">{footerData?.name || "Abdullah"}</span>
          </a>
          <p className="mt-4 text-background/70 leading-relaxed text-sm max-w-xs">
            {footerData?.description || "Full Stack Developer crafting modern, scalable web experiences for clients worldwide."}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm text-background/70">
            {quickLinks.map((l: any, idx: number) => (
              <li key={idx}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    playClick();
                    scrollToSection(l.href);
                  }}
                  className="hover:text-background transition-smooth"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <div className="flex gap-3">
            {footerData?.social_links?.map((link: any, idx: number) => {
              const iconName = link.name.charAt(0).toUpperCase() + link.name.slice(1).toLowerCase();
              const Icon = (Icons as any)[iconName] || (Icons as any).Link;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.name}
                  className="p-3 rounded-full bg-background/10 hover:bg-background hover:text-foreground transition-spring"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-background/10 text-center text-sm text-background/60">
        {footerData?.copyright_text || `© ${new Date().getFullYear()} Abdullah. All rights reserved.`}
      </div>
    </footer>
  );
};

export default Footer;
