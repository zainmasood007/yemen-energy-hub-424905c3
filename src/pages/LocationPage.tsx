import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { MapPin, Sun, Battery, Wrench, Phone, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO, { createBreadcrumbSchema, localBusinessSchema } from '@/components/SEO';

// City data
const cities = {
  sanaa: {
    nameAr: 'صنعاء',
    nameEn: "Sana'a",
    descAr: 'العاصمة ومركز الأعمال الرئيسي',
    descEn: 'The capital and main business hub',
    solarPotentialAr: 'صنعاء تتميز بارتفاعها عن سطح البحر وسماء صافية معظم أيام السنة، مما يجعلها مثالية للطاقة الشمسية مع متوسط إشعاع شمسي يصل إلى 5.5 kWh/m²/day.',
    solarPotentialEn: "Sana'a is characterized by its high altitude and clear skies most of the year, making it ideal for solar energy with an average solar radiation of 5.5 kWh/m²/day.",
    challengesAr: ['انقطاع الكهرباء المتكرر', 'ارتفاع أسعار الوقود', 'الاعتماد على المولدات الباهظة'],
    challengesEn: ['Frequent power outages', 'High fuel prices', 'Reliance on expensive generators'],
    solutionsAr: ['أنظمة طاقة شمسية منزلية 3-10 كيلووات', 'أنظمة تجارية حتى 100 كيلووات', 'بطاريات Pylontech لتخزين الطاقة'],
    solutionsEn: ['Home solar systems 3-10 kW', 'Commercial systems up to 100 kW', 'Pylontech batteries for energy storage'],
    coordinates: { lat: 15.3694, lng: 44.191 }
  },
  aden: {
    nameAr: 'عدن',
    nameEn: 'Aden',
    descAr: 'العاصمة الاقتصادية والميناء الرئيسي',
    descEn: 'The economic capital and main port',
    solarPotentialAr: 'عدن تتميز بمناخ حار وإشعاع شمسي عالي على مدار السنة، مع متوسط 6.2 kWh/m²/day، مما يجعلها من أفضل المواقع للطاقة الشمسية.',
    solarPotentialEn: 'Aden features a hot climate and high solar radiation year-round, with an average of 6.2 kWh/m²/day, making it one of the best locations for solar energy.',
    challengesAr: ['درجات حرارة مرتفعة تؤثر على كفاءة الألواح', 'الرطوبة العالية', 'الحاجة للتبريد المستمر'],
    challengesEn: ['High temperatures affecting panel efficiency', 'High humidity', 'Need for continuous cooling'],
    solutionsAr: ['ألواح شمسية مقاومة للحرارة', 'أنظمة تهوية متقدمة', 'بطاريات Pylontech المصممة للمناخ الحار'],
    solutionsEn: ['Heat-resistant solar panels', 'Advanced ventilation systems', 'Pylontech batteries designed for hot climates'],
    coordinates: { lat: 12.7855, lng: 45.0187 }
  },
  taiz: {
    nameAr: 'تعز',
    nameEn: 'Taiz',
    descAr: 'العاصمة الثقافية ومركز صناعي مهم',
    descEn: 'The cultural capital and important industrial hub',
    solarPotentialAr: 'تعز تجمع بين المناخ المعتدل والإشعاع الشمسي الجيد مع متوسط 5.8 kWh/m²/day، مثالية للأنظمة السكنية والتجارية.',
    solarPotentialEn: 'Taiz combines a moderate climate with good solar radiation averaging 5.8 kWh/m²/day, ideal for residential and commercial systems.',
    challengesAr: ['انقطاع الكهرباء لفترات طويلة', 'تكلفة الوقود المرتفعة', 'الحاجة لحلول طاقة موثوقة'],
    challengesEn: ['Long power outages', 'High fuel costs', 'Need for reliable energy solutions'],
    solutionsAr: ['أنظمة هجينة تجمع بين الشبكة والطاقة الشمسية', 'تخزين طاقة كافي لـ 24+ ساعة', 'صيانة دورية مضمونة'],
    solutionsEn: ['Hybrid systems combining grid and solar', 'Energy storage for 24+ hours', 'Guaranteed regular maintenance'],
    coordinates: { lat: 13.5775, lng: 44.0178 }
  },
  hudaydah: {
    nameAr: 'الحديدة',
    nameEn: 'Hudaydah',
    descAr: 'الميناء الرئيسي على البحر الأحمر',
    descEn: 'The main port on the Red Sea',
    solarPotentialAr: 'الحديدة تتميز بأعلى معدلات الإشعاع الشمسي في اليمن مع متوسط 6.5 kWh/m²/day، مما يجعلها مثالية للمشاريع الكبيرة.',
    solarPotentialEn: 'Hudaydah has the highest solar radiation rates in Yemen with an average of 6.5 kWh/m²/day, making it ideal for large projects.',
    challengesAr: ['الرطوبة العالية والملوحة', 'درجات الحرارة المرتفعة', 'الحاجة لمعدات مقاومة للتآكل'],
    challengesEn: ['High humidity and salinity', 'High temperatures', 'Need for corrosion-resistant equipment'],
    solutionsAr: ['ألواح ومعدات مقاومة للتآكل', 'أنظمة تبريد متقدمة للبطاريات', 'صيانة دورية ضد الملوحة'],
    solutionsEn: ['Corrosion-resistant panels and equipment', 'Advanced battery cooling systems', 'Regular maintenance against salinity'],
    coordinates: { lat: 14.7979, lng: 42.9544 }
  }
};

type CityKey = keyof typeof cities;

export default function LocationPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  
  const city = cities[citySlug as CityKey];
  
  if (!city) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">{isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}</h1>
          <Link to="/" className="text-primary hover:underline">{isRTL ? 'العودة للرئيسية' : 'Back to Home'}</Link>
        </div>
      </Layout>
    );
  }

  const cityName = isRTL ? city.nameAr : city.nameEn;
  const challenges = isRTL ? city.challengesAr : city.challengesEn;
  const solutions = isRTL ? city.solutionsAr : city.solutionsEn;
  const solarPotential = isRTL ? city.solarPotentialAr : city.solarPotentialEn;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: isRTL ? 'الرئيسية' : 'Home', url: '/' },
    { name: isRTL ? 'مواقعنا' : 'Locations', url: '/locations' },
    { name: cityName, url: `/locations/${citySlug}` },
  ]);

  const localBusinessSchemaCity = {
    ...localBusinessSchema,
    "@id": `https://alqatta.com/locations/${citySlug}#business`,
    "name": isRTL ? `القطاع للطاقة الشمسية - ${cityName}` : `Al-Qatta Solar Energy - ${cityName}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.nameEn,
      "addressCountry": "YE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.coordinates.lat,
      "longitude": city.coordinates.lng
    },
    "areaServed": {
      "@type": "City",
      "name": city.nameEn
    }
  };

  return (
    <Layout>
      <SEO
        title={`Solar Energy in ${city.nameEn}, Yemen | Al-Qatta Solar Energy`}
        titleAr={`الطاقة الشمسية في ${city.nameAr}، اليمن | القطاع للطاقة الشمسية`}
        description={`Professional solar energy installation and Pylontech batteries in ${city.nameEn}, Yemen. Complete solar solutions for homes and businesses with expert installation and maintenance.`}
        descriptionAr={`تركيب طاقة شمسية احترافي وبطاريات Pylontech في ${city.nameAr}، اليمن. حلول طاقة شمسية متكاملة للمنازل والشركات مع تركيب وصيانة من خبراء.`}
        keywords={`solar energy ${city.nameEn.toLowerCase()}, solar panels ${city.nameEn.toLowerCase()}, pylontech ${city.nameEn.toLowerCase()}, solar installation ${city.nameEn.toLowerCase()} yemen`}
        keywordsAr={`طاقة شمسية ${city.nameAr}، ألواح شمسية ${city.nameAr}، بايلونتيك ${city.nameAr}، تركيب طاقة شمسية ${city.nameAr} اليمن`}
        canonical={`/locations/${citySlug}`}
        jsonLd={[breadcrumbSchema, localBusinessSchemaCity]}
      />

      {/* Hero */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-20" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              {isRTL ? 'خدماتنا في' : 'Our Services in'} {cityName}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {isRTL ? `الطاقة الشمسية في ${cityName}` : `Solar Energy in ${cityName}`}
            </h1>
            <p className="text-lg opacity-90 mb-8">
              {isRTL ? city.descAr : city.descEn}
            </p>
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <a href="https://wa.me/967777777777" target="_blank" rel="noopener noreferrer">
                {isRTL ? 'تواصل معنا الآن' : 'Contact Us Now'}
                <Arrow className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Solar Potential */}
      <section className="py-16 bg-surface">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-secondary/10 text-secondary flex-shrink-0">
                <Sun className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">
                  {isRTL ? `إمكانات الطاقة الشمسية في ${cityName}` : `Solar Potential in ${cityName}`}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{solarPotential}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Challenges */}
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-destructive">
                {isRTL ? `تحديات الطاقة في ${cityName}` : `Energy Challenges in ${cityName}`}
              </h3>
              <ul className="space-y-3">
                {challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-full bg-destructive/10 text-destructive text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-success/5 border border-success/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-success">
                {isRTL ? 'حلولنا' : 'Our Solutions'}
              </h3>
              <ul className="space-y-3">
                {solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services in City */}
      <section className="py-16 bg-surface">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isRTL ? `خدماتنا في ${cityName}` : `Our Services in ${cityName}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Sun, title: isRTL ? 'تركيب الألواح الشمسية' : 'Solar Panel Installation', desc: isRTL ? 'تركيب احترافي بأيدي خبراء' : 'Professional installation by experts' },
              { icon: Battery, title: isRTL ? 'بطاريات Pylontech' : 'Pylontech Batteries', desc: isRTL ? 'بطاريات أصلية مع ضمان 10 سنوات' : 'Original batteries with 10-year warranty' },
              { icon: Wrench, title: isRTL ? 'الصيانة والدعم' : 'Maintenance & Support', desc: isRTL ? 'صيانة دورية ودعم فني 24/7' : 'Regular maintenance and 24/7 support' },
            ].map((service, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary mb-4">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-secondary to-warning rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
              {isRTL ? `هل أنت في ${cityName}؟` : `Are You in ${cityName}?`}
            </h2>
            <p className="text-secondary-foreground/80 mb-6 max-w-xl mx-auto">
              {isRTL 
                ? 'تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مخصص لمنطقتك'
                : 'Contact us now for a free consultation and a customized quote for your area'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <a href="https://wa.me/967777777777" target="_blank" rel="noopener noreferrer">
                  {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
                <a href="tel:+967777777777">
                  <Phone className="h-4 w-4" />
                  {isRTL ? 'اتصل بنا' : 'Call Us'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-16 bg-surface">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">
            {isRTL ? 'مواقعنا الأخرى' : 'Our Other Locations'}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(cities)
              .filter(([slug]) => slug !== citySlug)
              .map(([slug, c]) => (
                <Link
                  key={slug}
                  to={`/locations/${slug}`}
                  className="px-6 py-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <span className="font-medium">{isRTL ? c.nameAr : c.nameEn}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
