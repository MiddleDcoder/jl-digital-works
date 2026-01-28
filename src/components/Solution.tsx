import { Check, Globe, Zap, BarChart3, ArrowRight } from 'lucide-react';
const mainFeatures = ["Custom design tailored to your brand", "Fast loading and mobile responsive", "Conversion focused layouts", "SEO built in from the start", "Ongoing maintenance available", "Domain, hosting, and email setup", "Performance optimization", "Security & error-free code"];
const additionalServices = [{
  icon: Zap,
  title: "GHL Systems & Automation",
  description: "CRM setup, lead capture, pipelines, workflows, and automated follow-ups that keep your business moving.",
  href: "#automation"
}, {
  icon: BarChart3,
  title: "Tracking & Analytics",
  description: "Google Tag Manager, GA4, and ad tracking for Google and Meta so you know exactly what is working.",
  href: "#tracking"
}];
export const Solution = () => {
  return <section id="solution" className="section-padding bg-background" aria-labelledby="solution-heading">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Services
          </span>
          <h2 id="solution-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            High-Converting Websites and{' '}
            <span className="gradient-text">Digital Systems</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            I design and build websites that convert, automation that saves time, and tracking that shows results. These services work together as a complete system or stand alone based on your needs.
          </p>
        </div>

        {/* Main Service */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative p-8 md:p-10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl border border-primary/20">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">Web Design & Development</h3>
                  <span className="text-xs px-2.5 py-1 bg-primary text-primary-foreground rounded-full font-semibold">
                    Core Service
                  </span>
                </div>
                <p className="text-muted-foreground text-lg mb-6">
                  From landing pages to full business websites, I design and build sites that communicate your value clearly and turn visitors into leads. WordPress is my primary platform, but I also work with other tools when the project requires it.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {mainFeatures.map((feature, index) => <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground text-sm">{feature}</span>
                    </div>)}
                </div>

                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all group">
                  Get a Website Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-border"></div>
            <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">
              Also Available
            </p>
            <div className="h-px w-12 bg-border"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {additionalServices.map((service, index) => <a key={index} href={service.href} className="group relative flex flex-col p-6 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>)}
          </div>

          {/* Flexibility Note */}
          <div className="mt-8 p-4 bg-card rounded-xl border border-border text-center">
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">Flexible delivery:</strong> These services can be combined as a complete digital system or delivered individually based on what your business needs.
            </p>
          </div>
        </div>
      </div>
    </section>;
};