import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AdminProduct } from '../types';
import { Star, Check, X, Thermometer, Waves, Zap, Wind } from 'lucide-react';

interface ProductPreviewProps {
  product: AdminProduct;
  open: boolean;
  onClose: () => void;
}

export default function ProductPreview({ product, open, onClose }: ProductPreviewProps) {
  const ratings = product.yemenSuitability.ratings;

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`}
      />
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">معاينة المنتج</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Card Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-32 h-32 bg-muted rounded-lg overflow-hidden shrink-0">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      لا توجد صورة
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{product.nameAr || 'بدون اسم'}</h3>
                      <p className="text-sm text-muted-foreground" dir="ltr">
                        {product.nameEn || 'No name'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {product.isAvailable ? (
                        <Badge variant="default" className="bg-green-500">متوفر</Badge>
                      ) : (
                        <Badge variant="secondary">غير متوفر</Badge>
                      )}
                      {product.isFeatured && (
                        <Badge variant="outline" className="border-amber-500 text-amber-500">مميز</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 text-sm">
                    <Badge variant="outline">{product.category}</Badge>
                    {product.brand && <Badge variant="outline">{product.brand}</Badge>}
                    {product.model && <Badge variant="outline" dir="ltr">{product.model}</Badge>}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.shortDescAr || 'لا يوجد وصف مختصر'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          {product.keyTakeaways.length > 0 && product.keyTakeaways[0].ar && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">النقاط الرئيسية</h4>
                <ul className="space-y-2">
                  {product.keyTakeaways.map((t, i) => (
                    t.ar && (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{t.ar}</span>
                      </li>
                    )
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Yemen Suitability */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">ملاءمة اليمن</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span className="text-sm">مقاومة الحرارة</span>
                  </div>
                  <div className="flex">{getRatingStars(ratings.heatResistance)}</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">المناطق الساحلية</span>
                  </div>
                  <div className="flex">{getRatingStars(ratings.coastalSuitability)}</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">انقطاع الكهرباء</span>
                  </div>
                  <div className="flex">{getRatingStars(ratings.powerOutageSupport)}</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">مقاومة الغبار</span>
                  </div>
                  <div className="flex">{getRatingStars(ratings.dustResistance)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specifications Preview */}
          {product.specifications.length > 0 && product.specifications[0].keyAr && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">المواصفات</h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.specifications.slice(0, 6).map((spec, i) => (
                    spec.keyAr && (
                      <div key={i} className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                        <span className="text-muted-foreground">{spec.keyAr}</span>
                        <span className="font-medium">{spec.value} {spec.unit}</span>
                      </div>
                    )
                  ))}
                </div>
                {product.specifications.length > 6 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    +{product.specifications.length - 6} مواصفات أخرى
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* SEO Preview */}
          <Card className="border-dashed">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 text-muted-foreground">SEO Preview</h4>
              <div className="space-y-1 bg-muted/30 p-3 rounded-lg" dir="ltr">
                <p className="text-blue-600 text-lg font-medium truncate">
                  {product.seoTitleAr || product.nameAr || 'Product Title'}
                </p>
                <p className="text-green-700 text-sm">
                  example.com/products/{product.slug || 'product-slug'}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.seoDescriptionAr || product.shortDescAr || 'Product description will appear here...'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
