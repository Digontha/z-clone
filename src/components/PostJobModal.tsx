import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Briefcase, DollarSign, CheckCircle2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const jobSchema = z.object({
  title: z.string().min(5, 'Project title must be at least 5 characters'),
  category: z.string().min(1, 'Please select a discipline'),
  budgetType: z.enum(['Fixed', 'Hourly']),
  budgetAmount: z.string().min(2, 'Enter a valid budget amount (e.g. $3,500)'),
  skills: z.string().min(2, 'List at least one skill or technology'),
  description: z.string().min(20, 'Please provide at least 20 characters explaining the scope'),
});

type JobFormValues = z.infer<typeof jobSchema>;

interface PostJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJobCreated?: (job: JobFormValues) => void;
}

export default function PostJobModal({ open, onOpenChange, onJobCreated }: PostJobModalProps) {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      category: 'Development',
      budgetType: 'Fixed',
      budgetAmount: '$2,500',
      skills: 'React, TypeScript, Tailwind',
      description: '',
    },
  });

  const onSubmit = (data: JobFormValues) => {
    toast.success('Project posted successfully to ZeeWork network!', {
      description: 'Vetted candidates will begin submitting proposals shortly.',
    });
    if (onJobCreated) onJobCreated(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-1">
            <Briefcase className="w-5 h-5" />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            Post a Project to ZeeWork
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Connect with pre-vetted remote talent. Protected by 5% flat escrow. Zero upfront platform listing fees.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-foreground">Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Build Next.js Dashboard with Stripe & Supabase" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-foreground">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select discipline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Development">Full-Stack Development</SelectItem>
                        <SelectItem value="AI & Data Science">AI & Machine Learning</SelectItem>
                        <SelectItem value="Design & Creative">UI/UX & Product Design</SelectItem>
                        <SelectItem value="DevOps & Cloud">DevOps & Cloud Systems</SelectItem>
                        <SelectItem value="Mobile Engineering">Mobile App Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-foreground">Billing Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Fixed">Fixed Price Escrow</SelectItem>
                        <SelectItem value="Hourly">Hourly Verified Timesheet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="budgetAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-foreground">Target Budget</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $3,000 or $75/hr" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-foreground">Required Stack / Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Next.js, FastAPI, Docker" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-foreground">Project Scope & Deliverables</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={4}
                      placeholder="Describe what you want to build, milestone goals, API specs, or reference links..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-secondary/60 p-3 rounded-lg flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>You only pay when you approve milestones. No fees to post.</span>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary text-primary-foreground font-semibold"
                disabled={form.formState.isSubmitting}
              >
                Publish Job Post
              </Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}