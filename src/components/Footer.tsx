import { Linkedin, MessageCircle, Mail, Heart, ArrowUp } from 'lucide-react';
import logo from '@/assets/jl-digital-works-logo.webp';
import { useEffect, useState } from 'react';
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <>
    {/* Fixed Back to Top Button */}
    <button onClick={scrollToTop} className={`mb-5 fixed bottom-20 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`} aria-label="Back to top">
      <ArrowUp className="w-5 h-5" />
    </button>

    <footer className="bg-foreground text-background py-16">
      <div className="container-custom mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="JL Digital Works Logo" width="40" height="40" loading="lazy" className="w-[40px] h-auto object-contain" />
              <div>
                <p className="font-display font-bold text-base leading-tight">JL DIGITAL WORKS</p>
                <p className="text-background/60 text-xs">Web, Automation & Tracking</p>
              </div>
            </div>
            <p className="text-background/60 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Freelance consultant building high-converting websites, GoHighLevel systems, and analytics infrastructure for businesses worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-col items-center gap-3">
            <p className="font-semibold text-background/80 mb-2">Quick Links</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <a href="#hero" className="text-background/60 hover:text-primary transition-colors">Home</a>
              <a href="#problem" className="text-background/60 hover:text-primary transition-colors">Problems</a>
              <a href="#solution" className="text-background/60 hover:text-primary transition-colors">Services</a>
              <a href="#automation" className="text-background/60 hover:text-primary transition-colors">GHL & Automation</a>
              <a href="#tracking" className="text-background/60 hover:text-primary transition-colors">Tracking</a>
              <a href="#portfolio" className="text-background/60 hover:text-primary transition-colors">Portfolio</a>
              <a href="#faq" className="text-background/60 hover:text-primary transition-colors">FAQ</a>
            </div>
          </nav>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="font-semibold text-background/80 mb-2">Connect</p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/jhun-lorenz-asna/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://wa.me/09121778824" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition-all" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="mailto:contact@jldigitalworks.com" className="p-2.5 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition-all" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/10 mb-6" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-background/50">
          <p>© {currentYear} JL Digital Works. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 fill-primary text-primary" /> in the Philippines
          </p>
        </div>
      </div>
    </footer>
  </>;
};