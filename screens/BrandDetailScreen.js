import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  Linking,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { fetchBrandById } from '../services/api';

const BrandDetailScreen = ({ route }) => {
  const { brandId } = route.params;
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const loadBrandDetails = async () => {
      try {
        setError(null);
        const data = await fetchBrandById(brandId);
        setBrand(data);
      } catch (err) {
        setError('Failed to load brand details. Please try again.');
        console.error('Error fetching brand details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBrandDetails();
  }, [brandId]);

  const handleWebsitePress = async () => {
    if (!brand?.website) return;
    
    try {
      const supported = await Linking.canOpenURL(brand.website);
      
      if (supported) {
        await Linking.openURL(brand.website);
      } else {
        Alert.alert('Error', `Cannot open URL: ${brand.website}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while opening the website');
      console.error('Error opening URL:', error);
    }
  };

  const toggleFollow = () => {
    setIsFollowing(prev => !prev);
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['#ede9fe', '#f0f9ff']}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading brand details...</Text>
      </LinearGradient>
    );
  }

  if (error || !brand) {
    return (
      <LinearGradient
        colors={['#ede9fe', '#f0f9ff']}
        style={styles.errorContainer}
      >
        <Text style={styles.errorText}>{error || 'Brand not found'}</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#ede9fe', '#f0f9ff']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: brand.logo_url }} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{brand.name}</Text>
            <Text style={styles.tagline}>{brand.tagline}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={toggleFollow}
          >
            <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
            {isFollowing && (
              <Ionicons name="checkmark-circle" size={16} color="#6366f1" style={styles.followIcon} />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{brand.description}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.websiteButton}
          onPress={handleWebsitePress}
        >
          <Ionicons name="globe-outline" size={20} color="#6366f1" style={styles.websiteIcon} />
          <Text style={styles.websiteButtonText}>Visit Website</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
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
    color: '#333',
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
    color: '#ef4444',
    textAlign: 'center',
  },
  logoContainer: {
    width: '100%',
    height: 180,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 140,
    height: 140,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#666',
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  followingButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  followButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: 'white',
  },
  followingButtonText: {
    color: '#6366f1',
  },
  followIcon: {
    marginLeft: 4,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  websiteIcon: {
    marginRight: 8,
  },
  websiteButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#6366f1',
  },
});

export default BrandDetailScreen;