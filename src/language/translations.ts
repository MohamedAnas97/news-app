export type Lang = 'en' | 'ar'

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    appName: 'News App',
    toggleTheme: 'Toggle Theme',
    toggleLanguage: 'EN / AR',
  },
  ar: {
    appName: 'تطبيق الأخبار',
    toggleTheme: 'تبديل الوضع',
    toggleLanguage: 'عربي / إنجليزي',
  },
}
