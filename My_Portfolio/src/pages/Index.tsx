import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Portfolio from "@/components/portfolio/Portfolio";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import { FloatingActions } from "@/components/portfolio/FloatingActions";
import Loader from "@/components/portfolio/Loader";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Abdullah — Full Stack Developer | Hire Me";
    const meta = document.querySelector('meta[name="description"]');
    const content =
      "Abdullah is a Full Stack Developer building fast, modern, and scalable web applications with React, Node.js, Django, and more. Actively seeking full-time opportunities.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Index;
