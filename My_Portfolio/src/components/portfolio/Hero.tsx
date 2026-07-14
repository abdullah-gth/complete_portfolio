import { useEffect, useState } from "react";
import { ArrowRight, Briefcase, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";
import { API_BASE } from "@/lib/api";
import profileImg from "@/assets/abdullah.jpg";

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

const phrases = [
  "Full Stack Developer",
  "React Specialist",
  "API Architect",
  "Problem Solver",
];

const Hero = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [dynamicPhrases, setDynamicPhrases] = useState<string[]>(phrases);
  
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const playClick = useClickSound();  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroRes = await fetch(`${API_BASE}/hero/`);
        const heroResult = await heroRes.json();
        
        if (heroResult.success && heroResult.data) {
          setHeroData(heroResult.data);
          const phrasesArray = heroResult.data.typing_phrases
            .split(",")
            .map((p: string) => p.trim())
            .filter((p: string) => p.length > 0);
          if (phrasesArray.length > 0) {
            setDynamicPhrases(phrasesArray);
          }
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const current = dynamicPhrases[phraseIdx] || "";
    const speed = deleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setPhraseIdx((p) => (p + 1) % dynamicPhrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIdx, dynamicPhrases]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden gradient-hero"
    >
      {}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
            <Sparkles size={14} />
            {heroData?.badge_text || "Available for work"}
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
            {heroData?.greeting || "Hi, I'm"} <span className="gradient-text">{heroData?.name || "Abdullah"}</span>
          </h1>

          <div className="text-2xl md:text-3xl font-semibold text-foreground/80 h-10">
            {text}
            <span className="inline-block w-0.5 h-7 bg-primary ml-1 align-middle animate-blink" />
          </div>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {heroData?.description || "I craft fast, beautiful, and scalable web applications with 1+ year of hands-on experience building modern digital products that help businesses grow."}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                playClick();
                scrollToSection("#contact");
              }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-primary text-primary-foreground font-semibold shadow-md hover:shadow-glow hover:-translate-y-0.5 transition-spring"
            >
              <Briefcase size={18} />
              {heroData?.primary_btn_text || "Hire Me"}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-smooth"
              />
            </a>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#portfolio");
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-background border-2 border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-smooth"
            >
              {heroData?.secondary_btn_text || "View Portfolio"}
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4">
            {heroData?.social_links?.map((link: any, idx: number) => {
              const iconName = link.name.charAt(0).toUpperCase() + link.name.slice(1).toLowerCase();
              const Icon = (Icons as any)[iconName] || (Icons as any).Link;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-background border border-border hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-spring shadow-sm"
                  aria-label={link.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end animate-scale-in">
          <div className="relative">
            <div className="absolute -inset-6 gradient-primary rounded-full blur-2xl opacity-25" />
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-background shadow-elegant">
              <img
                src={heroData?.profile_image || profileImg}
                alt="Abdullah - Full Stack Developer"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl shadow-card px-5 py-3 flex items-center gap-3 animate-float">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold">{heroData?.status_badge || "Open to work"}</span>
            </div>
            <div className="absolute -top-4 -right-4 bg-background rounded-2xl shadow-card px-5 py-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-2xl font-bold gradient-text">{heroData?.stats_number || "15+"}</div>
              <div className="text-xs text-muted-foreground">{heroData?.stats_text || "Projects"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
