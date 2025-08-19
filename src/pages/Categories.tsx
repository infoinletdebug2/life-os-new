import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { categories } from '@/data/categories';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Card, CardContent } from '@/components/ui/card';

export default function Categories() {
  const navigate = useNavigate();
  const intl = useIntl();
  const { theme, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSubcategories, setShowSubcategories] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowSubcategories(true);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    const subcategory = categories
      .find(cat => cat.id === categoryId)
      ?.subcategories.find(sub => sub.id === subcategoryId);
    
    if (subcategory?.route) {
      navigate(subcategory.route);
    } else {
      navigate(`/${categoryId}/${subcategoryId}`);
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5 dark:to-emerald-500/10 transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center p-6 glass backdrop-blur-xl border-b border-white/10 animate-fadeInUp">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          {intl.formatMessage({ id: 'app.title' })}
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="glass-hover"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="glass-hover">
            <Globe className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {!showSubcategories ? (
          <>
            <h2 className="text-xl text-muted-foreground mb-8 animate-fadeInUp">
              {intl.formatMessage({ id: 'app.welcome' })}
            </h2>
            
            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const gradients = ['cyan', 'emerald', 'teal'];
                const gradient = gradients[index % 3] as any;
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard
                      gradient={gradient}
                      onClick={() => handleCategoryClick(category.id)}
                      className="cursor-pointer group"
                    >
                      <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform`}>
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {intl.formatMessage({ id: `category.${category.id}` })}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.subcategories.length} services available
                      </p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Back Button and Category Header */}
            <Button
              variant="ghost"
              onClick={() => {
                setShowSubcategories(false);
                setSelectedCategory(null);
              }}
              className="mb-6 gap-2"
            >
              ← Back to Categories
            </Button>
            
            <div className="mb-8 animate-fadeInUp">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full ${selectedCategoryData?.color} flex items-center justify-center text-xl animate-float`}>
                  {selectedCategoryData?.icon}
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  {selectedCategoryData && intl.formatMessage({ id: `category.${selectedCategoryData.id}` })}
                </h2>
              </div>
            </div>

            {/* Subcategory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCategoryData?.subcategories.map((subcategory, index) => (
                <motion.div
                  key={subcategory.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    onClick={() => handleSubcategoryClick(selectedCategoryData.id, subcategory.id)}
                    className="glass-card cursor-pointer group hover:scale-[1.02] transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {subcategory.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {subcategory.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}