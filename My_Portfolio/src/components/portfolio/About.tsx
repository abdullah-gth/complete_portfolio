import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Download } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";
import { API_BASE } from "@/lib/api";
import defaultProfileImg from "@/assets/abdullah.jpg";

const About = () => {
  const playClick = useClickSound();
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const configRes = await fetch(`${API_BASE}/config/`);
        const configResult = await configRes.json();
        if (configResult.success && configResult.data?.cv_download_url) {
          setCvUrl(`${API_BASE.replace("/api", "")}${configResult.data.cv_download_url}`);
        }
      } catch (error) {
        console.error("Config fetch error:", error);
      }
    };
    
    const fetchAboutData = async () => {
      try {
        const res = await fetch(`${API_BASE}/about/`);
        const result = await res.json();
        if (result.success && result.data) {
          setAboutData(result.data);
        }
      } catch (error) {
        console.error("About fetch error:", error);
      }
    };
    
    fetchConfig();
    fetchAboutData();
  }, []);

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <div className="absolute -inset-4 gradient-primary rounded-3xl blur-2xl opacity-15" />
          <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5] max-w-md mx-auto">
            <img
              src={aboutData?.profile_image ? `${API_BASE.replace("/api", "")}${aboutData.profile_image}` : defaultProfileImg}
              alt={aboutData?.badge_text || "About Abdullah"}
              loading="lazy"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            {aboutData?.badge_text || "About Me"}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            {aboutData?.title || "Building digital experiences that"} <span className="gradient-text">{aboutData?.title_highlight || "drive results"}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {aboutData?.description_1 || "I'm Abdullah, a passionate Full Stack Developer with over a year of hands-on experience crafting modern web applications. I specialize in turning complex problems into clean, scalable code and intuitive user experiences."}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {aboutData?.description_2 || "From sleek landing pages to full-scale web apps with secure authentication and APIs, I help businesses around the world ship products that look great and perform even better."}
          </p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {aboutData?.stats?.map((s: any, idx: number) => {
              const iconStr = s.icon_name || "Star";
              const iconName = iconStr.charAt(0).toUpperCase() + iconStr.slice(1);
              const Icon = (Icons as any)[iconName] || (Icons as any).Star;
              return (
                <div
                  key={idx}
                  className="bg-background rounded-2xl p-4 shadow-card border border-border text-center hover:-translate-y-1 transition-spring"
                >
                  <Icon className="mx-auto mb-2 text-primary" size={22} />
                  <div className="text-xl font-bold">{s.value || ""}</div>
                  <div className="text-xs text-muted-foreground">{s.label || ""}</div>
                </div>
              );
            })}
          </div>

          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-primary text-primary-foreground font-semibold shadow-md hover:shadow-glow hover:-translate-y-0.5 transition-spring mt-2"
            >
              <Download size={18} />
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
