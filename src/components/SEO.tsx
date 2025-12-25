import { useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

interface SEOProps {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  keywords?: string;
  keywordsAr?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  jsonLd?: object | object[];
  hreflang?: { lang: string; href: string }[];
}

export default function SEO({
  title,
  titleAr,
  description,
  descriptionAr,
  keywords,
  keywordsAr,
  canonical,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  noIndex = false,
  jsonLd,
  hreflang,
}: SEOProps) {
  const { lang, isRTL } = useLanguage();
  
  const currentTitle = isRTL && titleAr ? titleAr : title;
  const currentDescription = isRTL && descriptionAr ? descriptionAr : description;
  const currentKeywords = isRTL && keywordsAr ? keywordsAr : keywords;
  const baseUrl = 'https://alqatta.com';
  const currentUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

  useEffect(() => {
    // Update document title
    document.title = currentTitle;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    setMeta('description', currentDescription);
    if (currentKeywords) setMeta('keywords', currentKeywords);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    
    // Open Graph
    setMeta('og:title', currentTitle, true);
    setMeta('og:description', currentDescription, true);
    setMeta('og:type', ogType, true);
    setMeta('og:url', currentUrl, true);
    setMeta('og:image', `${baseUrl}${ogImage}`, true);
    setMeta('og:site_name', isRTL ? 'القطع للطاقة الشمسية' : 'Al-Qatta Solar Energy', true);
    setMeta('og:locale', isRTL ? 'ar_YE' : 'en_US', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', currentTitle);
    setMeta('twitter:description', currentDescription);
    setMeta('twitter:image', `${baseUrl}${ogImage}`);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    // Update hreflang links
    const updateHreflang = (hreflang: string, href: string) => {
      let link = document.querySelector(`link[hreflang="${hreflang}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        document.head.appendChild(link);
      }
      link.href = href;
    };
    
    updateHreflang('ar', currentUrl);
    updateHreflang('en', currentUrl);
    updateHreflang('x-default', currentUrl);

    // Update JSON-LD
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach(schema => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Cleanup is handled by next SEO component mounting
    };
  }, [currentTitle, currentDescription, currentKeywords, currentUrl, ogImage, ogType, noIndex, jsonLd, isRTL]);

  return null;
}

// ============ JSON-LD Schema Helpers ============

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Al-Qatta Solar Energy",
  "alternateName": "القطع للطاقة الشمسية",
  "url": "https://alqatta.com",
  "logo": "https://alqatta.com/logo.png",
  "description": "The only authorized Pylontech agent in Yemen. Solar energy solutions and energy storage systems.",
  "foundingDate": "2014",
  "areaServed": {
    "@type": "Country",
    "name": "Yemen"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+967-777-800-063",
    "contactType": "sales",
    "availableLanguage": ["Arabic", "English"]
  },
  "sameAs": [
    "https://facebook.com/alqattasolar",
    "https://instagram.com/alqattasolar"
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://alqatta.com/#business",
  "name": "Al-Qatta Solar Energy",
  "alternateName": "القطع للطاقة الشمسية",
  "image": "https://alqatta.com/logo.png",
  "url": "https://alqatta.com",
  "telephone": "+967-777-800-063",
  "email": "info@alqatta.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sho'ub, in front of Military Hospital",
    "addressLocality": "Sana'a",
    "addressCountry": "YE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 15.3694,
    "longitude": 44.191
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "priceRange": "$$",
  "paymentAccepted": "Cash",
  "currenciesAccepted": "YER, USD"
};

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://alqatta.com${item.url}`
  }))
});

// Advanced Product Schema with offers, ratings, and reviews
export const createAdvancedProductSchema = (product: {
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  image?: string;
  brand?: string;
  model?: string;
  category?: string;
  sku?: string;
  url?: string;
  isAvailable?: boolean;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  reviews?: Array<{
    author: string;
    datePublished: string;
    reviewBody: string;
    ratingValue: number;
  }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "alternateName": product.nameAr,
  "description": product.description,
  "image": product.image || "https://alqatta.com/placeholder.svg",
  "brand": {
    "@type": "Brand",
    "name": product.brand || "Al-Qatta"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": product.brand || "Al-Qatta"
  },
  "model": product.model,
  "sku": product.sku || product.model,
  "category": product.category || "Solar Energy Equipment",
  "url": product.url ? `https://alqatta.com${product.url}` : undefined,
  "offers": {
    "@type": "Offer",
    "availability": product.isAvailable !== false 
      ? "https://schema.org/InStock" 
      : "https://schema.org/OutOfStock",
    "priceCurrency": "USD",
    "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Al-Qatta Solar Energy",
      "url": "https://alqatta.com"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "YE"
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30
    }
  },
  ...(product.aggregateRating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.aggregateRating.ratingValue,
      "reviewCount": product.aggregateRating.reviewCount,
      "bestRating": product.aggregateRating.bestRating || 5,
      "worstRating": product.aggregateRating.worstRating || 1
    }
  }),
  ...(product.reviews && product.reviews.length > 0 && {
    "review": product.reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.datePublished,
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.ratingValue,
        "bestRating": 5,
        "worstRating": 1
      }
    }))
  })
});

// Simple Product Schema (backward compatibility)
export const createProductSchema = (product: {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  category?: string;
}) => createAdvancedProductSchema(product);

export const createServiceSchema = (service: {
  name: string;
  description: string;
  areaServed?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "Al-Qatta Solar Energy"
  },
  "areaServed": {
    "@type": "Country",
    "name": service.areaServed || "Yemen"
  },
  "serviceType": "Solar Energy Installation and Maintenance"
});

export const createFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Article Schema for knowledge hub and blog posts
export const createArticleSchema = (article: {
  headline: string;
  headlineAr?: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": article.headline,
  "alternativeHeadline": article.headlineAr,
  "description": article.description,
  "image": article.image || "https://alqatta.com/og-image.jpg",
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "author": {
    "@type": "Organization",
    "name": article.author || "Al-Qatta Solar Energy",
    "url": "https://alqatta.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Al-Qatta Solar Energy",
    "logo": {
      "@type": "ImageObject",
      "url": "https://alqatta.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url ? `https://alqatta.com${article.url}` : "https://alqatta.com"
  },
  "inLanguage": ["ar", "en"],
  "about": {
    "@type": "Thing",
    "name": "Solar Energy in Yemen"
  }
});

// HowTo Schema for guides
export const createHowToSchema = (howTo: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howTo.name,
  "description": howTo.description,
  "totalTime": howTo.totalTime || "PT30M",
  "step": howTo.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    ...(step.image && { "image": step.image })
  }))
});
