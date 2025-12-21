import { Users, Star, Quote } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function TestimonialsSection() {
  const { isRTL } = useLanguage();

  const testimonials = [
    {
      nameAr: 'محمد أحمد العامري',
      nameEn: 'Mohammed Ahmed Al-Ameri',
      roleAr: 'صاحب منزل - صنعاء',
      roleEn: 'Homeowner - Sana\'a',
      textAr: 'أفضل استثمار قمت به! النظام يعمل بشكل ممتاز منذ سنتين بدون أي مشاكل.',
      textEn: 'Best investment I made! The system has been working perfectly for 2 years without any issues.',
      rating: 5
    },
    {
      nameAr: 'شركة النور للتجارة',
      nameEn: 'Al-Nour Trading Company',
      roleAr: 'مكتب تجاري - عدن',
      roleEn: 'Commercial Office - Aden',
      textAr: 'وفرنا أكثر من 70% من تكاليف الكهرباء. بطاريات Pylontech ممتازة.',
      textEn: 'We saved over 70% on electricity costs. Pylontech batteries are excellent.',
      rating: 5
    },
    {
      nameAr: 'علي حسن المقطري',
      nameEn: 'Ali Hassan Al-Maqtari',
      roleAr: 'مزارع - تعز',
      roleEn: 'Farmer - Taiz',
      textAr: 'حلّوا لي مشكلة ضخ المياه للمزرعة. النظام قوي ويعمل بكفاءة عالية.',
      textEn: 'They solved my farm water pumping problem. The system is powerful and works efficiently.',
      rating: 5
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-3">
            <Users className="h-4 w-4" />
            <span>{isRTL ? 'آراء عملائنا' : 'Customer Reviews'}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            {isRTL ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {isRTL ? 'نفتخر بثقة عملائنا وشهاداتهم عن خدماتنا' : 'We are proud of our clients\' trust and testimonials'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-secondary/20 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-4 end-4 text-secondary/20">
                <Quote className="h-8 w-8" />
              </div>
              
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-secondary fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-5 leading-relaxed text-sm">
                "{isRTL ? testimonial.textAr : testimonial.textEn}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {(isRTL ? testimonial.nameAr : testimonial.nameEn).charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm">{isRTL ? testimonial.nameAr : testimonial.nameEn}</div>
                  <div className="text-xs text-muted-foreground">{isRTL ? testimonial.roleAr : testimonial.roleEn}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
