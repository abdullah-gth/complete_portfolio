import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { API_BASE } from "@/lib/api";

const ServicesPricing = () => {
  const [pricingData, setPricingData] = useState<any>(null);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch(`${API_BASE}/pricing-config/`);
        const result = await res.json();
        if (result.success && result.data) {
          setPricingData(result.data);
        }
      } catch (error) {
        console.error("Pricing fetch error:", error);
      }
    };
    fetchPricing();
  }, []);

  if (!pricingData) return null;

  return (
    <section id="services" className="section-padding relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {pricingData.badge_text || "Services & Pricing"}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {pricingData.title || "Premium Web"} <span className="gradient-text">{pricingData.title_highlight || "Packages"}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {pricingData.description || "Clear, transparent pricing. From simple landing pages to complex full-stack web applications."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingData.packages?.map((pkg: any) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col p-6 rounded-3xl transition-all duration-500 bg-background border group ${
                pkg.highlighted 
                  ? "border-primary shadow-[0_0_40px_rgba(var(--primary),0.15)] md:-translate-y-4 hover:-translate-y-6 hover:shadow-[0_0_60px_rgba(var(--primary),0.25)]" 
                  : "border-border shadow-card hover:shadow-2xl hover:border-primary/40 hover:-translate-y-3"
              }`}
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

              {pkg.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Recommended
                  </span>
                </div>
              )}
              
              <div className="mb-4 relative z-10">
                <h3 className="text-xl font-bold mb-1.5 group-hover:text-primary transition-colors duration-300">{pkg.title}</h3>
                <p className="text-muted-foreground text-[13px] leading-snug min-h-[3rem]">{pkg.description}</p>
              </div>

              <div className="mb-5 relative z-10">
                <div className="flex items-baseline gap-1">
                  {pkg.price !== "Let's Talk" && <span className="text-xs font-medium text-muted-foreground">Starting from</span>}
                </div>
                <div className="text-3xl font-extrabold text-foreground mt-0.5 tracking-tight">
                  {pkg.price}
                </div>
              </div>

              <div className="flex-grow relative z-10">
                <ul className="space-y-2.5 mb-6">
                  {pkg.feature_list?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 bg-primary/10 p-0.5 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-[13px] text-foreground/80 font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-center transition-all duration-300 relative z-10 ${
                  pkg.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
                    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                }`}
              >
                {pkg.cta_text || "Start a Project"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPricing;
