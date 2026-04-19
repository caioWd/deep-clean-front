import { initializeDatabase } from '@/src/database/initializeDatabase'
import Header from '../../components/header'
import { Stack } from "expo-router"
import { SQLiteProvider } from 'expo-sqlite'
import { StatusBar } from "react-native"
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function Layout() {
  return (
      <SQLiteProvider databaseName='deepclean.db' onInit={initializeDatabase}>
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
      </SQLiteProvider>
  )
}