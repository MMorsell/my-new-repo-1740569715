import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function AddPlant() {
  const [plantName, setPlantName] = useState('');
  const [wateringDate, setWateringDate] = useState(new Date());

  const handleSave = () => {
    // Here we would normally save to a database
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Plant Name</Text>
        <TextInput
          style={styles.input}
          value={plantName}
          onChangeText={setPlantName}
          placeholder="Enter plant name"
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

        <Pressable style={styles.saveButton} onPress={handleSave}>
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