import { XCircle, TrendingDown, AlertTriangle, Target, FileQuestion, Gauge } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const problems = [
  {
    icon: FileQuestion,
    title: "Websites Without Strategy",
    description: "Your site was built without clear goals or user journeys. It looks fine but fails to guide visitors toward action."
  },
  {
    icon: Gauge,
    title: "Slow & Outdated Performance",
    description: "Your website loads slowly and hurts Core Web Vitals. Poor speed kills SEO rankings and drives visitors away."
  },
  {
    icon: XCircle,
    title: "Traffic Without Conversions",
    description: "Your website gets visitors, but they leave without taking action. Traffic means nothing without leads."
  },
  {
    icon: AlertTriangle,
    title: "Disconnected Tools, Missed Leads",
    description: "Your systems do not talk to each other. Leads slip through the cracks and require constant manual work."
  },
  {
    icon: TrendingDown,
    title: "Unused or Broken Automation",
    description: "Your CRM or automation is either poorly set up, barely used, or not doing what it should."
  },
  {
    icon: Target,
    title: "Ads Without Accurate Tracking",
    description: "You are spending money on ads but have no idea what is actually driving results. Data is missing or wrong."
  }
];

export const Problem = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="problem"
      className="section-padding bg-section-alt"
      aria-labelledby="problem-heading"
    >
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-4">
            Sound Familiar?
          </span>
          <h2 id="problem-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Your Digital Systems Are{' '}
            <span className="text-destructive">Holding You Back</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            These are the problems I solve for businesses every day.
          </p>
        </div>

        {/* Problem Cards - 4 Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group p-6 bg-card rounded-2xl border border-border hover:border-destructive/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
