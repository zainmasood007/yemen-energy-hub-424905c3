import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sun, Shield, Clock, MapPin, Battery, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85" />
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

      <div className="container relative z-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className={cn("text-center lg:text-start", isRTL && "lg:order-2")}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">{t('hero.badge')}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-5 leading-tight">
              <span className="block">{isRTL ? 'طاقة نظيفة' : 'Clean Energy'}</span>
              <span className="block text-secondary">{isRTL ? 'لمستقبل أفضل' : 'For a Better Future'}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-primary-foreground/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button 
                asChild 
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <a href="https://wa.me/967777777777" target="_blank" rel="noopener noreferrer">
                  {t('hero.cta')}
                  <Arrow className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-6 py-6 text-base"
              >
                <Link to="/products">
                  {t('hero.ctaSecondary')}
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-10">
              {[
                { icon: Shield, label: isRTL ? 'ضمان 10 سنوات' : '10 Years Warranty' },
                { icon: Clock, label: isRTL ? 'دعم 24/7' : '24/7 Support' },
                { icon: MapPin, label: isRTL ? 'تغطية شاملة' : 'Full Coverage' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                  <item.icon className="h-4 w-4 text-secondary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual - simplified */}
          <div className={cn("relative hidden lg:flex items-center justify-center", isRTL && "lg:order-1")}>
            <div className="relative w-full max-w-md">
              {/* Main visual container */}
              <div className="relative aspect-square rounded-3xl bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center p-8">
                <div className="text-center">
                  <Sun className="h-16 w-16 text-secondary mx-auto mb-4" />
                  <div className="text-4xl font-black text-primary-foreground mb-1">500+</div>
                  <div className="text-sm text-primary-foreground/70">{isRTL ? 'مشروع منجز' : 'Projects Done'}</div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -end-4 bg-card rounded-xl p-3 shadow-lg border border-border">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Battery className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">Pylontech</div>
                    <div className="text-xs text-muted-foreground">{isRTL ? 'وكيل معتمد' : 'Authorized'}</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -start-4 bg-card rounded-xl p-3 shadow-lg border border-border">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Award className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">10+</div>
                    <div className="text-xs text-muted-foreground">{isRTL ? 'سنوات خبرة' : 'Years Exp'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full h-12 fill-background">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
