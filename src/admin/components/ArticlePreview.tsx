import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AdminArticle } from '../types';
import { Check, FileText, BookOpen } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface ArticlePreviewProps {
  article: AdminArticle;
  open: boolean;
  onClose: () => void;
}

export default function ArticlePreview({ article, open, onClose }: ArticlePreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">معاينة المقال</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Article Header Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {article.type === 'pillar' ? (
                    <BookOpen className="h-6 w-6 text-primary" />
                  ) : (
                    <FileText className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{article.titleAr || 'بدون عنوان'}</h3>
                      <p className="text-sm text-muted-foreground" dir="ltr">
                        {article.titleEn || 'No title'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={article.type === 'pillar' ? 'default' : 'secondary'}>
                        {article.type === 'pillar' ? 'دليل شامل' : 'مقال داعم'}
                      </Badge>
                      <Badge variant={article.status === 'published' ? 'default' : 'outline'}>
                        {article.status === 'published' ? 'منشور' : 'مسودة'}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {article.descAr || 'لا يوجد وصف'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          {article.keyTakeaways.length > 0 && article.keyTakeaways[0].ar && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">النقاط الرئيسية</h4>
                <ul className="space-y-2">
                  {article.keyTakeaways.map((t, i) => (
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

          {/* Content Preview */}
          {article.contentAr && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">المحتوى</h4>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <MarkdownRenderer content={article.contentAr} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* FAQs Preview */}
          {article.faqs.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">الأسئلة الشائعة ({article.faqs.length})</h4>
                <div className="space-y-3">
                  {article.faqs.slice(0, 3).map((faq, i) => (
                    <div key={i} className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">{faq.questionAr}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {faq.answerAr}
                      </p>
                    </div>
                  ))}
                  {article.faqs.length > 3 && (
                    <p className="text-xs text-muted-foreground">
                      +{article.faqs.length - 3} أسئلة أخرى
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* SEO Preview */}
          <Card className="border-dashed">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 text-muted-foreground">SEO Preview</h4>
              <div className="space-y-1 bg-muted/30 p-3 rounded-lg" dir="ltr">
                <p className="text-blue-600 text-lg font-medium truncate">
                  {article.seoTitleAr || article.titleAr || 'Article Title'}
                </p>
                <p className="text-green-700 text-sm">
                  example.com/knowledge/{article.slug || 'article-slug'}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.seoDescriptionAr || article.descAr || 'Article description will appear here...'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
