import { useEffect, useState } from "react";

const Loader = () => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        </div>
        <div className="text-lg font-bold font-[Poppins]">
          <span className="gradient-text">Abdullah</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
