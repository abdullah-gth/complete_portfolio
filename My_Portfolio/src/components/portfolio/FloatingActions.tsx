import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";
import { API_BASE } from "@/lib/api";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const smoothScrollToTop = () => {
  const start = window.scrollY;
  const duration = Math.min(Math.max(start * 0.6, 600), 1200);
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

export const FloatingActions = () => {
  const [show, setShow] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const playClick = useClickSound();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${API_BASE}/config/`);
        const result = await response.json();

        if (result.success && result.data?.whatsapp) {
          setWhatsappNumber(result.data.whatsapp);
        }
      } catch (error) {
        console.error("WhatsApp fetch error:", error);
      }
    };

    fetchConfig();

    const onScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);


const cleanNumber = (whatsappNumber || "").replace(/\D/g, "");

  const whatsappLink =
    cleanNumber && cleanNumber.length >= 10
      ? `https://wa.me/${cleanNumber}?text=Hi%20Abdullah,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`
      : "https://wa.me/923191814826?text=Hi%20Abdullah,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!";

  return (
    <>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={playClick}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-elegant hover:scale-110 transition-spring animate-float animate-pulse-ring"
      >
        <i className="fa-brands fa-whatsapp text-4xl"></i>
      </a>

      {show && (
        <button
          onClick={() => {
            smoothScrollToTop();
            playClick();
          }}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-md hover:shadow-glow hover:-translate-y-1 transition-spring animate-fade-in"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};