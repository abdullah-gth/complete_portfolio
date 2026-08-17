import { CheckCircle2 } from "lucide-react";

const pricingPackages = [
  {
    title: "Landing Page",
    price: "Rs 15,000",
    description: "Perfect for personal portfolios or product showcases.",
    features: [
      "Single Page Application",
      "Fully Responsive Design",
      "Contact Form Integration",
      "Basic SEO Setup",
      "3 Revisions",
    ],
    highlighted: false,
    cta: "Start Project",
  },
  {
    title: "Small Business",
    price: "Rs 35,000",
    description: "Ideal for small businesses needing a professional web presence.",
    features: [
      "Up to 5 Pages",
      "CMS Integration (Django/Sanity)",
      "Advanced SEO Optimization",
      "Social Media Integration",
      "1 Month Free Support",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    title: "E-Commerce",
    price: "Rs 75,000",
    description: "Complete online store to start selling your products.",
    features: [
      "Unlimited Products",
      "Payment Gateway Integration",
      "Admin Dashboard",
      "Order Management",
      "Customer Authentication",
    ],
    highlighted: false,
    cta: "Start Selling",
  },
  {
    title: "Custom Web App",
    price: "Let's Talk",
    description: "Complex tailored solutions for unique business models.",
    features: [
      "Full Stack Development",
      "Custom RESTful APIs",
      "Complex Database Architecture",
      "Scalable Infrastructure",
      "Dedicated Maintenance",
    ],
    highlighted: false,
    cta: "Get a Quote",
  }
];

const ServicesPricing = () => {
  return (
    <section id="services" className="section-padding relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Services & Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Web <span className="gradient-text">Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Clear, transparent pricing. From simple landing pages to complex full-stack web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-8 rounded-3xl transition-spring bg-background border ${
                pkg.highlighted 
                  ? "border-primary shadow-[0_0_40px_rgba(var(--primary),0.15)] md:-translate-y-4" 
                  : "border-border shadow-card hover:shadow-elegant hover:-translate-y-2"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Recommended
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-muted-foreground text-sm h-12">{pkg.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {pkg.price !== "Let's Talk" && <span className="text-sm font-medium text-muted-foreground">Starting from</span>}
                </div>
                <div className="text-3xl font-extrabold text-foreground mt-1">
                  {pkg.price}
                </div>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className={`w-full py-3 px-6 rounded-xl font-medium text-center transition-colors ${
                  pkg.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPricing;
