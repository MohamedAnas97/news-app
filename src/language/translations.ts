export type Lang = 'en' | 'ar'

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    appName: 'News App',
    latestNews: 'Latest News', 
    author: 'Author',
    email: 'Email',
    company: 'Company',
    website: 'Website',
    address: 'Address',
    readMore: 'Read More',
    loading: 'Loading...',
    noPosts: 'No news available',
    home: 'Home',
  },
  ar: {
    appName: 'تطبيق الأخبار',
    latestNews: 'أحدث الأخبار', 
    author: 'المؤلف',
    email: 'البريد الإلكتروني',
    company: 'الشركة',
    website: 'الموقع الإلكتروني',
    address: 'العنوان',
    readMore: 'اقرأ المزيد',
    loading: 'جاري التحميل...',
    noPosts: 'لا توجد أخبار متاحة',
    home: 'الصفحة الرئيسية',
  },
}
