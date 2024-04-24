import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

const polls = [1, 2, 3];

export default function HomeScreen() {
  return (
    <>
    <Stack.Screen options={{title: 'Polls'}} />
    <FlatList
      data={polls}
      contentContainerStyle={styles.container}
      renderItem={() => (
        <View style={styles.pollContainer}>
          <Text style={styles.pollTitle}>Hlasujem za moznost</Text>
        </View>
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
