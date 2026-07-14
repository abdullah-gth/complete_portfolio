import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { API_BASE } from "@/lib/api";

const Skills = () => {
  const [skillsData, setSkillsData] = useState<any>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${API_BASE}/skills-config/`);
        const result = await res.json();
        if (result.success && result.data) {
          setSkillsData(result.data);
        }
      } catch (error) {
        console.error("Skills fetch error:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="section-padding gradient-soft">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {skillsData?.badge_text || "My Skills"}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {skillsData?.title || "Tools I use to"} <span className="gradient-text">{skillsData?.title_highlight || "build the web"}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {skillsData?.description || "A modern stack tuned for performance, scale, and beautiful user experiences."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData?.categories?.map((g: any) => {
            const iconStr = g.icon_name || "Star";
            const iconName = iconStr.charAt(0).toUpperCase() + iconStr.slice(1);
            const Icon = (Icons as any)[iconName] || (Icons as any).Star;
            
            return (
              <div
                key={g.title}
                className="group bg-background rounded-3xl p-7 shadow-card border border-border hover:shadow-elegant hover:-translate-y-2 transition-spring"
              >
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-spring">
                  <Icon size={26} />
                </div>
                <h3 className="text-xl font-bold mb-4">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.skills?.map((s: string) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
