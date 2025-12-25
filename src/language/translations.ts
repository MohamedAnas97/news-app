export type Lang = 'en' | 'ar'

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    appName: 'News App',
    latestNews: 'Latest News', 
    author: 'Author',
    readMore: 'Read More',
    loading: 'Loading...',
    noPosts: 'No news available',
  },
  ar: {
    appName: 'تطبيق الأخبار',
    latestNews: 'أحدث الأخبار', 
    author: 'المؤلف',
    readMore: 'اقرأ المزيد',
    loading: 'جاري التحميل...',
    noPosts: 'لا توجد أخبار متاحة',
  },
}
