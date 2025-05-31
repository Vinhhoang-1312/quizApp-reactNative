import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={50} tint={colorScheme ?? 'light'} style={StyleSheet.absoluteFill} />
          ) : (
            <View style={styles.androidTabBackground} />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          tabBarIcon: ({ color }) => <Feather name="archive" size={24} color={color} />,
        }}
      /> <Tabs.Screen
        name="result"
        options={{
          tabBarIcon: ({ color }) => <Feather name="box" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          tabBarIcon: ({ color }) => <Feather name="align-justify" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
 marginHorizontal: 16, 
    bottom: 16,
    borderRadius: 18,     
    height: 48,           
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,     
    shadowOffset: { width: 0, height: 3 },
    overflow: 'hidden',
    backgroundColor: Platform.OS === 'android' ? 'rgba(255,255,255,0.9)' : 'transparent',
    paddingHorizontal: 10,
  },
  androidTabBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});
