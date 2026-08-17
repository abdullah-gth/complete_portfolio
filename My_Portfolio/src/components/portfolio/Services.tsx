import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { API_BASE } from "@/lib/api";

const Services = () => {
  const [servicesData, setServicesData] = useState<any>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE}/services-config/`);
        const result = await res.json();
        if (result.success && result.data) {
          setServicesData(result.data);
        }
      } catch (error) {
        console.error("Services fetch error:", error);
      }
    };
    fetchServices();
  }, []);

  if (!servicesData) return null;

  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {servicesData?.badge_text || "My Services"}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {servicesData?.title || "What I"} <span className="gradient-text">{servicesData?.title_highlight || "Offer"}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {servicesData?.description || "I offer a full range of web development services to help you build and grow your digital presence."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData?.services?.map((s: any) => {
            const iconStr = s.icon_name || "Code";
            const iconName = iconStr.charAt(0).toUpperCase() + iconStr.slice(1);
            const Icon = (Icons as any)[iconName] || (Icons as any).Code;
            
            return (
              <div
                key={s.title}
                className="group bg-background rounded-3xl p-8 shadow-card border border-border hover:shadow-elegant hover:-translate-y-2 transition-spring relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500 ease-out" />
                
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon size={30} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
