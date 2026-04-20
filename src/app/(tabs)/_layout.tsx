import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";
import { TabBarIconWrapper } from "../../styles/pages/HomeStyles";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Layout = () => {
  return (
    <SafeAreaProvider style={{
      flex: 1,
      backgroundColor: 'pink'
    }}>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1F6F8B',
          tabBarInactiveTintColor: '#495E7A',
          tabBarStyle: {
            marginBottom: 0,
            paddingBottom: 0,
            backgroundColor: '#F3F7F8'
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ focused }) => (
              <TabBarIconWrapper focused={focused}>
                <MaterialCommunityIcons name="home-outline" size={24} color={focused ? '#1F6F8B' : '#495E7A'} />
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
                <Feather name="user" size={20} color={focused ? '#1F6F8B' : '#495E7A'} />
              </TabBarIconWrapper>
            )
          }}
        />
      </Tabs>
    </SafeAreaProvider >
  )
}

export default Layout