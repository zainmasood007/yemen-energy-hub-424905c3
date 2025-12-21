import { Zap, Award, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function StatsSection() {
  const { isRTL } = useLanguage();
  
  const stats = [
    { value: '500+', label: isRTL ? 'مشروع منجز' : 'Projects Completed', icon: Zap },
    { value: '10+', label: isRTL ? 'سنوات خبرة' : 'Years Experience', icon: Award },
    { value: '18', label: isRTL ? 'محافظة نخدمها' : 'Governorates Served', icon: MapPin },
    { value: '24/7', label: isRTL ? 'دعم فني' : 'Technical Support', icon: Clock },
  ];

  return (
    <section className="py-12 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-secondary-foreground/10 mb-3">
                <stat.icon className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-secondary-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-secondary-foreground/75 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
