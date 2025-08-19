import { useState } from 'react';
import { useIntl } from 'react-intl';
import { cn } from '@/lib/utils';
import { categories } from '@/data/categories';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationRailProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onHover?: (isHovered: boolean) => void;
  selectedCategory?: string;
  onCategoryClick?: (category: string) => void;
}

export function NavigationRail({
  isExpanded,
  onToggleExpanded,
  onHover,
  selectedCategory = 'travel',
  onCategoryClick,
}: NavigationRailProps) {
  const intl = useIntl();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  const shouldShowLabels = isExpanded || isHovered;

  return (
    <div
      className={cn(
        "relative flex flex-col h-full glass transition-all duration-300 ease-in-out",
        shouldShowLabels ? "w-64" : "w-16"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-cyan rounded-lg blur-md opacity-70" />
            <div className="relative w-8 h-8 rounded-lg bg-gradient-cyan flex items-center justify-center text-white font-bold text-sm shadow-lg">
              L
            </div>
          </div>
          {shouldShowLabels && (
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent animate-fadeInLeft">
              {intl.formatMessage({ id: 'app.title' })}
            </span>
          )}
        </div>
        {shouldShowLabels && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleExpanded}
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* Categories Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <li key={category.id}>
                <button
                  onClick={() => onCategoryClick?.(category.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                    "transition-all duration-200 group relative overflow-hidden",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  title={intl.formatMessage({ id: `category.${category.id}` })}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                  )}
                  <span className="relative text-lg group-hover:scale-110 transition-transform">
                    {category.icon}
                  </span>
                  {shouldShowLabels && (
                    <span className="relative text-sm font-medium animate-fadeInLeft">
                      {intl.formatMessage({ id: `category.${category.id}` })}
                    </span>
                  )}
                  {isSelected && shouldShowLabels && (
                    <div className="absolute right-0 w-1 h-full bg-primary-foreground/20" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}