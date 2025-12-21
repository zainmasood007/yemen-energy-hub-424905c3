import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { 
  Battery, Sun, Zap, ArrowLeft, ArrowRight, Settings, Cable, 
  Shield, Check, Star, Phone, Filter, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SEO, { createBreadcrumbSchema, createProductSchema } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  specs: { labelEn: string; labelAr: string; value: string }[];
  badge?: string;
  badgeAr?: string;
}

interface Category {
  id: string;
  key: string;
  icon: typeof Battery;
  highlight?: boolean;
  descEn: string;
  descAr: string;
  products: Product[];
}

const categories: Category[] = [
  { 
    id: 'pylontech',
    key: 'products.categories.pylontech', 
    icon: Battery, 
    highlight: true,
    descEn: 'Original Pylontech LiFePO4 batteries - The world\'s #1 energy storage brand',
    descAr: 'بطاريات ليثيوم فوسفات الحديد الأصلية من Pylontech - العلامة الأولى عالمياً',
    products: [
      {
        id: 'us2000c',
        nameEn: 'Pylontech US2000C',
        nameAr: 'بايلونتيك US2000C',
        descEn: '48V 50Ah lithium battery module, ideal for home systems',
        descAr: 'وحدة بطارية ليثيوم 48 فولت 50 أمبير، مثالية للأنظمة المنزلية',
        specs: [
          { labelEn: 'Capacity', labelAr: 'السعة', value: '2.4 kWh' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '48V' },
          { labelEn: 'Cycles', labelAr: 'دورات الشحن', value: '6000+' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '10 Years' },
        ],
        badge: 'Best Seller',
        badgeAr: 'الأكثر مبيعاً'
      },
      {
        id: 'us3000c',
        nameEn: 'Pylontech US3000C',
        nameAr: 'بايلونتيك US3000C',
        descEn: '48V 74Ah lithium battery module, higher capacity for demanding needs',
        descAr: 'وحدة بطارية ليثيوم 48 فولت 74 أمبير، سعة أعلى للاحتياجات الكبيرة',
        specs: [
          { labelEn: 'Capacity', labelAr: 'السعة', value: '3.55 kWh' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '48V' },
          { labelEn: 'Cycles', labelAr: 'دورات الشحن', value: '6000+' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '10 Years' },
        ],
      },
      {
        id: 'us5000',
        nameEn: 'Pylontech US5000',
        nameAr: 'بايلونتيك US5000',
        descEn: '48V 100Ah high-capacity module for commercial applications',
        descAr: 'وحدة عالية السعة 48 فولت 100 أمبير للتطبيقات التجارية',
        specs: [
          { labelEn: 'Capacity', labelAr: 'السعة', value: '4.8 kWh' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '48V' },
          { labelEn: 'Cycles', labelAr: 'دورات الشحن', value: '6000+' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '10 Years' },
        ],
        badge: 'New',
        badgeAr: 'جديد'
      },
      {
        id: 'force-h1',
        nameEn: 'Pylontech Force H1',
        nameAr: 'بايلونتيك Force H1',
        descEn: 'High-voltage battery system for large residential installations',
        descAr: 'نظام بطاريات عالي الفولتية للمنشآت السكنية الكبيرة',
        specs: [
          { labelEn: 'Capacity', labelAr: 'السعة', value: '7.1 kWh' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '192V' },
          { labelEn: 'Cycles', labelAr: 'دورات الشحن', value: '6000+' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '10 Years' },
        ],
      },
    ]
  },
  { 
    id: 'lithium',
    key: 'products.categories.lithium', 
    icon: Battery,
    descEn: 'High-performance lithium batteries from premium brands',
    descAr: 'بطاريات ليثيوم عالية الأداء من أفضل العلامات التجارية',
    products: [
      {
        id: 'lifepo4-100',
        nameEn: 'LiFePO4 100Ah 12V',
        nameAr: 'ليثيوم فوسفات 100 أمبير 12 فولت',
        descEn: 'Compact lithium battery for small solar systems',
        descAr: 'بطارية ليثيوم مدمجة للأنظمة الشمسية الصغيرة',
        specs: [
          { labelEn: 'Capacity', labelAr: 'السعة', value: '1.28 kWh' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '12.8V' },
          { labelEn: 'Cycles', labelAr: 'دورات الشحن', value: '4000+' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '5 Years' },
        ],
      },
      {
        id: 'lifepo4-200',
        nameEn: 'LiFePO4 200Ah 12V',
        nameAr: 'ليثيوم فوسفات 200 أمبير 12 فولت',
        descEn: 'Medium capacity for home backup systems',
        descAr: 'سعة متوسطة لأنظمة النسخ الاحتياطي المنزلية',
        specs: [
          { labelEn: 'Capacity', labelAr: 'السعة', value: '2.56 kWh' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '12.8V' },
          { labelEn: 'Cycles', labelAr: 'دورات الشحن', value: '4000+' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '5 Years' },
        ],
        badge: 'Popular',
        badgeAr: 'رائج'
      },
      {
        id: 'lifepo4-48v-100',
        nameEn: 'LiFePO4 100Ah 48V',
        nameAr: 'ليثيوم فوسفات 100 أمبير 48 فولت',
        descEn: 'High-capacity 48V system for larger installations',
        descAr: 'نظام 48 فولت عالي السعة للمنشآت الكبيرة',
        specs: [
          { labelEn: 'Capacity', labelAr: 'السعة', value: '5.12 kWh' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '51.2V' },
          { labelEn: 'Cycles', labelAr: 'دورات الشحن', value: '4000+' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '5 Years' },
        ],
      },
    ]
  },
  { 
    id: 'panels',
    key: 'products.categories.panels', 
    icon: Sun,
    descEn: 'High-efficiency mono and poly crystalline solar panels',
    descAr: 'ألواح شمسية أحادية ومتعددة البلورات بكفاءة عالية',
    products: [
      {
        id: 'mono-550w',
        nameEn: 'Monocrystalline 550W',
        nameAr: 'لوح أحادي البلورات 550 واط',
        descEn: 'Premium half-cut monocrystalline panel with high efficiency',
        descAr: 'لوح أحادي البلورات ممتاز مع كفاءة عالية',
        specs: [
          { labelEn: 'Power', labelAr: 'القدرة', value: '550W' },
          { labelEn: 'Efficiency', labelAr: 'الكفاءة', value: '21.3%' },
          { labelEn: 'Type', labelAr: 'النوع', value: 'Mono PERC' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '25 Years' },
        ],
        badge: 'Best Value',
        badgeAr: 'أفضل قيمة'
      },
      {
        id: 'mono-450w',
        nameEn: 'Monocrystalline 450W',
        nameAr: 'لوح أحادي البلورات 450 واط',
        descEn: 'Versatile monocrystalline panel for various applications',
        descAr: 'لوح متعدد الاستخدامات للتطبيقات المختلفة',
        specs: [
          { labelEn: 'Power', labelAr: 'القدرة', value: '450W' },
          { labelEn: 'Efficiency', labelAr: 'الكفاءة', value: '20.5%' },
          { labelEn: 'Type', labelAr: 'النوع', value: 'Mono PERC' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '25 Years' },
        ],
      },
      {
        id: 'poly-330w',
        nameEn: 'Polycrystalline 330W',
        nameAr: 'لوح متعدد البلورات 330 واط',
        descEn: 'Cost-effective polycrystalline panel for budget systems',
        descAr: 'لوح اقتصادي للأنظمة ذات الميزانية المحدودة',
        specs: [
          { labelEn: 'Power', labelAr: 'القدرة', value: '330W' },
          { labelEn: 'Efficiency', labelAr: 'الكفاءة', value: '17.5%' },
          { labelEn: 'Type', labelAr: 'النوع', value: 'Polycrystalline' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '25 Years' },
        ],
      },
    ]
  },
  { 
    id: 'inverters',
    key: 'products.categories.inverters', 
    icon: Zap,
    descEn: 'Hybrid and off-grid inverters from trusted brands',
    descAr: 'انفرترات هجينة وخارج الشبكة من علامات موثوقة',
    products: [
      {
        id: 'hybrid-5kw',
        nameEn: 'Hybrid Inverter 5kW',
        nameAr: 'انفرتر هجين 5 كيلووات',
        descEn: 'Perfect for medium homes with battery backup',
        descAr: 'مثالي للمنازل المتوسطة مع نسخ احتياطي بالبطارية',
        specs: [
          { labelEn: 'Power', labelAr: 'القدرة', value: '5kW' },
          { labelEn: 'Type', labelAr: 'النوع', value: 'Hybrid' },
          { labelEn: 'MPPT', labelAr: 'MPPT', value: '2 x 80A' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '5 Years' },
        ],
        badge: 'Popular',
        badgeAr: 'رائج'
      },
      {
        id: 'hybrid-8kw',
        nameEn: 'Hybrid Inverter 8kW',
        nameAr: 'انفرتر هجين 8 كيلووات',
        descEn: 'High-power inverter for larger residential needs',
        descAr: 'انفرتر عالي القدرة للاحتياجات السكنية الكبيرة',
        specs: [
          { labelEn: 'Power', labelAr: 'القدرة', value: '8kW' },
          { labelEn: 'Type', labelAr: 'النوع', value: 'Hybrid' },
          { labelEn: 'MPPT', labelAr: 'MPPT', value: '2 x 100A' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '5 Years' },
        ],
      },
      {
        id: 'offgrid-3kw',
        nameEn: 'Off-Grid Inverter 3kW',
        nameAr: 'انفرتر خارج الشبكة 3 كيلووات',
        descEn: 'Reliable off-grid solution for remote locations',
        descAr: 'حل موثوق خارج الشبكة للمواقع النائية',
        specs: [
          { labelEn: 'Power', labelAr: 'القدرة', value: '3kW' },
          { labelEn: 'Type', labelAr: 'النوع', value: 'Off-Grid' },
          { labelEn: 'MPPT', labelAr: 'MPPT', value: '1 x 60A' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '3 Years' },
        ],
      },
    ]
  },
  { 
    id: 'controllers',
    key: 'products.categories.controllers', 
    icon: Settings,
    descEn: 'MPPT and PWM charge controllers for optimal charging',
    descAr: 'منظمات شحن MPPT و PWM للشحن الأمثل',
    products: [
      {
        id: 'mppt-60a',
        nameEn: 'MPPT Controller 60A',
        nameAr: 'منظم MPPT 60 أمبير',
        descEn: 'Efficient MPPT controller for medium systems',
        descAr: 'منظم MPPT فعال للأنظمة المتوسطة',
        specs: [
          { labelEn: 'Current', labelAr: 'التيار', value: '60A' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '12/24/48V' },
          { labelEn: 'Efficiency', labelAr: 'الكفاءة', value: '99%' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '2 Years' },
        ],
      },
      {
        id: 'mppt-80a',
        nameEn: 'MPPT Controller 80A',
        nameAr: 'منظم MPPT 80 أمبير',
        descEn: 'High-capacity controller for larger arrays',
        descAr: 'منظم عالي السعة للمصفوفات الكبيرة',
        specs: [
          { labelEn: 'Current', labelAr: 'التيار', value: '80A' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '12/24/48V' },
          { labelEn: 'Efficiency', labelAr: 'الكفاءة', value: '99%' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '2 Years' },
        ],
        badge: 'Popular',
        badgeAr: 'رائج'
      },
      {
        id: 'mppt-100a',
        nameEn: 'MPPT Controller 100A',
        nameAr: 'منظم MPPT 100 أمبير',
        descEn: 'Premium controller for commercial installations',
        descAr: 'منظم ممتاز للمنشآت التجارية',
        specs: [
          { labelEn: 'Current', labelAr: 'التيار', value: '100A' },
          { labelEn: 'Voltage', labelAr: 'الفولتية', value: '12/24/48V' },
          { labelEn: 'Efficiency', labelAr: 'الكفاءة', value: '99%' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '2 Years' },
        ],
      },
    ]
  },
  { 
    id: 'accessories',
    key: 'products.categories.accessories', 
    icon: Cable,
    descEn: 'Cables, connectors, and mounting systems',
    descAr: 'كيبلات، موصلات، وأنظمة التثبيت',
    products: [
      {
        id: 'mc4-connectors',
        nameEn: 'MC4 Connectors Set',
        nameAr: 'طقم موصلات MC4',
        descEn: 'High-quality MC4 connectors for solar panels',
        descAr: 'موصلات MC4 عالية الجودة للألواح الشمسية',
        specs: [
          { labelEn: 'Type', labelAr: 'النوع', value: 'MC4' },
          { labelEn: 'Rating', labelAr: 'التصنيف', value: '30A/1000V' },
          { labelEn: 'Material', labelAr: 'المادة', value: 'Copper' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '1 Year' },
        ],
      },
      {
        id: 'solar-cables',
        nameEn: 'Solar Cables 6mm²',
        nameAr: 'كيبلات شمسية 6 مم²',
        descEn: 'UV-resistant solar cables for outdoor use',
        descAr: 'كيبلات مقاومة للأشعة فوق البنفسجية للاستخدام الخارجي',
        specs: [
          { labelEn: 'Size', labelAr: 'الحجم', value: '6mm²' },
          { labelEn: 'Rating', labelAr: 'التصنيف', value: '1000V DC' },
          { labelEn: 'Length', labelAr: 'الطول', value: '100m roll' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '1 Year' },
        ],
      },
      {
        id: 'mounting-kit',
        nameEn: 'Roof Mounting Kit',
        nameAr: 'طقم تثبيت السقف',
        descEn: 'Complete mounting system for roof installations',
        descAr: 'نظام تثبيت كامل للتركيب على السقف',
        specs: [
          { labelEn: 'Material', labelAr: 'المادة', value: 'Aluminum' },
          { labelEn: 'Type', labelAr: 'النوع', value: 'Roof Mount' },
          { labelEn: 'Capacity', labelAr: 'السعة', value: '4 Panels' },
          { labelEn: 'Warranty', labelAr: 'الضمان', value: '10 Years' },
        ],
      },
    ]
  },
];

