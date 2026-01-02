import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const currentPath = location.pathname;
    const search = location.search || '';
    const isEn = currentPath.startsWith('/en');
    const targetLang = isEn ? 'ar' : 'en';

    let targetPath: string;

    if (isEn) {
      targetPath = currentPath.replace(/^\/en/, '') || '/';
    } else {
      targetPath = currentPath === '/' ? '/en' : `/en${currentPath}`;
    }

    setLang(targetLang);
    navigate(`${targetPath}${search}`);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 font-medium"
    >
      <Globe className="h-4 w-4" />
      <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
    </Button>
  );
}
