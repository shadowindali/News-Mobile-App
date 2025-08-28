import { NewsArticle } from './news';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  NewsDetail: { article: NewsArticle };
};

export type ScreenNames = keyof RootStackParamList;
