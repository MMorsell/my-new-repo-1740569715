import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const PlantCard = ({ name, nextWatering, daysUntilWatering }) => (
  <Animated.View entering={FadeInUp} style={styles.plantCard}>
    <Ionicons name="leaf" size={32} color="#7FA886" />
    <Text style={styles.plantName}>{name}</Text>
    <Text style={styles.wateringInfo}>
      Next watering: {nextWatering}
    </Text>
    <Text style={[
      styles.daysUntil,
      { color: daysUntilWatering <= 1 ? '#FF6B6B' : '#7FA886' }
    ]}>
      {daysUntilWatering} days remaining
    </Text>
  </Animated.View>
);

export default function Home() {
  const plants = [
    { id: 1, name: 'Snake Plant', nextWatering: '2024-03-20', daysUntilWatering: 2 },
    { id: 2, name: 'Monstera', nextWatering: '2024-03-19', daysUntilWatering: 1 },
    { id: 3, name: 'Peace Lily', nextWatering: '2024-03-21', daysUntilWatering: 3 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>My Plants</Text>
        
        <View style={styles.plantsGrid}>
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              name={plant.name}
              nextWatering={plant.nextWatering}
              daysUntilWatering={plant.daysUntilWatering}
            />
          ))}
        </View>
      </ScrollView>

      <Link href="/add-plant" asChild>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={32} color="#fff" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F7',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2C4A3B',
    padding: 20,
  },
  plantsGrid: {
    padding: 10,
    gap: 15,
  },
  plantCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C4A3B',
    marginTop: 10,
  },
  wateringInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  daysUntil: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#7FA886',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});