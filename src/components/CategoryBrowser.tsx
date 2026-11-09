import { Cpu, Code2, Palette, Server, TrendingUp, Smartphone, ArrowRight } from 'lucide-react';
import { TalentCategory } from '../types/zeework';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CategoryBrowserProps {
  categories: TalentCategory[];
  onSelectCategory: (categoryName: string) => void;
}

export default function CategoryBrowser({ categories, onSelectCategory }: CategoryBrowserProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'cat-1': return Cpu;
case 'cat-2': return Code2;
      case 'cat-3': return Palette;
      case 'cat-4': return Server;
      case 'cat-5': return TrendingUp;
      case 'cat-6': return Smartphone;
default: return Code2;
    }
  };

  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Explore Disciplines
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-1">
            Browse high-demand talent categories
          </h2>
          <p className="text-muted-foreground mt-2 text-base max-w-xl">
            Pre-evaluated through live technical screening, architectural code reviews, and communication tests.
          </p>
        </div>

        <button 
          type="button" 
          onClick={() => onSelectCategory('All')}
          className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group self-start md:self-auto"
        >
          View all 40+ specializations
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const IconComp = getIcon(cat.id);
          return (
            <Card 
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card"
            >
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">
                    {cat.talentCount}
                  </span>
                  <span className="font-semibold text-primary">
                    {cat.startingRate}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}