import { ArrowRight, Play, Star, Code, Zap, BarChart3 } from 'lucide-react';
import logo from '@/assets/logo.png';
import photo from '@/assets/jla-photo.png';
export const Hero = () => {
  return <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-background pt-24 pb-8" aria-labelledby="hero-heading">
      <div className="container-custom mx-auto px-4 md:px-8 relative z-10" itemScope itemType="https://schema.org/Person">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full animate-in">
              <img src={logo} alt="JL Digital Works Logo" width="20" height="20" className="w-5 h-5" />
              <span className="text-sm font-medium text-primary">Freelance Web Systems Consultant</span>
            </div>

            {/* Main Headline */}
            <h1 id="hero-heading" className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-in animate-delay-100 leading-[1.1]" itemProp="description">
              <span itemProp="name" className="sr-only">Jhun Lorenz A. Asna - </span>Websites, Automation, and Tracking{' '}
              <span className="gradient-text">Built to Convert</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-8 animate-in animate-delay-200 mx-auto lg:mx-0 leading-relaxed">
              I build high-converting websites, GoHighLevel systems, and analytics infrastructure that turn visitors into leads and show you exactly what is working. 
            </p>

            {/* Service Pills */}
            <div className="flex flex-wrap gap-3 mb-8 animate-in animate-delay-250 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold shadow-md">
                <Code className="w-4 h-4" />
                <span>Web Design & Dev</span>
              </div>
              <a href="#automation" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all cursor-pointer">
                <Zap className="w-4 h-4" />
                <span>GHL Systems</span>
              </a>
              <a href="#tracking" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all cursor-pointer">
                <BarChart3 className="w-4 h-4" />
                <span>Tracking & Analytics</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-in animate-delay-300 justify-center lg:justify-start">
              <a href="#portfolio" className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 group shadow-lg shadow-primary/25">
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-secondary text-foreground rounded-full font-semibold text-lg hover:bg-secondary/80 transition-all border border-border">
                <Play className="w-4 h-4" />
                Book a Call
              </a>
            </div>
          </div>

          {/* Right Content - Photo */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end animate-in animate-delay-200">
            {/* Background Shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[340px] md:w-[380px] md:h-[430px] lg:w-[420px] lg:h-[480px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-[40px] rotate-6" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[340px] md:w-[380px] md:h-[430px] lg:w-[420px] lg:h-[480px] border border-primary/20 rounded-[40px] -rotate-3" />

            {/* Photo */}
            <div className="relative z-10">
              <img src={photo} alt="Jhun Lorenz A. Asna - Freelance Web Systems Consultant" loading="eager" fetchPriority="high" decoding="async" className="w-[280px] h-[320px] md:w-[350px] md:h-[400px] lg:w-[400px] lg:h-[460px] object-cover object-top rounded-3xl shadow-2xl" />

              {/* Stats Badge */}
              <div className="absolute -bottom-4 -left-4 md:bottom-4 md:-left-8 z-20 px-5 py-3 bg-card border border-border rounded-2xl shadow-xl">
                <p className="text-2xl font-bold text-primary">5+</p>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-[10%] right-0 lg:right-[-5%] z-20 animate-float">
              <div className="px-4 py-2 bg-card border border-border rounded-xl shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">Available Now  </span>
              </div>
            </div>

            <div className="absolute bottom-[25%] right-0 lg:right-[-10%] z-20 animate-float">
              <div className="px-4 py-2 bg-card border border-border rounded-xl shadow-lg flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-foreground">Top Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button onClick={() => document.getElementById('problem')?.scrollIntoView({
      behavior: 'smooth'
    })} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block cursor-pointer hover:opacity-70 transition-opacity" aria-label="Scroll to next section">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </button>
    </section>;
};