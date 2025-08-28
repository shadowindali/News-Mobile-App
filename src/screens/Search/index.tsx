/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { searchArticlesByKeywords } from '../../services/api';
import NewsCard from '../../components/NewsCard';
import { NewsArticle } from '../../types/news';
import { RootStackParamList } from '../../types/navigation';

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

interface Props {
  navigation: SearchScreenNavigationProp;
}

const Search: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery.trim();

    if (!searchTerm) {
      Alert.alert('Search Error', 'Please enter a search term');
      return;
    }

    setLoading(true);

    try {
      const results = await searchArticlesByKeywords(searchTerm, {
        lang: 'en',
        count: 20,
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert(
        'Search Error',
        'Failed to search articles. Please try again.',
      );
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleArticlePress = (article: NewsArticle) => {
    navigation.navigate('NewsDetail', { article });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search News</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={{ flex: 1, position: 'relative' }}>
          {searchQuery.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch()}
            returnKeyType="search"
            autoCapitalize="none"
            placeholderTextColor={'#00000030'}
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.searchButton,
            searchQuery.trim()
              ? styles.searchButtonEnabled
              : styles.searchButtonDisabled,
          ]}
          onPress={() => handleSearch()}
          disabled={!searchQuery.trim()}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Searching articles...</Text>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            {searchResults?.length > 0 ? (
              searchResults.map(article => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onPress={handleArticlePress}
                />
              ))
            ) : (
              <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Text>No articles found.</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButtonText: {
    fontSize: 28,
    color: '#007AFF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  searchButton: {
    marginLeft: 12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22,
  },
  searchButtonEnabled: {
    opacity: 1,
  },
  searchButtonDisabled: {
    opacity: 0.5,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1000,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  resultsContainer: {
    paddingTop: 16,
  },
});

export default Search;
