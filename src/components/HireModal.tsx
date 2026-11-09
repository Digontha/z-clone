import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Send, Star, ShieldCheck, MapPin } from 'lucide-react';
import { Freelancer } from '../types/zeework';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const hireSchema = z.object({
  jobTitle: z.string().min(5, 'Contract title is required'),
  offerAmount: z.string().min(2, 'Enter offer rate or milestone amount'),
  message: z.string().min(15, 'Please include a brief message or project brief'),
});

type HireFormValues = z.infer<typeof hireSchema>;

interface HireModalProps {
  freelancer: Freelancer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HireModal({ freelancer, open, onOpenChange }: HireModalProps) {
  const form = useForm<HireFormValues>({
    resolver: zodResolver(hireSchema),
    defaultValues: {
      jobTitle: 'Frontend & API Integration Milestone',
      offerAmount: freelancer ? `$${freelancer.hourlyRate}/hr` : '$75/hr',
      message: '',
    },
  });

  if (!freelancer) return null;

  const onSubmit = (data: HireFormValues) => {
    toast.success(`Direct contract offer sent to ${freelancer.name}!`, {
      description: 'They typically reply within 2 hours. Notification sent to email.',
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-12 h-12 rounded-xl object-cover border border-border"
            />
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Hire {freelancer.name}
              </DialogTitle>
              <p className="text-xs text-primary font-medium">{freelancer.title}</p>
            </div>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Send an instant milestone offer. Rate: ${freelancer.hourlyRate}/hr • Verified ZeeWork Escrow.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-foreground">Project / Milestone Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offerAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-foreground">Proposed Budget / Rate</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-foreground">Intro Message & Scope</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={3} 
                      placeholder="Hi Elena, we love your background with AI pipelines and would like to hire you for our upcoming sprint..."
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-xs text-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>5% Flat ZeeWork fee applied upon milestone release. No hidden extras.</span>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
                <Send className="w-3.5 h-3.5 mr-1.5" /> Send Direct Offer
              </Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}