import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;
type NewsDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewsDetail'
>;

interface Props {
  route: NewsDetailScreenRouteProp;
  navigation: NewsDetailScreenNavigationProp;
}

const NewsDetail: React.FC<Props> = ({ route, navigation }) => {
  const { article } = route.params;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: article.image }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.sourceBadge}>
            <Text style={styles.sourceText}>{article.source.name}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{article.title}</Text>

          <View style={styles.metaContainer}>
            <Text style={styles.publishedDate}>
              {formatDate(article.publishedAt)}
            </Text>
          </View>

          <Text style={styles.description}>{article.description}</Text>

          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Article Content</Text>
            <Text style={styles.content}>{article.content}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButtonText: {
    fontSize: 28,
    color: '#007AFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sourceBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sourceText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 32,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  publishedDate: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  contentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: '#444444',
    lineHeight: 26,
    textAlign: 'justify',
  },
});

export default NewsDetail;
