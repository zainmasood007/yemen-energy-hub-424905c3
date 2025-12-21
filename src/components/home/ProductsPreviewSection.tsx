import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Battery, Sun, Zap } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProductsPreviewSection() {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const categories = [
    { 
      key: 'products.categories.pylontech', 
      icon: Battery, 
      highlight: true,
      desc: isRTL ? 'بطاريات ليثيوم فوسفات الحديد الأصلية' : 'Original LiFePO4 Batteries',
    },
    { 
      key: 'products.categories.lithium', 
      icon: Battery,
      desc: isRTL ? 'بطاريات عالية الأداء' : 'High-performance batteries',
    },
    { 
      key: 'products.categories.panels', 
      icon: Sun,
      desc: isRTL ? 'ألواح أحادية ومتعددة البلورات' : 'Mono & Poly crystalline panels',
    },
    { 
      key: 'products.categories.inverters', 
      icon: Zap,
      desc: isRTL ? 'انفرترات هجينة وخارج الشبكة' : 'Hybrid & Off-grid inverters',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-3">
              <Battery className="h-4 w-4" />
              <span>{isRTL ? 'منتجاتنا' : 'Our Products'}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black mb-2">{t('products.title')}</h2>
            <p className="text-muted-foreground">{t('products.subtitle')}</p>
          </div>
          <Button asChild variant="outline" className="border-2">
            <Link to="/products">
              {t('products.viewAll')}
              <Arrow className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.key}
              to="/products"
              className={cn(
                "group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-1",
                category.highlight 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border border-border hover:border-primary/20 hover:shadow-lg"
              )}
            >
              <div className={cn(
                "inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4",
                category.highlight 
                  ? "bg-secondary text-secondary-foreground" 
                  : "bg-primary/10 text-primary"
              )}>
                <category.icon className="h-6 w-6" />
              </div>
              
              <h3 className={cn(
                "text-lg font-bold mb-2",
                !category.highlight && "text-foreground"
              )}>
                {t(category.key)}
              </h3>
              
              <p className={cn(
                "text-sm mb-4",
                category.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {category.desc}
              </p>
              
              <div className={cn(
                "flex items-center gap-1 text-sm font-semibold",
                category.highlight ? "text-secondary" : "text-primary"
              )}>
                {t('common.viewDetails')}
                <Arrow className="h-4 w-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
              
              {category.highlight && (
                <div className="absolute top-3 end-3 px-2 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-md">
                  {isRTL ? 'وكيل معتمد' : 'Authorized'}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
