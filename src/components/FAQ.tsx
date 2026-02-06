import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCalEmbed } from '@/hooks/useCalEmbed';

const faqs = [{
  question: "What services do you offer?",
  answer: "I offer three core services: high-converting website design and development, GoHighLevel systems and automation, and analytics and tracking infrastructure. I also work with Automation in another platform for like Zapier to automation business needs. These can be combined as a complete digital system or delivered individually based on what your business needs."
}, {
  question: "Do you only work with WordPress?",
  answer: "WordPress is my primary specialization for custom websites. However, I also work with other website platforms when the project requires it. The focus is always on choosing the right tool for your specific goals."
}, {
  question: "Can I just get a website without automation or tracking?",
  answer: "Absolutely. Most clients start with just a website. It is designed to perform on its own. If you later want to add automation or tracking, those can be layered in."
}, {
  question: "What is GoHighLevel and do I need it?",
  answer: "GoHighLevel is an all-in-one CRM and marketing platform. You need it if you want automated follow-ups, booking systems, or a pipeline to manage leads. If you are just starting out or have a simple business, you might not need it yet."
}, {
  question: "What tracking setup do you recommend?",
  answer: "At minimum: Google Tag Manager plus GA4 for analytics. If you are running ads, add Google Ads and Meta Pixel tracking. This lets you see which campaigns actually drive leads, not just clicks."
}, {
  question: "How much does a website cost?",
  answer: "Landing pages start around $500-1,000. Full websites range from $1500-2,500 to $5,000 or more depending on complexity. GHL setup and tracking are quoted separately. You will get a clear quote after our call."
}, {
  question: "How long does a project take?",
  answer: "Landing page: 1 to 2 weeks. Full website: 2 to 4 weeks. GHL setup: 1 to 3 weeks. Tracking: days to weeks. All projects depends on their complexity to complete. Timelines are always discussed upfront."
}, {
  question: "Do you work with international clients?",
  answer: "Yes. Most of my clients are in the US, UK, Canada, and Australia. Remote collaboration via video calls and async communication works great."
}, {
  question: "What engagement models do you offer?",
  answer: "I am available for project-based freelance work, contract or retainer engagements, part-time or full-time contract roles, and hourly consulting or audits. We can discuss what works best for your situation."
}];

export const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useCalEmbed();

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="faq" className="section-padding bg-section-alt" aria-labelledby="faq-heading" style={{ contain: 'layout style' }}>
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 id="faq-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Common{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before we start working together.
          </p>
        </div>

        {/* FAQ Items */}
        <div className={`max-w-3xl mx-auto space-y-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-card border rounded-xl px-6 overflow-hidden transition-colors ${isOpen ? 'border-primary/30' : 'border-border'}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex flex-1 w-full items-center justify-between py-4 text-left font-semibold text-base hover:text-primary transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  {faq.question}
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  className="grid transition-[grid-template-rows] duration-200 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="text-muted-foreground pb-4 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className={`mt-10 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-muted-foreground mb-4">Still have questions? Let's talk.</p>
          <button
            data-cal-namespace="30min"
            data-cal-link="jl-digital-works/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors border border-border"
          >
            Book a Free Call
          </button>
        </div>
      </div>
    </section>
  );
};
