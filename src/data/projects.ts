// Projects Data
// Centralized project data for the site
// Moved from src/pages/Projects.tsx for admin panel integration

import { Home, Building2, Factory } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  slug?: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  type: 'residential' | 'commercial' | 'institutional' | 'agricultural';
  location: { ar: string; en: string };
  systemSize: string;
  batteryCapacity: string;
  panels: number;
  date: string;
  images: string[];
  features: { ar: string[]; en: string[] };
  clientAr?: string;
  clientEn?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'villa-sanaa-residential',
    titleAr: 'نظام طاقة شمسية لفيلا سكنية - صنعاء',
    titleEn: 'Solar System for Residential Villa - Sana\'a',
    descAr: 'تركيب نظام طاقة شمسية متكامل لفيلا سكنية مع بطاريات Pylontech لتخزين الطاقة وتوفير الطاقة على مدار الساعة',
    descEn: 'Complete solar system installation for residential villa with Pylontech batteries for 24/7 energy storage',
    type: 'residential',
    location: { ar: 'صنعاء', en: "Sana'a" },
    systemSize: '10 kW',
    batteryCapacity: '14.4 kWh',
    panels: 20,
    date: '2024',
    clientAr: 'فيلا خاصة',
    clientEn: 'Private Villa',
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=600&fit=crop',
    ],
    features: {
      ar: ['20 لوح شمسي 550W', 'بطاريات Pylontech US3000C × 4', 'انفرتر هجين 10kW', 'نظام مراقبة ذكي'],
      en: ['20 × 550W Solar Panels', 'Pylontech US3000C × 4 Batteries', '10kW Hybrid Inverter', 'Smart Monitoring System']
    }
  },
  {
    id: 2,
    slug: 'factory-aden-commercial',
    titleAr: 'نظام طاقة شمسية لمصنع - عدن',
    titleEn: 'Solar System for Factory - Aden',
    descAr: 'تركيب نظام طاقة شمسية تجاري كبير لمصنع صناعي مع تخزين طاقة متقدم لضمان استمرارية الإنتاج',
    descEn: 'Large commercial solar system installation for industrial factory with advanced energy storage',
    type: 'commercial',
    location: { ar: 'عدن', en: 'Aden' },
    systemSize: '50 kW',
    batteryCapacity: '48 kWh',
    panels: 90,
    date: '2024',
    clientAr: 'مصنع صناعي',
    clientEn: 'Industrial Factory',
    images: [
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=800&h=600&fit=crop',
    ],
    features: {
      ar: ['90 لوح شمسي 550W', 'بطاريات Pylontech Force H1 × 6', 'انفرتر صناعي 50kW', 'نظام إدارة الطاقة'],
      en: ['90 × 550W Solar Panels', 'Pylontech Force H1 × 6 Batteries', '50kW Industrial Inverter', 'Energy Management System']
    }
  },
  {
    id: 3,
    slug: 'office-taiz-commercial',
    titleAr: 'نظام طاقة شمسية لمكتب - تعز',
    titleEn: 'Solar System for Office - Taiz',
    descAr: 'تركيب نظام طاقة شمسية لمبنى مكاتب تجاري مع حل تخزين موثوق',
    descEn: 'Solar system installation for commercial office building with reliable storage solution',
    type: 'commercial',
    location: { ar: 'تعز', en: 'Taiz' },
    systemSize: '20 kW',
    batteryCapacity: '28.8 kWh',
    panels: 36,
    date: '2024',
    clientAr: 'مبنى تجاري',
    clientEn: 'Commercial Building',
    images: [
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    ],
    features: {
      ar: ['36 لوح شمسي 550W', 'بطاريات Pylontech US5000 × 6', 'انفرتر هجين 20kW', 'لوحة تحكم ذكية'],
      en: ['36 × 550W Solar Panels', 'Pylontech US5000 × 6 Batteries', '20kW Hybrid Inverter', 'Smart Control Panel']
    }
  },
  {
    id: 4,
    slug: 'home-hudaydah-residential',
    titleAr: 'نظام طاقة شمسية منزلي - الحديدة',
    titleEn: 'Home Solar System - Hudaydah',
    descAr: 'نظام طاقة شمسية منزلي مصمم خصيصاً لمناخ الحديدة الحار مع حماية متقدمة',
    descEn: 'Home solar system specially designed for Hudaydah\'s hot climate with advanced protection',
    type: 'residential',
    location: { ar: 'الحديدة', en: 'Hudaydah' },
    systemSize: '5 kW',
    batteryCapacity: '7.2 kWh',
    panels: 10,
    date: '2023',
    clientAr: 'منزل خاص',
    clientEn: 'Private Home',
    images: [
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&h=600&fit=crop',
    ],
    features: {
      ar: ['10 ألواح شمسية مقاومة للحرارة', 'بطاريات Pylontech US3000C × 2', 'انفرتر 5kW مع تبريد', 'حماية ضد الملوحة'],
      en: ['10 × Heat-Resistant Solar Panels', 'Pylontech US3000C × 2 Batteries', '5kW Inverter with Cooling', 'Salinity Protection']
    }
  },
  {
    id: 5,
    slug: 'hospital-sanaa-institutional',
    titleAr: 'نظام طاقة شمسية لمستشفى - صنعاء',
    titleEn: 'Solar System for Hospital - Sana\'a',
    descAr: 'نظام طاقة شمسية ضخم لمستشفى مع تخزين طاقة يضمن استمرارية الخدمة الطبية',
    descEn: 'Large solar system for hospital with energy storage ensuring medical service continuity',
    type: 'institutional',
    location: { ar: 'صنعاء', en: "Sana'a" },
    systemSize: '100 kW',
    batteryCapacity: '200 kWh',
    panels: 180,
    date: '2023',
    clientAr: 'مستشفى خاص',
    clientEn: 'Private Hospital',
    images: [
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    ],
    features: {
      ar: ['180 لوح شمسي 550W', 'بنك بطاريات Pylontech ضخم', 'انفرترات متعددة', 'نظام طوارئ احتياطي'],
      en: ['180 × 550W Solar Panels', 'Large Pylontech Battery Bank', 'Multiple Inverters', 'Emergency Backup System']
    }
  },
  {
    id: 6,
    slug: 'farm-aden-agricultural',
    titleAr: 'نظام طاقة شمسية لمزرعة - عدن',
    titleEn: 'Solar System for Farm - Aden',
    descAr: 'نظام طاقة شمسية لتشغيل مضخات الري والمعدات الزراعية بكفاءة عالية',
    descEn: 'Solar system to power irrigation pumps and agricultural equipment efficiently',
    type: 'agricultural',
    location: { ar: 'عدن', en: 'Aden' },
    systemSize: '15 kW',
    batteryCapacity: '21.6 kWh',
    panels: 27,
    date: '2023',
    clientAr: 'مزرعة خاصة',
    clientEn: 'Private Farm',
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop',
    ],
    features: {
      ar: ['27 لوح شمسي', 'بطاريات Pylontech US3000C × 6', 'انفرتر للمضخات', 'نظام ري ذكي'],
      en: ['27 × Solar Panels', 'Pylontech US3000C × 6 Batteries', 'Pump Inverter', 'Smart Irrigation System']
    }
  },
];

export const typeIcons: Record<Project['type'], typeof Home> = {
  residential: Home,
  commercial: Building2,
  institutional: Building2,
  agricultural: Factory,
};

export const typeLabels: Record<Project['type'], { ar: string; en: string }> = {
  residential: { ar: 'سكني', en: 'Residential' },
  commercial: { ar: 'تجاري', en: 'Commercial' },
  institutional: { ar: 'مؤسسي', en: 'Institutional' },
  agricultural: { ar: 'زراعي', en: 'Agricultural' },
};

export const typeColors: Record<Project['type'], string> = {
  residential: 'bg-blue-500',
  commercial: 'bg-purple-500',
  institutional: 'bg-emerald-500',
  agricultural: 'bg-amber-500',
};

// Helper functions
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getProjectsByType = (type: Project['type']): Project[] => {
  return projects.filter(p => p.type === type);
};
