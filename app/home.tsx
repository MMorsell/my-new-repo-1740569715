import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { requestNotificationPermissions } from '../utils/notifications';

interface Plant {
  id: string;
  name: string;
  image?: string;
  nextWatering: string;
  daysUntilWatering: number;
  wateringInterval: number;
}

const PlantCard = ({ plant }: { plant: Plant }) => (
  <Animated.View 
    entering={FadeInUp} 
    style={styles.plantCard}
  >
    <View style={styles.plantImageContainer}>
      {plant.image ? (
        <Image 
          source={{ uri: plant.image }} 
          style={styles.plantImage} 
        />
      ) : (
        <Ionicons name="leaf" size={32} color="#7FA886" />
      )}
    </View>
    <View style={styles.plantInfo}>
      <Text style={styles.plantName}>{plant.name}</Text>
      <Text style={styles.wateringInfo}>
        Next watering: {new Date(plant.nextWatering).toLocaleDateString()}
      </Text>
      <Text style={[
        styles.daysUntil,
        { color: plant.daysUntilWatering <= 1 ? '#FF6B6B' : '#7FA886' }
      ]}>
        {plant.daysUntilWatering} days remaining
      </Text>
    </View>
  </Animated.View>
);

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: '1',
      name: 'Snake Plant',
      nextWatering: '2024-03-20',
      daysUntilWatering: 2,
      wateringInterval: 7,
    },
    {
      id: '2',
      name: 'Monstera',
      nextWatering: '2024-03-19',
      daysUntilWatering: 1,
      wateringInterval: 5,
    },
  ]);

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const handlePressAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>My Plants</Text>
        
        <View style={styles.plantsGrid}>
          {plants.map((plant) => (
            <Link 
              key={plant.id} 
              href={{
                pathname: "/plant/[id]",
                params: { id: plant.id }
              }}
              asChild
            >
              <Pressable
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              >
                <PlantCard plant={plant} />
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>

      <Link href="/add-plant" asChild>
        <Pressable 
          style={styles.addButton}
          onPress={handlePressAdd}
        >
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
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  plantImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F4F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  plantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C4A3B',
  },
  wateringInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  daysUntil: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
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