import { Settings, GitBranch, Mail, Calendar, Bell, ArrowRight } from 'lucide-react';

const features = [
  { icon: Settings, title: "CRM and Pipeline Setup", description: "Organize leads and track every opportunity to close." },
  { icon: GitBranch, title: "Automated Workflows", description: "Trigger actions based on lead behavior automatically." },
  { icon: Mail, title: "Email and SMS Sequences", description: "Follow up instantly with personalized messages." },
  { icon: Calendar, title: "Booking Automation", description: "Scheduling and reminders on autopilot." },
  { icon: Bell, title: "Team Notifications", description: "Get alerted when leads take action." }
];

export const Automation = () => {
  return (
    <section id="automation" className="section-padding bg-section-alt" aria-labelledby="automation-heading">
      <div className="container-custom mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                GHL Systems & Automation
              </span>
              <h2 id="automation-heading" className="font-display text-3xl md:text-4xl font-bold mb-4">
                Stop Losing Leads to{' '}
                <span className="gradient-text">Slow Follow-Ups</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                I build GoHighLevel systems that capture leads, follow up automatically, and keep your pipeline moving. Less manual work. More closed deals.
              </p>

              <div className="p-4 bg-card rounded-xl border border-border mb-6">
                <p className="text-sm text-muted-foreground mb-2">Best for:</p>
                <p className="text-foreground font-medium">
                  Coaches, agencies, and service businesses that need a CRM and automated follow-up system.
                </p>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all group"
              >
                Discuss Automation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Content - Features */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
