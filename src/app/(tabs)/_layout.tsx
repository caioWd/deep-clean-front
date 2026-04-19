import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";
import Header from '../../components/header';
import { TabBarIconWrapper } from "../../styles/pages/HomeStyles";
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from '@/src/database/initializeDatabase';

const Layout = () => {
  return (
    <SQLiteProvider databaseName='deepclean.db' onInit={initializeDatabase}>
      <SafeAreaProvider style={{
        flex: 1,
        backgroundColor: '#1F6F8B'
      }}>
        <StatusBar backgroundColor='#1F6F8B' />
        <Header />

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1F6F8B',
            tabBarStyle: {
              marginBottom: 0,
              paddingBottom: 0,

            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Início',
              tabBarIcon: ({ focused }) => (
                <TabBarIconWrapper focused={focused}>
                  <MaterialCommunityIcons name="home-outline" size={24} color={focused ? '#1F6F8B' : '#323232'} />
                </TabBarIconWrapper>
              )
            }}
          />
          <Tabs.Screen
            name="clients"
            options={{
              title: 'Clientes',
              tabBarIcon: ({ focused }) => (
                <TabBarIconWrapper focused={focused}>
                  <Feather name="user" size={20} color={focused ? '#1F6F8B' : '#323232'} />
                </TabBarIconWrapper>
              )
            }}
          />
        </Tabs>
      </SafeAreaProvider >
    </SQLiteProvider>
  )
}

export default Layout