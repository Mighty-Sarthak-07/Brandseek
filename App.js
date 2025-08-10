
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  // Load Inter font family
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return (
      <LinearGradient
        colors={['#e0f2fe', '#f0fdf4']}
        style={styles.container}
      >
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>
          Loading fonts...
        </Text>
      </LinearGradient>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'System',
    fontSize: 16,
    color: '#333',
  },
  loadingTextBold: {
    fontFamily: 'Inter_700Bold',
  }
});
