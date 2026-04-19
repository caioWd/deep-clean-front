import { initializeDatabase } from "@/src/database/initializeDatabase";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function Layout() {
  return (
    <SQLiteProvider databaseName='deepclean.db' onInit={initializeDatabase}>
      <Stack screenOptions={{
        headerShown: false
      }}>
      </Stack>
    </SQLiteProvider>
  );
}