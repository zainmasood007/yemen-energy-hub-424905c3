import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AdminProject } from '../types';
import { MapPin, Battery, Sun, Zap, Star, Check } from 'lucide-react';

interface ProjectPreviewProps {
  project: AdminProject;
  open: boolean;
  onClose: () => void;
}

export default function ProjectPreview({ project, open, onClose }: ProjectPreviewProps) {
  const typeLabels: Record<string, string> = {
    residential: 'سكني',
    commercial: 'تجاري',
    institutional: 'مؤسسي',
    agricultural: 'زراعي',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">معاينة المشروع</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Card Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-40 h-28 bg-muted rounded-lg overflow-hidden shrink-0">
                  {project.images[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.titleAr}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      لا توجد صورة
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{project.titleAr || 'بدون عنوان'}</h3>
                      <p className="text-sm text-muted-foreground" dir="ltr">
                        {project.titleEn || 'No title'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{typeLabels[project.type]}</Badge>
                      {project.isFeatured && (
                        <Badge className="bg-amber-500">
                          <Star className="h-3 w-3 ml-1" />
                          مميز
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location.ar || 'لم يحدد الموقع'}</span>
                    {project.date && <span className="text-xs">• {project.date}</span>}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.descAr || 'لا يوجد وصف'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Specs */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">مواصفات النظام</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-amber-500/10 rounded-full">
                    <Zap className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">قدرة النظام</p>
                    <p className="font-semibold">{project.systemSize || 'غير محدد'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-green-500/10 rounded-full">
                    <Battery className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">البطاريات</p>
                    <p className="font-semibold">{project.batteryCapacity || 'غير محدد'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-blue-500/10 rounded-full">
                    <Sun className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">الألواح</p>
                    <p className="font-semibold">{project.panels} لوح</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          {project.features.ar.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">مميزات المشروع</h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.features.ar.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm p-2 bg-muted/30 rounded">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Images Gallery Preview */}
          {project.images.length > 1 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">معرض الصور ({project.images.length})</h4>
                <div className="grid grid-cols-4 gap-2">
                  {project.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-video bg-muted rounded overflow-hidden">
                      <img
                        src={img}
                        alt={`صورة ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  ))}
                </div>
                {project.images.length > 4 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    +{project.images.length - 4} صور أخرى
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Client & Testimonial */}
          {(project.clientAr || project.testimonial?.textAr) && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">العميل</h4>
                {project.clientAr && (
                  <p className="text-sm mb-2">
                    <span className="text-muted-foreground">العميل:</span> {project.clientAr}
                  </p>
                )}
                {project.testimonial?.textAr && (
                  <blockquote className="border-r-4 border-primary pr-4 italic text-muted-foreground">
                    "{project.testimonial.textAr}"
                    {project.testimonial.authorAr && (
                      <footer className="mt-2 text-sm font-medium">— {project.testimonial.authorAr}</footer>
                    )}
                  </blockquote>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
