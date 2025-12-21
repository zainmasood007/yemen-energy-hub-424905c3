import { Shield, CheckCircle2, Wrench, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, titleKey: 'features.authorized.title', descKey: 'features.authorized.desc' },
    { icon: CheckCircle2, titleKey: 'features.warranty.title', descKey: 'features.warranty.desc' },
    { icon: Wrench, titleKey: 'features.expertise.title', descKey: 'features.expertise.desc' },
    { icon: MapPin, titleKey: 'features.coverage.title', descKey: 'features.coverage.desc' },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>{t('features.title')}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-3">{t('features.title')}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.titleKey}
              className={cn(
                "group relative bg-card border border-border rounded-xl p-6 text-center",
                "hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
              )}
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t(feature.titleKey)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
