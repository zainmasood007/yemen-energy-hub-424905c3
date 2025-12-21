import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Wrench } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function ServicesSection() {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const services = [
    { key: 'services.items.design', icon: '📐' },
    { key: 'services.items.installation', icon: '🔧' },
    { key: 'services.items.storage', icon: '🔋' },
    { key: 'services.items.consultation', icon: '💡' },
    { key: 'services.items.maintenance', icon: '🛠️' },
    { key: 'services.items.assessment', icon: '📊' },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3">
            <Wrench className="h-4 w-4" />
            <span>{isRTL ? 'خدماتنا' : 'Our Services'}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-3">{t('services.title')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('services.subtitle')}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link
              key={service.key}
              to="/services"
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {t(`${service.key}.title`)}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {t(`${service.key}.desc`)}
              </p>
              <div className="flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {t('common.learnMore')}
                <Arrow className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
