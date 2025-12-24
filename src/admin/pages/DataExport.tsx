// Data Export Page
// Main page for loading site data and exporting TypeScript files

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdmin } from '../context/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Download, Upload, Database, FileCode, AlertTriangle, 
  CheckCircle, Package, FileText, FolderKanban, Loader2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { loadAllSiteData } from '../utils/siteDataLoader';
import { downloadFile, generateBatteriesTS, generatePanelsTS, generateInvertersTS, generateProjectsTS, generateArticlesTS } from '../utils/exportGenerators';
import { validateAllData } from '../utils/schemaValidator';

export default function DataExport() {
  const { products, articles, projects, importData, exportData } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<{ errors: string[]; warnings: string[] } | null>(null);

  // Load site data into localStorage
  const handleLoadSiteData = () => {
    setLoading(true);
    try {
      const siteData = loadAllSiteData();
      const jsonData = JSON.stringify(siteData, null, 2);
      const success = importData(jsonData);
      
      if (success) {
        toast({
          title: 'تم تحميل البيانات بنجاح',
          description: `${siteData.products.length} منتج، ${siteData.articles.length} مقال، ${siteData.projects.length} مشروع`,
        });
      }
    } catch (error) {
      toast({
        title: 'خطأ في تحميل البيانات',
        description: 'حدث خطأ أثناء تحميل بيانات الموقع',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  // Export as TypeScript files
  const handleExportTS = () => {
    if (products.length === 0 && articles.length === 0 && projects.length === 0) {
      toast({
        title: 'لا توجد بيانات',
        description: 'قم بتحميل بيانات الموقع أولاً أو أضف بيانات جديدة',
        variant: 'destructive',
      });
      return;
    }

    // Download all 5 files
    downloadFile(generateBatteriesTS(products), 'batteries.ts');
    setTimeout(() => downloadFile(generatePanelsTS(products), 'panels.ts'), 100);
    setTimeout(() => downloadFile(generateInvertersTS(products), 'inverters.ts'), 200);
    setTimeout(() => downloadFile(generateProjectsTS(projects), 'projects.ts'), 300);
    setTimeout(() => downloadFile(generateArticlesTS(articles), 'articles.ts'), 400);

    toast({
      title: 'تم تصدير الملفات',
      description: 'تم تنزيل 5 ملفات TypeScript. انسخها إلى src/data/',
    });
  };

  // Export as JSON
  const handleExportJSON = () => {
    const data = exportData();
    const timestamp = new Date().toISOString().split('T')[0];
    downloadFile(data, `admin-backup-${timestamp}.json`, 'application/json');
    toast({ title: 'تم تصدير JSON', description: 'ملف النسخ الاحتياطي جاهز' });
  };

  // Import JSON
  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          try {
            const data = JSON.parse(content);
            
            // Validate before import
            const validation = validateAllData(data);
            setValidationResult({ errors: validation.errors, warnings: validation.warnings });
            
            if (!validation.valid) {
              toast({
                title: 'فشل التحقق من البيانات',
                description: `${validation.errors.length} خطأ يمنع الاستيراد`,
                variant: 'destructive',
              });
              return;
            }
            
            if (importData(content)) {
              toast({
                title: 'تم الاستيراد بنجاح',
                description: validation.warnings.length > 0 
                  ? `تم الاستيراد مع ${validation.warnings.length} تحذير`
                  : 'تم تحميل البيانات بنجاح',
              });
            }
          } catch (error) {
            toast({
              title: 'ملف غير صالح',
              description: 'تأكد من أن الملف JSON صحيح',
              variant: 'destructive',
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">تصدير واستيراد البيانات</h1>
          <p className="text-muted-foreground">إدارة بيانات الموقع وتصدير ملفات TypeScript</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{products.length}</p>
                  <p className="text-sm text-muted-foreground">منتج</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{articles.length}</p>
                  <p className="text-sm text-muted-foreground">مقال</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FolderKanban className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">مشروع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Load Site Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                تحميل بيانات الموقع
              </CardTitle>
              <CardDescription>
                استيراد البيانات الحالية من ملفات src/data/* إلى اللوحة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleLoadSiteData} disabled={loading} className="w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
                تحميل بيانات الموقع الحالية
              </Button>
            </CardContent>
          </Card>

          {/* Export TypeScript */}
          <Card className="border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5" />
                  تصدير TypeScript
                </CardTitle>
                <Badge>الأساسي</Badge>
              </div>
              <CardDescription>
                تنزيل 5 ملفات TS جاهزة للنسخ إلى src/data/
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleExportTS} className="w-full" variant="default">
                <Download className="h-4 w-4" />
                تصدير كـ TypeScript
              </Button>
              <p className="text-xs text-muted-foreground">
                الملفات: batteries.ts, panels.ts, inverters.ts, projects.ts, articles.ts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* JSON Actions */}
        <Card>
          <CardHeader>
            <CardTitle>النسخ الاحتياطي (JSON)</CardTitle>
            <CardDescription>للأرشفة فقط - لا يغير الموقع مباشرة</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button variant="outline" onClick={handleExportJSON}>
              <Download className="h-4 w-4" />
              تصدير JSON
            </Button>
            <Button variant="outline" onClick={handleImportJSON}>
              <Upload className="h-4 w-4" />
              استيراد JSON
            </Button>
          </CardContent>
        </Card>

        {/* Validation Results */}
        {validationResult && (validationResult.errors.length > 0 || validationResult.warnings.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>نتائج التحقق</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {validationResult.errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>أخطاء ({validationResult.errors.length})</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {validationResult.errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              {validationResult.warnings.length > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>تحذيرات ({validationResult.warnings.length})</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {validationResult.warnings.slice(0, 5).map((warning, i) => (
                        <li key={i}>{warning}</li>
                      ))}
                      {validationResult.warnings.length > 5 && (
                        <li>... و {validationResult.warnings.length - 5} تحذيرات أخرى</li>
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>خطوات التحديث</AlertTitle>
          <AlertDescription>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>اضغط "تحميل بيانات الموقع" لاستيراد البيانات الحالية</li>
              <li>عدّل البيانات من صفحات المنتجات/المقالات/المشاريع</li>
              <li>اضغط "تصدير TypeScript" لتنزيل الملفات</li>
              <li>انسخ الملفات يدوياً إلى src/data/</li>
              <li>شغّل npm run build ثم ارفع للاستضافة</li>
            </ol>
          </AlertDescription>
        </Alert>
      </div>
    </AdminLayout>
  );
}
