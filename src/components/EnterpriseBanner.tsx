import { ShieldCheck, Building2, Lock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EnterpriseBannerProps {
  onOpenPostJob: () => void;
}

export default function EnterpriseBanner({ onOpenPostJob }: EnterpriseBannerProps) {
  return (
    <section id="enterprise" className="py-16 md:py-20 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Badge className="bg-primary/20 text-primary border-primary/30 w-fit text-xs font-semibold py-1">
              ZeeWork for Enterprise & Scaleups
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Scale dedicated engineering teams with full compliance & IP indemnity.
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Skip 4-month recruitment cycles. ZeeWork Enterprise provides managed contractor teams, customized MSA contracts, IP assignment, background checks, and automated local tax withholding in 140+ countries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-background">IP & NDA Protection</h4>
                  <p className="text-xs text-muted-foreground">Enforceable worldwide contracts and confidentiality</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-background">Consolidated Invoicing</h4>
                  <p className="text-xs text-muted-foreground">Net-30 billing terms with zero contractor misclassification</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button 
                onClick={onOpenPostJob}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm px-6"
              >
                Book Enterprise Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-background/20 text-background hover:bg-background/10 font-medium text-sm"
              >
                Download Compliance Whitepaper
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-background/20 shadow-2xl">
              <img
                src="/images/enterprise-collaboration.jpg"
                alt="ZeeWork Enterprise technical team working on infrastructure"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-background/10 backdrop-blur-md border border-background/20">
                <p className="text-xs font-bold text-primary">Average placement time</p>
                <p className="text-xl font-extrabold text-background">Under 48 Hours</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">From technical briefing to code commit</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}