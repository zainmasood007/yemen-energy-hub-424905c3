import { Phone, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="rounded-2xl bg-secondary p-8 md:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-foreground/10 text-secondary-foreground text-sm font-medium mb-5">
              <Sparkles className="h-4 w-4" />
              <span>{isRTL ? 'استشارة مجانية' : 'Free Consultation'}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-secondary-foreground mb-4">
              {isRTL ? 'هل أنت جاهز للتحول إلى الطاقة الشمسية؟' : 'Ready to Switch to Solar Energy?'}
            </h2>
            <p className="text-secondary-foreground/80 mb-8 text-base leading-relaxed">
              {isRTL 
                ? 'تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجاتك'
                : 'Contact us today for a free consultation and a customized quote for your needs'
              }
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button 
                asChild 
                size="lg"
                className="bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90 px-6 py-6 text-base font-semibold"
              >
                <a href="https://wa.me/967777777777" target="_blank" rel="noopener noreferrer">
                  {t('hero.cta')}
                </a>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 px-6 py-6 text-base"
              >
                <a href="tel:+967777777777">
                  <Phone className="h-4 w-4" />
                  {t('contact.phone')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
