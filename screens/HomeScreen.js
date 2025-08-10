import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import BrandCard from '../components/BrandCard';
import { fetchBrands } from '../services/api';

const HomeScreen = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const loadBrands = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchBrands();
      setBrands(data);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();

    } catch (err) {
      setError('Failed to load brands. Please try again.');
      console.error('Error fetching brands:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadBrands();
  }, [loadBrands]);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>BrandPeek</Text>
      <Text style={styles.subtitle}>Top Brands Today</Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <LinearGradient
        colors={['#c084fc', '#6366f1', '#22d3ee']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.loadingContainer}
      >
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading brands...</Text>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={['#fca5a5', '#f87171', '#ef4444']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.errorContainer}
      >
        <StatusBar style="light" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadBrands}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#c084fc', '#6366f1', '#22d3ee']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Animated.View 
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        <FlatList
          data={brands}
          renderItem={({ item }) => <BrandCard brand={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#fff']}
              tintColor="#fff"
            />
          }
        />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#6366f1',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 16,
    paddingTop: 60,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 20,
    color: '#e0e0e0',
  },
});

export default HomeScreen;
