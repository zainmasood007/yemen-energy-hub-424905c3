// Site Data Loader
// Loads existing site data and converts to Admin types
// Used for "Load Site Data" functionality

import { allProducts, Product } from '@/data/products';
import { projects, Project } from '@/data/projects';
import { pillarPages, supportingArticles, PillarPage, SupportingArticle } from '@/data/articles';
import { AdminProduct, AdminArticle, AdminProject } from '../types';

// Convert Product to AdminProduct
function productToAdmin(product: Product): AdminProduct {
  return {
    id: product.id,
    slug: product.slug,
    category: product.category,
    brand: product.brand,
    model: product.model,
    nameAr: product.nameAr,
    nameEn: product.nameEn,
    shortDescAr: product.shortDescAr,
    shortDescEn: product.shortDescEn,
    fullDescAr: product.fullDescAr,
    fullDescEn: product.fullDescEn,
    keyTakeaways: product.keyTakeaways || [],
    specifications: product.specifications || [],
    yemenSuitability: product.yemenSuitability || {
      ratings: { heatResistance: 3, coastalSuitability: 3, powerOutageSupport: 3, dustResistance: 3 },
      explanationAr: '',
      explanationEn: '',
      bestRegionsAr: [],
      bestRegionsEn: [],
      climateNotesAr: '',
      climateNotesEn: '',
    },
    useCases: product.useCases || [],
    recommendedForAr: product.recommendedForAr || [],
    recommendedForEn: product.recommendedForEn || [],
    notRecommendedForAr: product.notRecommendedForAr || [],
    notRecommendedForEn: product.notRecommendedForEn || [],
    faqs: product.faqs || [],
    relatedProductSlugs: product.relatedProductSlugs || [],
    seoTitleAr: product.seoTitleAr,
    seoTitleEn: product.seoTitleEn,
    seoDescriptionAr: product.seoDescriptionAr,
    seoDescriptionEn: product.seoDescriptionEn,
    seoKeywordsAr: product.seoKeywordsAr || [],
    seoKeywordsEn: product.seoKeywordsEn || [],
    image: product.image,
    gallery: product.gallery || [],
    isAvailable: product.isAvailable,
    isFeatured: product.isFeatured,
  };
}

// Convert Project to AdminProject
function projectToAdmin(project: Project): AdminProject {
  return {
    id: project.id.toString(),
    slug: project.slug || `project-${project.id}`,
    titleAr: project.titleAr,
    titleEn: project.titleEn,
    descAr: project.descAr,
    descEn: project.descEn,
    type: project.type,
    location: {
      ar: project.location.ar,
      en: project.location.en,
    },
    systemSize: project.systemSize,
    batteryCapacity: project.batteryCapacity,
    panels: project.panels,
    date: project.date,
    clientAr: project.clientAr,
    clientEn: project.clientEn,
    images: project.images || [],
    features: project.features || { ar: [], en: [] },
    productsUsed: [],
    isFeatured: false,
  };
}

// Convert PillarPage/SupportingArticle to AdminArticle
function pillarToAdmin(pillar: PillarPage): AdminArticle {
  return {
    id: `pillar-${pillar.slug}`,
    slug: pillar.slug,
    type: 'pillar',
    icon: pillar.icon.displayName || 'FileText',
    titleAr: pillar.titleAr,
    titleEn: pillar.titleEn,
    descAr: pillar.descAr,
    descEn: pillar.descEn,
    contentAr: '',
    contentEn: '',
    contentMarkdownAr: pillar.contentMarkdownAr || '',
    contentMarkdownEn: pillar.contentMarkdownEn || '',
    keyTakeaways: [],
    faqs: [],
    relatedProductSlugs: [],
    relatedArticleSlugs: [],
    seoTitleAr: pillar.titleAr,
    seoTitleEn: pillar.titleEn,
    seoDescriptionAr: pillar.descAr,
    seoDescriptionEn: pillar.descEn,
    status: pillar.status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function supportingToAdmin(article: SupportingArticle): AdminArticle {
  return {
    id: `supporting-${article.slug}`,
    slug: article.slug,
    type: 'supporting',
    icon: article.icon.displayName || 'FileText',
    titleAr: article.titleAr,
    titleEn: article.titleEn,
    descAr: '',
    descEn: '',
    contentAr: '',
    contentEn: '',
    contentMarkdownAr: article.contentMarkdownAr || '',
    contentMarkdownEn: article.contentMarkdownEn || '',
    keyTakeaways: [],
    faqs: [],
    relatedProductSlugs: [],
    relatedArticleSlugs: [],
    pillarSlug: article.pillarSlug,
    seoTitleAr: article.titleAr,
    seoTitleEn: article.titleEn,
    seoDescriptionAr: '',
    seoDescriptionEn: '',
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Load all site products
export function loadSiteProducts(): AdminProduct[] {
  return allProducts.map(productToAdmin);
}

// Load all site projects
export function loadSiteProjects(): AdminProject[] {
  return projects.map(projectToAdmin);
}

// Load all site articles
export function loadSiteArticles(): AdminArticle[] {
  const pillarArticles = pillarPages.map(pillarToAdmin);
  const supporting = supportingArticles.map(supportingToAdmin);
  return [...pillarArticles, ...supporting];
}

// Load all site data
export function loadAllSiteData() {
  return {
    products: loadSiteProducts(),
    articles: loadSiteArticles(),
    projects: loadSiteProjects(),
  };
}
