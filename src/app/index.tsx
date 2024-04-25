import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function HomeScreen() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase.from("polls").select("*");

      if(error){
        Alert.alert("Error", error.message);
      }

      setPolls(data);
    };

    fetchPolls();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          headerRight: () => (
            <Link href="polls/new">
              <Feather name="plus" size={20} color="black" />
            </Link>
          ),
          headerLeft: () => (
            <Link href="profile">
              <Feather name="user" size={20} color="black" />
            </Link>
          ),
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`polls/${item.id}`} asChild>
            <Pressable style={styles.pollContainer}>
              <Text style={styles.pollTitle}>
                {item.id}: {item.question}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  pollContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pollTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
