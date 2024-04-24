import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const poll = {
  question: "React Native or Flutter?",
  options: ["React Native", "Flutter", "NativeScript", "Xamarin"],
};

export default function PollDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = useState<number | null>(null);

  const vote = () => {
    console.warn("Vote: ", selected, ', ', poll.options[selected]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Poll ${id}` }} />
      <Text style={styles.question}>{poll.question}</Text>
      <View style={{ gap: 5 }}>
        {poll.options.map((option, index) => (
          <Pressable
            onPress={() => setSelected(index)}
            key={index}
            style={styles.optionContainer}
          >
            <Feather
              name={index === selected ? "check-circle" : "circle"}
              size={18}
              color={index === selected ? "green" : "gray"}
            />
            <Text style={styles.option}>{option}</Text>
          </Pressable>
        ))}
      </View>

      <Button title="Vote" onPress={vote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
  optionContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  option: {
    fontSize: 16,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
  },
});
