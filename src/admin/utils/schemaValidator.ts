// Schema Validator
// Strict validation for admin data imports
// Prevents duplicate slugs and ensures data integrity

import { AdminProduct, AdminArticle, AdminProject } from '../types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];    // Critical errors (prevent import)
  warnings: string[];  // Warnings (don't prevent import)
}

// Check for duplicate slugs in an array
export function checkDuplicateSlugs(items: { slug: string }[]): { hasDuplicates: boolean; duplicates: string[] } {
  const slugs = items.map(item => item.slug);
  const seen = new Set<string>();
  const duplicates: string[] = [];
  
  for (const slug of slugs) {
    if (seen.has(slug)) {
      if (!duplicates.includes(slug)) {
        duplicates.push(slug);
      }
    } else {
      seen.add(slug);
    }
  }
  
  return { hasDuplicates: duplicates.length > 0, duplicates };
}

// Validate products
export function validateProducts(products: any[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!Array.isArray(products)) {
    return { valid: false, errors: ['البيانات ليست مصفوفة صالحة'], warnings: [] };
  }
  
  // Check for duplicate slugs
  const { hasDuplicates, duplicates } = checkDuplicateSlugs(products);
  if (hasDuplicates) {
    errors.push(`تكرار في slugs المنتجات: ${duplicates.join(', ')}`);
  }
  
  products.forEach((product, index) => {
    const prefix = `المنتج ${index + 1}`;
    
    // Required fields
    if (!product.id) errors.push(`${prefix}: حقل id مطلوب`);
    if (!product.slug) errors.push(`${prefix}: حقل slug مطلوب`);
    if (!product.category) errors.push(`${prefix}: حقل category مطلوب`);
    if (!product.nameAr) errors.push(`${prefix}: حقل nameAr مطلوب`);
    if (!product.nameEn) errors.push(`${prefix}: حقل nameEn مطلوب`);
    if (!product.brand) errors.push(`${prefix}: حقل brand مطلوب`);
    
    // Type checks
    if (product.category && !['pylontech', 'panels', 'inverters', 'controllers'].includes(product.category)) {
      errors.push(`${prefix}: قيمة category غير صالحة: ${product.category}`);
    }
    
    // SEO warnings
    if (product.seoTitleAr && product.seoTitleAr.length > 60) {
      warnings.push(`${prefix}: عنوان SEO العربي طويل جداً (${product.seoTitleAr.length} حرف)`);
    }
    if (product.seoDescriptionAr && product.seoDescriptionAr.length > 160) {
      warnings.push(`${prefix}: وصف SEO العربي طويل جداً (${product.seoDescriptionAr.length} حرف)`);
    }
    
    // Image warnings
    if (!product.image || product.image === '/placeholder.svg') {
      warnings.push(`${prefix}: صورة المنتج مفقودة أو placeholder`);
    }
  });
  
  return { valid: errors.length === 0, errors, warnings };
}

// Validate articles
export function validateArticles(articles: any[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!Array.isArray(articles)) {
    return { valid: false, errors: ['البيانات ليست مصفوفة صالحة'], warnings: [] };
  }
  
  // Check for duplicate slugs
  const { hasDuplicates, duplicates } = checkDuplicateSlugs(articles);
  if (hasDuplicates) {
    errors.push(`تكرار في slugs المقالات: ${duplicates.join(', ')}`);
  }
  
  articles.forEach((article, index) => {
    const prefix = `المقال ${index + 1}`;
    
    // Required fields
    if (!article.id) errors.push(`${prefix}: حقل id مطلوب`);
    if (!article.slug) errors.push(`${prefix}: حقل slug مطلوب`);
    if (!article.titleAr) errors.push(`${prefix}: حقل titleAr مطلوب`);
    if (!article.titleEn) errors.push(`${prefix}: حقل titleEn مطلوب`);
    if (!article.type) errors.push(`${prefix}: حقل type مطلوب`);
    
    // Type checks
    if (article.type && !['pillar', 'supporting'].includes(article.type)) {
      errors.push(`${prefix}: قيمة type غير صالحة: ${article.type}`);
    }
    
    // Content warnings
    if (!article.contentAr && !article.contentMarkdownAr) {
      warnings.push(`${prefix}: المحتوى العربي مفقود`);
    }
    
    // SEO warnings
    if (article.seoTitleAr && article.seoTitleAr.length > 60) {
      warnings.push(`${prefix}: عنوان SEO العربي طويل جداً`);
    }
  });
  
  return { valid: errors.length === 0, errors, warnings };
}

// Validate projects
export function validateProjects(projects: any[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!Array.isArray(projects)) {
    return { valid: false, errors: ['البيانات ليست مصفوفة صالحة'], warnings: [] };
  }
  
  // Check for duplicate slugs
  const { hasDuplicates, duplicates } = checkDuplicateSlugs(projects);
  if (hasDuplicates) {
    errors.push(`تكرار في slugs المشاريع: ${duplicates.join(', ')}`);
  }
  
  projects.forEach((project, index) => {
    const prefix = `المشروع ${index + 1}`;
    
    // Required fields
    if (!project.id) errors.push(`${prefix}: حقل id مطلوب`);
    if (!project.slug) errors.push(`${prefix}: حقل slug مطلوب`);
    if (!project.titleAr) errors.push(`${prefix}: حقل titleAr مطلوب`);
    if (!project.titleEn) errors.push(`${prefix}: حقل titleEn مطلوب`);
    if (!project.type) errors.push(`${prefix}: حقل type مطلوب`);
    
    // Type checks
    if (project.type && !['residential', 'commercial', 'institutional', 'agricultural'].includes(project.type)) {
      errors.push(`${prefix}: قيمة type غير صالحة: ${project.type}`);
    }
    
    // Image warnings
    if (!project.images || project.images.length === 0) {
      warnings.push(`${prefix}: صور المشروع مفقودة`);
    }
  });
  
  return { valid: errors.length === 0, errors, warnings };
}

// Validate all data
export function validateAllData(data: { products?: any[]; articles?: any[]; projects?: any[] }): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  
  if (data.products) {
    const productValidation = validateProducts(data.products);
    allErrors.push(...productValidation.errors);
    allWarnings.push(...productValidation.warnings);
  }
  
  if (data.articles) {
    const articleValidation = validateArticles(data.articles);
    allErrors.push(...articleValidation.errors);
    allWarnings.push(...articleValidation.warnings);
  }
  
  if (data.projects) {
    const projectValidation = validateProjects(data.projects);
    allErrors.push(...projectValidation.errors);
    allWarnings.push(...projectValidation.warnings);
  }
  
  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}
