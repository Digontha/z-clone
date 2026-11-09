import { useState } from 'react';
import { DollarSign, ShieldAlert, Check, TrendingDown, ArrowRight } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeeCalculatorProps {
  onOpenPostJob: () => void;
}

export default function FeeCalculator({ onOpenPostJob }: FeeCalculatorProps) {
  const [projectValue, setProjectValue] = useState<number>(5000);

  // Traditional platform: 20%
  const traditionalFee = projectValue * 0.20;
  // ZeeWork fee: 5% flat
  const zeeworkFee = projectValue * 0.05;
  // Savings
  const savedAmount = traditionalFee - zeeworkFee;
  const freelancerPayoutZeeWork = projectValue - zeeworkFee;
  const freelancerPayoutOld = projectValue - traditionalFee;

  return (
    <section id="calculator" className="py-16 md:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2">
            Why high-earning freelancers & clients switch to ZeeWork
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            Old marketplaces deduct up to 20% of your hard-earned wages and add surprise client service fees. ZeeWork runs on a transparent 5% platform escrow rate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Slider Console */}
          <div className="lg:col-span-6 bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="font-bold text-lg text-foreground mb-1">
              Simulate Contract or Project Size
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Adjust the slider to see your exact fee deductions and total savings.
            </p>

            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Contract Total</span>
                <span className="text-3xl font-extrabold text-foreground">
                  ${projectValue?.toLocaleString()}
                </span>
              </div>

              <Slider
                value={[projectValue]}
                onValueChange={(val) => setProjectValue(val[0])}
                min={500}
                max={25000}
                step={500}
                className="py-4"
              />

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$500 (Small sprint)</span>
                <span>$10,000</span>
                <span>$25,000 (Full contract)</span>
              </div>
            </div>

            {/* Quick preset buttons */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">Quick Presets:</span>
              {[2500, 5000, 10000, 15000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setProjectValue(preset)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                    projectValue === preset 
                      ? 'bg-primary text-primary-foreground border-primary font-bold' 
                      : 'border-border text-foreground hover:bg-secondary'
                  }`}
                >
                  ${(preset / 1000).toFixed(preset % 1000 === 0 ? 0 : 1)}k
                </button>
              ))}
            </div>

          </div>

          {/* Right Comparison Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Legacy Platforms */}
            <div className="p-6 rounded-2xl bg-secondary/50 border border-border text-foreground flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Legacy Platforms
                  </span>
                  <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">
                    20% FEE
                  </span>
                </div>
                <div className="text-2xl font-bold text-muted-foreground line-through">
                  ${traditionalFee?.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Platform takes this amount from your project</p>

                <div className="mt-6 pt-4 border-t border-border/80">
                  <p className="text-xs text-muted-foreground">Talent gets:</p>
                  <p className="text-xl font-bold text-foreground">
                    ${freelancerPayoutOld?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* ZeeWork */}
            <div className="p-6 rounded-2xl bg-card border-2 border-primary text-foreground shadow-xl shadow-primary/10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                ZeeWork Way
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    ZeeWork Escrow
                  </span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    5% FLAT
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-primary">
                  ${zeeworkFee?.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Only $50 per $1,000 spent</p>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Talent keeps:</p>
                  <p className="text-xl font-extrabold text-foreground">
                    ${freelancerPayoutZeeWork?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Total Extra Retained */}
              <div className="mt-4 pt-3 border-t border-primary/20 bg-primary/5 -mx-6 -mb-6 p-4 text-center">
                <span className="text-xs font-medium text-muted-foreground block">You Keep Extra</span>
                <span className="text-lg font-extrabold text-primary">
                  +${savedAmount?.toLocaleString()} Saved
                </span>
              </div>

            </div>

          </div>

        </div>

        <div className="text-center mt-10">
          <Button 
            onClick={onOpenPostJob}
            size="lg"
            className="bg-primary text-primary-foreground font-semibold px-8 shadow-lg shadow-primary/20"
          >
            Start Saving with ZeeWork Escrow <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

      </div>
    </section>
  );
}