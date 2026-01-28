import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const projects = [
  {
    title: "James Christian Cosmetics",
    description: "Modern e-commerce website with clean design, fast performance, and seamless user experience.",
    url: "https://jameschristiancosmetics.com",
    category: "Web Design & Development",
    result: "2x Conversions",
    addOns: "GHL + Tracking"
  },
  {
    title: "Vampire Facelifts",
    description: "High-converting landing page designed for maximum lead capture and clear call-to-actions.",
    url: "https://vampirefacelifts.com",
    category: "Landing Page Design",
    result: "45% Conversion Rate",
    addOns: "Tracking"
  },
  {
    title: "Wizard Tower",
    description: "Feature-rich e-commerce website with intuitive navigation and optimized checkout flow.",
    url: "https://wizardtower.com",
    category: "E-commerce Website",
    result: "50K+ Monthly Visitors",
    addOns: "Analytics"
  },
  {
    title: "SEO Back Office",
    description: "Professional agency website that clearly communicates services and generates qualified leads.",
    url: "https://seobackoffice.org",
    category: "Business Website",
    result: "3x Lead Generation",
    addOns: "GHL + Tracking"
  },
  {
    title: "BabiesMD",
    description: "Clean, trustworthy telemedicine platform designed for parents and pediatric care.",
    url: "https://babiesmd.com",
    category: "Healthcare Website",
    result: "500+ Patients",
    addOns: "Booking System"
  },
  {
    title: "PuzzlCrate",
    description: "Engaging subscription e-commerce site with compelling product presentation.",
    url: "https://puzzlcrate.com",
    category: "E-commerce Website",
    result: "1000+ Subscribers",
    addOns: "Automation"
  }
];

export const Portfolio = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="portfolio"
      className="section-padding bg-section-alt"
      aria-labelledby="portfolio-heading"
    >
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 id="portfolio-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Real Projects,{' '}
            <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A selection of websites and systems I have built for clients worldwide.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col">
                {/* Category & Link Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* View More CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all"
          >
            Start Your Project
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
