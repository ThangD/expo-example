import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Expo Example!</Text>
      <Text style={styles.subtitle}>This is an updated version - v1.1</Text>
      <Text style={styles.description}>Testing OTA updates with preview channel</Text>
      <Text style={styles.timestamp}>Updated: {new Date().toLocaleString()}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#888',
  },
  timestamp: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
  },
});
