import { useState, useEffect } from "react";
import { z } from "zod";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";
import { toast } from "sonner";
import { API_BASE } from "@/lib/api";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("techbyabdullah9@gmail.com");
  const [contactData, setContactData] = useState<any>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const playClick = useClickSound();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, contactRes] = await Promise.all([
          fetch(`${API_BASE}/config/`),
          fetch(`${API_BASE}/contact-config/`)
        ]);
        
        const configResult = await configRes.json();
        if (configResult.success && configResult.data) {
          setWhatsappNumber(configResult.data.whatsapp || "");
          if (configResult.data.email) {
            setEmailAddress(configResult.data.email);
          }
        }

        const contactResult = await contactRes.json();
        if (contactResult.success && contactResult.data) {
          setContactData(contactResult.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const cleanNumber = (whatsappNumber || "").replace(/\D/g, "");

  const whatsappLink =
    cleanNumber && cleanNumber.length >= 10
      ? `https://wa.me/${cleanNumber}?text=Hi%20Abdullah,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`
      : "https://wa.me/923191814826?text=Hi%20Abdullah,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    const result = schema.safeParse(data);

    if (!result.success) {
      const errs: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        errs[issue.path[0] as string] = issue.message;
      });

      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: "Portfolio Inquiry",
          message: data.message,
        }),
      });

      const resultData = await response.json();

      if (!response.ok || !resultData.success) {
        toast.error(resultData.error || "Failed to send message");
        return;
      }
      toast.success("Message sent successfully!", {
        icon: <CheckCircle2 className="text-green-500" size={20} />,
      });

      setData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error("Contact API Error:", error);
      toast.error("Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding gradient-soft">
      <div className="max-w-6xl mx-auto">

        {}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {contactData?.badge_text || "Get In Touch"}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {contactData?.title || "Let's"} <span className="gradient-text">{contactData?.title_highlight || "work together"}</span>
          </h2>

          <p className="text-muted-foreground text-lg">
            {contactData?.description || "Have a project in mind? Send a message and I'll respond within 24 hours."}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">

          {}
          <div className="md:col-span-2 space-y-4">

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="flex items-center gap-4 p-5 bg-background rounded-2xl shadow-card border border-border hover:shadow-elegant hover:-translate-y-1 transition-spring"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
                <i className="fa-brands fa-whatsapp text-3xl"></i>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Chat on</div>
                <div className="font-semibold">WhatsApp</div>
              </div>
            </a>

            <a
              href={`mailto:${emailAddress}`}
              className="flex items-center gap-4 p-5 bg-background rounded-2xl shadow-card border border-border hover:shadow-elegant hover:-translate-y-1 transition-spring"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Mail size={22} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email me at</div>
                <div className="font-semibold">{emailAddress}</div>
              </div>
            </a>

          </div>

          {}
          <form
            onSubmit={onSubmit}
            className="md:col-span-3 bg-background rounded-3xl p-7 md:p-9 shadow-card border border-border space-y-5"
          >

            <input
              type="text"
              placeholder="Your Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

            <input
              type="email"
              placeholder="Email Address"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <textarea
              rows={5}
              placeholder="Project Details"
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary resize-none"
            />
            {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-7 py-3.5 rounded-full gradient-primary text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;