// Articles Data
// Centralized knowledge hub articles data
// Moved from src/pages/knowledge/index.tsx for admin panel integration

import { 
  Zap, Battery, Sun, Calculator, Wrench, RefreshCw, ArrowUpDown 
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface PillarPage {
  slug: string;
  icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  status: 'published' | 'draft';
  contentMarkdownAr?: string;
  contentMarkdownEn?: string;
}

export interface SupportingArticle {
  slug: string;
  icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  pillarAr: string;
  pillarEn: string;
  pillarSlug?: string;
  contentMarkdownAr?: string;
  contentMarkdownEn?: string;
}

export const pillarPages: PillarPage[] = [
  {
    slug: 'inverter-guide',
    icon: Zap,
    titleAr: 'دليل اختيار الانفرتر المناسب',
    titleEn: 'Inverter Selection Guide',
    descAr: 'كيف تختار الانفرتر الأنسب لمنزلك أو مشروعك؟ جداول توصيات ومقارنات شاملة.',
    descEn: 'How to choose the right inverter for your home or project? Recommendation tables and comprehensive comparisons.',
    status: 'published',
  },
  {
    slug: 'lithium-vs-lead-acid',
    icon: Battery,
    titleAr: 'بطاريات الليثيوم vs الرصاص',
    titleEn: 'Lithium vs Lead-Acid Batteries',
    descAr: 'مقارنة تعليمية شاملة بين تقنيات البطاريات. أيهما يناسبك؟',
    descEn: 'Comprehensive educational comparison between battery technologies. Which suits you?',
    status: 'published',
  },
  {
    slug: 'solar-yemen-guide',
    icon: Sun,
    titleAr: 'الطاقة الشمسية في اليمن - الدليل الشامل',
    titleEn: 'Solar Energy in Yemen - Complete Guide',
    descAr: 'كل ما تحتاج معرفته عن الطاقة الشمسية في اليمن: المناخ، التحديات، الحلول.',
    descEn: 'Everything you need to know about solar energy in Yemen: climate, challenges, solutions.',
    status: 'published',
  },
];

export const supportingArticles: SupportingArticle[] = [
  {
    slug: 'inverter-sizing',
    icon: Calculator,
    titleAr: 'كيف تحسب حجم الانفرتر المناسب',
    titleEn: 'How to Calculate Inverter Size',
    pillarAr: 'الانفرترات',
    pillarEn: 'Inverters',
    pillarSlug: 'inverter-guide',
  },
  {
    slug: 'inverter-common-faults',
    icon: Wrench,
    titleAr: 'أعطال الانفرتر الشائعة وحلولها',
    titleEn: 'Common Inverter Faults & Solutions',
    pillarAr: 'الانفرترات',
    pillarEn: 'Inverters',
    pillarSlug: 'inverter-guide',
  },
  {
    slug: 'lithium-battery-lifespan',
    icon: RefreshCw,
    titleAr: 'كم تدوم بطارية الليثيوم؟',
    titleEn: 'How Long Do Lithium Batteries Last?',
    pillarAr: 'البطاريات',
    pillarEn: 'Batteries',
    pillarSlug: 'lithium-vs-lead-acid',
  },
  {
    slug: 'series-vs-parallel-batteries',
    icon: ArrowUpDown,
    titleAr: 'توصيل البطاريات: توالي vs توازي',
    titleEn: 'Battery Wiring: Series vs Parallel',
    pillarAr: 'البطاريات',
    pillarEn: 'Batteries',
    pillarSlug: 'lithium-vs-lead-acid',
  },
  {
    slug: 'solar-system-cost-yemen',
    icon: Calculator,
    titleAr: 'تكلفة نظام الطاقة الشمسية في اليمن',
    titleEn: 'Solar System Cost in Yemen',
    pillarAr: 'الطاقة الشمسية',
    pillarEn: 'Solar Energy',
    pillarSlug: 'solar-yemen-guide',
  },
];

// Helper functions
export const getPillarBySlug = (slug: string): PillarPage | undefined => {
  return pillarPages.find(p => p.slug === slug);
};

export const getSupportingBySlug = (slug: string): SupportingArticle | undefined => {
  return supportingArticles.find(a => a.slug === slug);
};

export const getSupportingByPillar = (pillarSlug: string): SupportingArticle[] => {
  return supportingArticles.filter(a => a.pillarSlug === pillarSlug);
};

export const getAllArticles = () => {
  return {
    pillarPages,
    supportingArticles,
  };
};
