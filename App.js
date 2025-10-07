import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

export default function App() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      if (!Updates.isEnabled) {
        console.log('Updates are disabled in development mode');
        return;
      }

      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setIsUpdateAvailable(true);
        setUpdateStatus('Update available, downloading...');
        downloadUpdate();
      } else {
        setUpdateStatus('App is up to date');
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
      setUpdateStatus('Error checking for updates');
    }
  };

  const downloadUpdate = async () => {
    try {
      setIsUpdating(true);
      setUpdateStatus('Downloading update...');

      const update = await Updates.fetchUpdateAsync({
        onProgress: (progress) => {
          const percentage = Math.round(progress.receivedBytes / progress.totalBytes * 100);
          setUpdateProgress(percentage);
          setUpdateStatus(`Downloading update... ${percentage}%`);
        }
      });

      if (update.isNew) {
        setUpdateStatus('Update downloaded! Restarting app...');
        setTimeout(() => {
          Updates.reloadAsync();
        }, 1000);
      }
    } catch (error) {
      console.error('Error downloading update:', error);
      setUpdateStatus('Error downloading update');
      setIsUpdating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Expo Example!</Text>
      <Text style={styles.subtitle}>This is an updated version - v1.2</Text>
      <Text style={styles.description}>Testing OTA updates with preview channel</Text>
      <Text style={styles.timestamp}>Updated: {new Date().toLocaleString()}</Text>
      <Text style={styles.timestamp}>Author: Thang Dinh</Text>

      {/* Update Progress Section */}
      {(isUpdating || updateStatus) && (
        <View style={styles.updateContainer}>
          <Text style={styles.updateStatus}>{updateStatus}</Text>
          {isUpdating && (
            <View style={styles.progressContainer}>
              <ActivityIndicator size="small" color="#007AFF" />
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${updateProgress}%` }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{updateProgress}%</Text>
            </View>
          )}
        </View>
      )}

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
    marginBottom: 5,
  },
  updateContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  updateStatus: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    minWidth: 40,
  },
});
