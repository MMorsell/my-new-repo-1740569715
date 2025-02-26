import * as Notifications from 'expo-notifications';

export async function schedulePlantWatering(plantId: string, name: string, date: Date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to water your plant! 🌿",
      body: `${name} needs watering today`,
      data: { plantId },
    },
    trigger: {
      date,
      repeats: false,
    },
  });
}

export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}