import { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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
  message: z
    .string()
    .trim()
    .min(1, { message: 'Message is required' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
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
          ...sanitizedData,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
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
    setFormData({ name: '', email: '', message: '' });
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form when closing
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
              value="New lead from %{formName} (%{submissionId})"
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
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
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