export default function Products() {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const filteredCategories = activeCategory === 'all' 
    ? categories 
    : categories.filter(c => c.id === activeCategory);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: isRTL ? 'الرئيسية' : 'Home', url: '/' },
    { name: isRTL ? 'منتجاتنا' : 'Our Products', url: '/products' },
  ]);

  const productSchemas = categories.slice(0, 4).map(cat => createProductSchema({
    name: t(cat.key),
    description: isRTL ? cat.descAr : cat.descEn,
    brand: cat.id === 'pylontech' ? 'Pylontech' : 'Al-Qatta',
    category: 'Solar Energy Equipment'
  }));

  return (
    <Layout>
      <SEO
        title="Solar Products in Yemen | Pylontech Batteries, Solar Panels, Inverters"
        titleAr="منتجات الطاقة الشمسية في اليمن | بطاريات Pylontech، ألواح شمسية، انفرترات"
        description="Buy solar energy products in Yemen: Pylontech batteries, lithium batteries, solar panels, inverters, charge controllers. Original products with warranty."
        descriptionAr="اشتري منتجات الطاقة الشمسية في اليمن: بطاريات Pylontech، بطاريات ليثيوم، ألواح شمسية، انفرترات، منظمات شحن. منتجات أصلية مع ضمان."
        keywords="buy solar panels yemen, pylontech batteries yemen, solar inverter yemen, lithium battery yemen, charge controller yemen"
        keywordsAr="شراء ألواح شمسية اليمن، بطاريات بايلونتيك اليمن، انفرتر شمسي اليمن، بطارية ليثيوم اليمن، منظم شحن اليمن"
        canonical="/products"
        jsonLd={[breadcrumbSchema, ...productSchemas]}
      />

      {/* Hero */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>{isRTL ? 'منتجات أصلية مع ضمان' : 'Original Products with Warranty'}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">{t('products.title')}</h1>
            <p className="text-primary-foreground/80">{t('products.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-surface border-b border-border sticky top-16 z-40">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('all')}
              className="shrink-0"
            >
              <Filter className="h-4 w-4" />
              {isRTL ? 'الكل' : 'All'}
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className="shrink-0"
              >
                <cat.icon className="h-4 w-4" />
                {t(cat.key)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 bg-background">
        <div className="container">
          {filteredCategories.map((category) => (
            <div key={category.id} className="mb-12 last:mb-0">
              {/* Category Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={cn(
                  "inline-flex items-center justify-center h-12 w-12 rounded-xl shrink-0",
                  category.highlight 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-primary/10 text-primary"
                )}>
                  <category.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl md:text-2xl font-bold">{t(category.key)}</h2>
                    {category.highlight && (
                      <Badge className="bg-secondary text-secondary-foreground">
                        <Shield className="h-3 w-3" />
                        {isRTL ? 'وكيل معتمد' : 'Authorized'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {isRTL ? category.descAr : category.descEn}
                  </p>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.products.map((product) => (
                  <article 
                    key={product.id}
                    className="group bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    {/* Badge */}
                    {product.badge && (
                      <Badge className="mb-3 bg-secondary/10 text-secondary border-0">
                        <Star className="h-3 w-3" />
                        {isRTL ? product.badgeAr : product.badge}
                      </Badge>
                    )}

                    {/* Product Icon */}
                    <div className={cn(
                      "inline-flex items-center justify-center h-14 w-14 rounded-xl mb-4",
                      category.highlight 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <category.icon className="h-7 w-7" />
                    </div>

                    {/* Product Info */}
                    <h3 className="font-bold text-base mb-1">
                      {isRTL ? product.nameAr : product.nameEn}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {isRTL ? product.descAr : product.descEn}
                    </p>

                    {/* Specs */}
                    <div className="space-y-2 mb-4">
                      {product.specs.slice(0, 3).map((spec, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {isRTL ? spec.labelAr : spec.labelEn}
                          </span>
                          <span className="font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button asChild variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                      <a href="https://wa.me/967777777777" target="_blank" rel="noopener noreferrer">
                        <Phone className="h-4 w-4" />
                        {isRTL ? 'استفسر الآن' : 'Inquire Now'}
                      </a>
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-surface">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, titleEn: 'Warranty', titleAr: 'ضمان', descEn: 'Up to 10 years', descAr: 'حتى 10 سنوات' },
              { icon: Check, titleEn: 'Original', titleAr: 'أصلي', descEn: '100% Authentic', descAr: '100% أصلي' },
              { icon: Zap, titleEn: 'Support', titleAr: 'دعم', descEn: '24/7 Technical', descAr: 'فني 24/7' },
              { icon: Star, titleEn: 'Quality', titleAr: 'جودة', descEn: 'Premium Brands', descAr: 'علامات ممتازة' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary mb-3">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div className="font-bold text-sm mb-0.5">{isRTL ? feature.titleAr : feature.titleEn}</div>
                <div className="text-muted-foreground text-xs">{isRTL ? feature.descAr : feature.descEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container">
          <div className="bg-secondary rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-secondary-foreground mb-3">
              {isRTL ? 'هل تبحث عن منتج معين؟' : 'Looking for a Specific Product?'}
            </h2>
            <p className="text-secondary-foreground/80 mb-6 max-w-lg mx-auto text-sm">
              {isRTL 
                ? 'تواصل معنا للاستفسار عن أي منتج والحصول على أفضل الأسعار'
                : 'Contact us to inquire about any product and get the best prices'}
            </p>
            <Button asChild size="lg" className="bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90">
              <a href="https://wa.me/967777777777" target="_blank" rel="noopener noreferrer">
                <Phone className="h-4 w-4" />
                {t('contact.whatsapp')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
