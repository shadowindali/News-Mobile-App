export interface NewsSource {
  id: string;
  name: string;
  url: string;
  country: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  lang: string;
  source: NewsSource;
}

export interface NewsCardProps {
  article: NewsArticle;
  onPress?: (article: NewsArticle) => void;
}
