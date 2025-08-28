import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchNewsArticles } from '../../services/api';
import NewsCard from '../../components/NewsCard';
import { NewsArticle } from '../../types/news';
import { RootStackParamList } from '../../types/navigation';

const Home = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetchNewsArticles({ count: 10, lang: 'en', topic: '' }).then(res => {
      setNews(res);
    });
  }, []);

  const handleNewsPress = (article: NewsArticle) => {
    navigation.navigate('NewsDetail', { article });
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  // Sorry for the basic design i didn't have time to implement a better UI cause i have work in 30 min 😢
  // and i didn't test it on ios cause i thought its a problem solving challenge so that i worked on my windows laptop 😢

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.header}>
        <Text style={styles.title}>Latest News</Text>
        <TouchableOpacity onPress={handleSearchPress}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator>
        {news.length > 0 ? (
          news.map(article => (
            <NewsCard
              key={article.id}
              article={article}
              onPress={handleNewsPress}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Loading news articles...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default Home;
