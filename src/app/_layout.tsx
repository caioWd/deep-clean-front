import { initializeDatabase } from "@/src/database/initializeDatabase";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar, View } from "react-native";
import Header from "../components/header";
import * as SystemUI from "expo-system-ui"
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#F3F7F8")
  }, [])
  
  return (
    <SQLiteProvider databaseName='deepclean.db' onInit={initializeDatabase}>
      <View style={{ flex: 1, backgroundColor: "#F3F7F8" }}>
        <StatusBar backgroundColor='#F3F7F8' />
        <Header />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#F3F7F8" },
          }}
        />
      </View>
    </SQLiteProvider>
  );
}