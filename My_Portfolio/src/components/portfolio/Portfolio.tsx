import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";
import { API_BASE } from "@/lib/api";

const Portfolio = () => {
  const playClick = useClickSound();
  const [portfolioData, setPortfolioData] = useState<any>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects-config/`);
        const result = await res.json();
        if (result.success && result.data) {
          setPortfolioData(result.data);
        }
      } catch (error) {
        console.error("Portfolio fetch error:", error);
      }
    };
    fetchPortfolio();
  }, []);
  return (
    <section id="portfolio" className="section-padding gradient-soft">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {portfolioData?.badge_text || "Recent Work"}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {portfolioData?.title || "Featured"} <span className="gradient-text">{portfolioData?.title_highlight || "projects"}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {portfolioData?.description || "A selection of products I've designed and built for clients across the globe."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {portfolioData?.projects?.map((p: any) => (
            <article
              key={p.id}
              className="group bg-background rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-elegant hover:-translate-y-2 transition-spring"
            >
              <div className="aspect-video overflow-hidden bg-secondary">
                <img
                  src={p.image ? `${API_BASE.replace("/api", "")}${p.image}` : p.image_url}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full h-full object-cover group-hover:scale-105 transition-spring"
                />
              </div>
              <div className="p-6 space-y-4 flex flex-col justify-between h-[calc(100%-56.25%)]">
                <div>
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack?.map((t: string) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2 mt-auto">
                  {p.live_url && (
                    <a
                      href={p.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full gradient-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-spring"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                  {p.github_url && (
                    <a
                      href={p.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/80 transition-spring"
                    >
                      <Github size={15} /> Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
