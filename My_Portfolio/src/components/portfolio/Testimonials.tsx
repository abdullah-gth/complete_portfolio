import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Mitchell",
    role: "Founder, BloomCo",
    text: "Abdullah delivered our entire web app ahead of schedule. The code quality, design, and communication were absolutely top-tier. Highly recommended!",
  },
  {
    name: "David Anderson",
    role: "CTO, NexaTech",
    text: "Working with Abdullah was a game-changer. He understood our vision instantly and built a fast, scalable platform that our customers love.",
  },
  {
    name: "Aisha Khan",
    role: "Product Manager, Lumen",
    text: "Pixel-perfect, performant, and beautifully animated. Abdullah's attention to detail makes him stand out from any developer I've hired before.",
  },
];

const Testimonials = () => (
  <section className="section-padding">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          Testimonials
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          What clients <span className="gradient-text">are saying</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-7">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="relative bg-background rounded-3xl p-8 shadow-card border border-border hover:shadow-elegant hover:-translate-y-2 transition-spring"
          >
            <Quote className="absolute top-6 right-6 text-primary/20" size={42} />
            <div className="flex gap-1 mb-4 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">"{r.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                {r.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
