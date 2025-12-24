import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Heading2, List, ListOrdered, Link, Quote, Code } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dir?: 'rtl' | 'ltr';
  minHeight?: string;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = 'اكتب المحتوى هنا...',
  dir = 'rtl',
  minHeight = '400px'
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview' | 'split'>('split');

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.querySelector('.markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
    
    onChange(newText);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), title: 'عريض' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), title: 'مائل' },
    { icon: Heading2, action: () => insertMarkdown('## ', ''), title: 'عنوان' },
    { icon: List, action: () => insertMarkdown('- ', ''), title: 'قائمة' },
    { icon: ListOrdered, action: () => insertMarkdown('1. ', ''), title: 'قائمة مرقمة' },
    { icon: Quote, action: () => insertMarkdown('> ', ''), title: 'اقتباس' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), title: 'رابط' },
    { icon: Code, action: () => insertMarkdown('`', '`'), title: 'كود' },
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-2 py-1">
        <div className="flex items-center gap-1">
          {toolbarButtons.map(({ icon: Icon, action, title }, i) => (
            <Button
              key={i}
              variant="ghost"
              size="sm"
              onClick={action}
              title={title}
              className="h-8 w-8 p-0"
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="h-8">
            <TabsTrigger value="write" className="text-xs px-2 h-6">تحرير</TabsTrigger>
            <TabsTrigger value="split" className="text-xs px-2 h-6">مقسم</TabsTrigger>
            <TabsTrigger value="preview" className="text-xs px-2 h-6">معاينة</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className={cn(
        "grid",
        activeTab === 'split' ? 'grid-cols-2 divide-x divide-x-reverse' : 'grid-cols-1'
      )}>
        {/* Editor */}
        {(activeTab === 'write' || activeTab === 'split') && (
          <div className="relative">
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              dir={dir}
              className={cn(
                "markdown-textarea rounded-none border-0 resize-none font-mono text-sm focus-visible:ring-0",
                activeTab === 'split' && 'rounded-none'
              )}
              style={{ minHeight }}
            />
          </div>
        )}

        {/* Preview */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div 
            className="p-4 overflow-auto bg-background"
            style={{ minHeight }}
            dir={dir}
          >
            {value ? (
              <MarkdownRenderer content={value} dir={dir} />
            ) : (
              <p className="text-muted-foreground text-sm">لا يوجد محتوى للمعاينة</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
