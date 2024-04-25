import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, Link } from "expo-router";
import { Feather } from '@expo/vector-icons';

const polls = [
  { id: 1, title: "Volby za lepsie SK" },
  { id: 2, title: "Volby za lepsie CZ" },
  { id: 3, title: "Volby za lepsie PL" },
  { id: 4, title: "Volby za lepsie HU" },
];

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Polls", headerRight: () => 
      <Link href="polls/new">
        <Feather name="plus" size={20} color='black' />
      </Link> }} />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`polls/${item.id}`} asChild>
            <Pressable style={styles.pollContainer}>
              <Text style={styles.pollTitle}>
                {item.id}: {item.title}
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
