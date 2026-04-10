import Header from '../../components/header';
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider style={{
      flex: 1,
      backgroundColor: '#1F6F8B'
    }}>
      <StatusBar backgroundColor="#1F6F8B" />
      <Header />
      <Stack screenOptions={{
        headerShown: false
      }}>
      </Stack>
    </SafeAreaProvider>
  );
}