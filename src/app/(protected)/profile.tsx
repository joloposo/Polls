import { Stack } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";
import { View, Text, StyleSheet, Button } from "react-native";
import { supabase } from "../../lib/supabase";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen options={{ title: "Profile" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Email: {user?.email}</Text>
        <Text style={styles.text}>ID: {user?.id}</Text>
        <Text style={styles.text}>Role: {user?.role}</Text>
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 16, fontWeight: "500" },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
});
