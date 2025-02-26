import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { schedulePlantWatering } from '../utils/notifications';

export default function AddPlant() {
  const [plantName, setPlantName] = useState('');
  const [wateringDate, setWateringDate] = useState(new Date());
  const [image, setImage] = useState<string | null>(null);
  const [wateringInterval, setWateringInterval] = useState('7');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleSave = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Schedule notification for the next watering
    await schedulePlantWatering(
      Date.now().toString(),
      plantName,
      wateringDate
    );

    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Pressable 
          style={styles.imageContainer} 
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <Ionicons name="camera" size={32} color="#7FA886" />
              <Text style={styles.imageText}>Add Plant Photo</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.label}>Plant Name</Text>
        <TextInput
          style={styles.input}
          value={plantName}
          onChangeText={setPlantName}
          placeholder="Enter plant name"
        />

        <Text style={styles.label}>Watering Interval (days)</Text>
        <TextInput
          style={styles.input}
          value={wateringInterval}
          onChangeText={setWateringInterval}
          keyboardType="number-pad"
          placeholder="Enter number of days"
        />

        <Text style={styles.label}>Next Watering Date</Text>
        <DateTimePicker
          value={wateringDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setWateringDate(selectedDate || wateringDate);
          }}
        />

        <Pressable 
          style={styles.saveButton} 
          onPress={handleSave}
        >
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save Plant</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F7',
    padding: 20,
  },
  form: {
    gap: 15,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F4F0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imageText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C4A3B',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#7FA886',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});