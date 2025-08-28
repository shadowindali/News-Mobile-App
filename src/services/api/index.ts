import axios from 'axios';

const NEWS_API_URL = 'https://gnews.io/api/v4/';
const API_KEY = '6c215d89629a0eac3182ed2941b213b2';

export async function fetchNewsArticles({
  count = 10,
  lang = 'en',
  topic = '',
} = {}) {
  try {
    const params: Record<string, string | number> = {
      max: count,
      lang,
      token: API_KEY,
    };
    if (topic) params.topic = topic;
    const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
      params,
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
}

export async function findArticleByTitle(
  title: string,
  { lang = 'en', count = 10 } = {},
) {
  try {
    const params = {
      q: `"${title}"`,
      lang,
      max: count,
      token: API_KEY,
    };
    const response = await axios.get(`${NEWS_API_URL}/search`, { params });
    // Return the first matching article or null
    return (
      response.data.articles.find((article: any) => article.title === title) ||
      null
    );
  } catch (error) {
    console.error('Error finding article by title:', error);
    throw error;
  }
}

export async function searchArticlesByKeywords(
  keywords: string,
  { lang = 'en', count = 10, topic = '', country = '' } = {},
) {
  try {
    const params: Record<string, string | number> = {
      q: keywords,
      lang,
      max: count,
      token: API_KEY,
    };

    if (topic) params.topic = topic;
    if (country) params.country = country;

    const response = await axios.get(`${NEWS_API_URL}/search`, { params });
    return response.data.articles;
  } catch (error) {
    console.error('Error searching articles by keywords:', error);
    throw error;
  }
}
