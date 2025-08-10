import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const BrandCard = ({ brand }) => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Fade in and slide up animation when component mounts
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      friction: 7,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  const handlePress = () => {
    navigation.navigate('BrandDetail', { 
      brandId: brand.id,
      brandName: brand.name
    });
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: opacityAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: translateYAnim }
          ]
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.card} 
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={['#ffffff', '#f8f9fa']}
          style={styles.cardGradient}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: brand.logo_url }} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{brand.name}</Text>
            <Text style={styles.tagline} numberOfLines={2}>{brand.tagline}</Text>
            <View style={styles.footer}>
              <Ionicons name="arrow-forward-circle-outline" size={16} color="#6366f1" />
              <Text style={styles.viewDetails}>View details</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    flexDirection: 'row',
    padding: 16,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  logo: {
    width: 55,
    height: 55,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 6,
  },
  tagline: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetails: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#6366f1',
    marginLeft: 4,
  }
});

export default BrandCard;