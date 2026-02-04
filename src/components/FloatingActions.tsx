import { useState } from 'react';
import { HelpCircle, X, Mail, Calendar, Phone, MessageCircle } from 'lucide-react';
import { ContactFormModal } from './ContactFormModal';
import { useCalEmbed } from '@/hooks/useCalEmbed';
import logo from '@/assets/jl-digital-works-logo.webp';

export const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  useCalEmbed();

  const handleContactClick = () => {
    setIsOpen(false);
    setContactModalOpen(true);
  };

  const handleScheduleClick = () => {
    setIsOpen(false);
  };

  const actions = [
    {
      icon: Mail,
      label: 'Contact Us',
      onClick: handleContactClick,
    },
    {
      icon: Calendar,
      label: 'Schedule Now',
      onClick: handleScheduleClick,
      isCalButton: true,
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+639773155072',
    },
    {
      icon: MessageCircle,
      label: 'Text Us',
      href: 'https://wa.me/639773155072',
      external: true,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Panel */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-out ${
          isOpen 
            ? 'bottom-4 left-4 right-4 md:right-auto md:w-[360px] opacity-100 translate-y-0' 
            : 'bottom-6 left-6 opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
          {/* Header */}
          <div className="bg-primary/90 px-6 py-4 text-center">
            <h3 className="text-primary-foreground font-medium text-lg">
              Instant actions
            </h3>
          </div>

          {/* Body */}
          <div className="p-6 bg-muted/30">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src={logo} 
                alt="JL Digital Works" 
                className="h-12 w-auto opacity-80"
              />
            </div>

            {/* Action Cards */}
            <div className="space-y-3">
              {actions.map((action) => {
                const Icon = action.icon;
                
                if (action.isCalButton) {
                  return (
                    <button
                      key={action.label}
                      data-cal-namespace="30min"
                      data-cal-link="jl-digital-works/30min"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                      onClick={action.onClick}
                      className="w-full flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium text-left">
                        {action.label}
                      </span>
                    </button>
                  );
                }

                if (action.href) {
                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noopener noreferrer' : undefined}
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">
                        {action.label}
                      </span>
                    </a>
                  );
                }

                return (
                  <button
                    key={action.label}
                    onClick={action.onClick}
                    className="w-full flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Trigger Button / Close Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-out flex items-center justify-center ${
          isOpen
            ? 'bottom-6 left-6 bg-foreground hover:bg-foreground/90'
            : 'bottom-6 left-6 bg-primary/80 hover:bg-primary hover:scale-105'
        }`}
        aria-label={isOpen ? 'Close actions panel' : 'Open actions panel'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-background" />
        ) : (
          <HelpCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </button>

      {/* Persistent Tooltip (closed state only) */}
      {!isOpen && !tooltipDismissed && (
        <div className="fixed bottom-7 left-24 z-50 flex items-center gap-1">
          <div className="relative bg-card pl-4 pr-2 py-2 rounded-xl shadow-lg border border-border flex items-center gap-2">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Book Now</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setTooltipDismissed(true);
              }}
              className="w-5 h-5 rounded-full bg-foreground/80 hover:bg-foreground flex items-center justify-center transition-colors"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3 h-3 text-background" />
            </button>
            {/* Arrow pointing to button */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-card" />
          </div>
        </div>
      )}

      <ContactFormModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
};
