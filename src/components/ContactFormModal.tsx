import { useState } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
import { Mail, Send, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const SERVICE_OPTIONS = [
  'Web Design & Development',
  'GoHighLevel System',
  'Automation',
  'Analytics Tracking',
  'Others',
] as const;

// Validation schema for contact form
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 characters' })
    .regex(/^[a-zA-Z\s\-'.]+$/, { message: 'Name contains invalid characters' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  phone: z
    .string()
    .trim()
    .max(20, { message: 'Phone number must be less than 20 characters' })
    .regex(/^[+\d\s\-().]*$/, { message: 'Phone number contains invalid characters' })
    .optional()
    .or(z.literal('')),
  services: z
    .array(z.string())
    .min(1, { message: 'Please select at least one service' }),
  message: z
    .string()
    .trim()
    .max(1000, { message: 'Message must be less than 1000 characters' })
    .optional()
    .or(z.literal('')),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactFormModal = ({ open, onOpenChange }: ContactFormModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as string[],
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
    // Clear services error when user selects
    if (fieldErrors.services) {
      setFieldErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setFieldErrors({});

    // Validate form data using zod schema
    const validationResult = contactSchema.safeParse(formData);

    if (!validationResult.success) {
      setStatus('error');
      const errors: Partial<Record<keyof ContactFormData, string>> = {};
      validationResult.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        if (!errors[field]) {
          errors[field] = err.message;
        }
      });
      setFieldErrors(errors);
      setErrorMessage('Please fix the errors below.');
      return;
    }

    // Use validated and sanitized data
    const sanitizedData = validationResult.data;

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          'subject': 'New Lead form submitted from JL DIGITAL WORKS',
          name: sanitizedData.name,
          email: sanitizedData.email,
          phone: sanitizedData.phone || '',
          services: sanitizedData.services.join(', '),
          message: sanitizedData.message || '',
        }),
      });

      // Geo Data
      let geoData = {
        country: null,
        city: null
      };

      fetch("https://ipapi.co/json/")
        .then(function (res) {
          return res.json();
        })
        .then(function (json) {
          geoData.country = json.country_name || null;
          geoData.city = json.city || null;
        })
        .catch(function () { });

      if (response.ok) {
        // Push form data to GTM dataLayer before clearing form

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'formSubmissionSuccess',
          formType: 'lead',
          user_data: {
            email_address: sanitizedData.email || '',
            phone_number: sanitizedData.phone || '',
          },
          response_data: {
            name: sanitizedData.name || '',
            attendeeServicesNeed: sanitizedData.services.join(', ') || '',
            notes: sanitizedData.message || '',
          },
          geo_city: geoData.city || '',
          geo_country: geoData.country || ''
        });

        setStatus('success');
        setFormData({ name: '', email: '', phone: '', services: [], message: '' });
        setFieldErrors({});
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email directly.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
    setFieldErrors({});
    setFormData({ name: '', email: '', phone: '', services: [], message: '' });
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setTimeout(resetForm, 300);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Mail className="w-5 h-5 text-primary" />
            Get in Touch
          </DialogTitle>
          <DialogDescription>
            Send me a message and I'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {status === 'success' ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Message Sent!
            </h3>
            <p className="text-muted-foreground mb-4">
              Thank you for reaching out. I'll respond within 24 hours.
            </p>
            <Button onClick={() => handleClose(false)} variant="outline">
              Close
            </Button>
          </div>
        ) : (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human:
                <input name="bot-field" />
              </label>
            </p>
            <input
              type="hidden"
              name="subject"
              value="New Lead form submitted from JL DIGITAL WORKS"
            />

            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                maxLength={100}
                className={fieldErrors.name ? 'border-destructive' : ''}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
              />
              {fieldErrors.name && (
                <p id="name-error" className="text-sm text-destructive">{fieldErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                maxLength={255}
                className={fieldErrors.email ? 'border-destructive' : ''}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email && (
                <p id="email-error" className="text-sm text-destructive">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>What services do you need?</Label>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Select services">
                {SERVICE_OPTIONS.map((service) => {
                  const isSelected = formData.services.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      disabled={status === 'submitting'}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-transparent text-foreground border-border hover:border-primary/50'
                        }`}
                      aria-pressed={isSelected}
                    >
                      {service}
                      {isSelected && <X className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
              {fieldErrors.services && (
                <p className="text-sm text-destructive">{fieldErrors.services}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                disabled={status === 'submitting'}
                maxLength={20}
                className={fieldErrors.phone ? 'border-destructive' : ''}
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
              />
              {fieldErrors.phone && (
                <p id="phone-error" className="text-sm text-destructive">{fieldErrors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'submitting'}
                rows={4}
                maxLength={1000}
                className={fieldErrors.message ? 'border-destructive' : ''}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? 'message-error' : undefined}
              />
              {fieldErrors.message && (
                <p id="message-error" className="text-sm text-destructive">{fieldErrors.message}</p>
              )}
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};