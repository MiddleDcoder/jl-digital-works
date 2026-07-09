import { useState } from 'react';
import { Mail, MessageCircle, Calendar } from 'lucide-react';
import { ContactFormModal } from './ContactFormModal';
import { useCalEmbed } from '@/hooks/useCalEmbed';

export const FinalCTA = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  useCalEmbed();

  return (
    <section
      id="contact"
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="container-custom mx-auto relative z-10">
        {/* Main CTA Box */}
        <div className="bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
              Ready to Start?
            </span>

            <h2
              id="contact-heading"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4"
            >
              Let's Build Something{' '}
              <span className="text-primary">That Works</span>
            </h2>

            <p className="text-background/70 text-lg mb-8">
              Whether you need a high-converting website, automation, or tracking infrastructure, I am here to help. Let's discuss what your business needs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                data-cal-namespace="30min"
                data-cal-link="jl-digital-works/30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/30"
              >
                <Calendar className="w-5 h-5" />
                Book a Call
              </button>
              <a
                href="https://wa.me/09121778824"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background/10 text-background border border-background/20 rounded-full font-semibold text-lg hover:bg-background/20 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <button
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background/10 text-background border border-background/20 rounded-full font-semibold text-lg hover:bg-background/20 transition-all"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </button>
            </div>

            {/* Alternative Contact */}
            <div className="flex flex-wrap justify-center gap-4 text-background/60 text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Currently taking on new projects
              </span>
              <span className="hidden sm:inline">·</span>
              <span>Response within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Engagement Models */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <h3 className="font-display text-xl font-semibold text-foreground mb-4">
            Ways to Work Together
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground">
              Project-Based
            </span>
            <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground">
              Retainer
            </span>
            <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground">
              Contract Roles
            </span>
            <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground">
              Hourly Consulting
            </span>
          </div>
        </div>
      </div>

      <ContactFormModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </section>
  );
};
