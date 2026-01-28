import { BarChart3, Target, Code, Database, Search, TrendingUp, ArrowRight } from 'lucide-react';

const capabilities = [
  { icon: Code, title: "Google Tag Manager" },
  { icon: BarChart3, title: "GA4 Analytics" },
  { icon: Target, title: "Google Ads Tracking" },
  { icon: TrendingUp, title: "Meta Ads Pixel" },
  { icon: Database, title: "Server-Side Tracking" },
  { icon: Search, title: "UTM Attribution" }
];

export const Tracking = () => {
  return (
    <section id="tracking" className="section-padding bg-background" aria-labelledby="tracking-heading">
      <div className="container-custom mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Tracking & Analytics
              </span>
              <h2 id="tracking-heading" className="font-display text-3xl md:text-4xl font-bold mb-4">
                Know Exactly{' '}
                <span className="gradient-text">What Drives Revenue</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Stop guessing where your leads come from. I set up tracking infrastructure that shows which campaigns, ads, and pages actually bring paying customers.
              </p>

              <div className="p-4 bg-card rounded-xl border border-border mb-6">
                <p className="text-sm text-muted-foreground mb-2">Best for:</p>
                <p className="text-foreground font-medium">
                  Businesses running Google or Meta Ads that want accurate data and better ad spend decisions.
                </p>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all group"
              >
                Fix Your Tracking
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Content - Capabilities Grid */}
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {capabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card rounded-xl border border-border text-center"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <capability.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium text-foreground">{capability.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
