import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";
import { TabBarIconWrapper } from "../styles/pages/HomeStyles";
import Header from '../components/header';

const Layout = () => {
  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1F6F8B'
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
          name="pages/clients/index"
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
    </>
  )
}

export default Layout