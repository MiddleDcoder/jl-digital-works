import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const testimonials = [{
  quote: "Jhun delivered our complete website redesign ahead of schedule, and the results exceeded our expectations. The design is clean, the site loads fast, and most importantly, our conversions doubled. Highly recommend.",
  author: "James Racine",
  role: "CEO, iVentureAssets",
  rating: 5,
  result: "2x Conversions"
}, {
  quote: "Professional, responsive, and incredibly skilled. Our new website looks amazing and actually generates leads. Best investment we made this year.",
  author: "Marketing Director",
  role: "SEOBackOffice",
  rating: 5,
  result: "3x Lead Generation"
}, {
  quote: "Working with Jhun was seamless. He understood exactly what we needed for our telemedicine platform: clean design, fast performance, and trust. Patients love it.",
  author: "Dr. Sarah M.",
  role: "Founder, BabiesMD",
  rating: 5,
  result: "98% Patient Satisfaction"
}];
export const Testimonials = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation({
    threshold: 0.1
  });
  return <section ref={ref as React.RefObject<HTMLElement>} id="testimonials" className="section-padding bg-background" aria-labelledby="testimonials-heading">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 id="testimonials-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What Clients{' '}
            <span className="gradient-text">Say About My Work</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real results, real feedback from business owners I've worked with. 
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => <div key={index} className={`group p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-700 flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          transitionDelay: `${(index + 1) * 150}ms`
        }}>
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};