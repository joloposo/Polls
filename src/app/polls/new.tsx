import { Stack } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function NewPoll() {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  return (
    <>
      <Stack.Screen options={{ title: "Create poll" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Question</Text>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          style={styles.input}
          placeholder="Add title"
        />

        <Text style={styles.title}>Options</Text>
        {options.map((option, index) => (
          <View style={{ justifyContent: "center" }}>
            <TextInput
              key={index}
              value={option}
              onChangeText={(text) => {
                const newOptions = [...options];
                newOptions[index] = text;
                setOptions(newOptions);
              }}
              style={styles.input}
              placeholder={`Option ${index + 1}`}
            />
            <Feather
              name="x"
              size={18}
              color="black"
              style={{ position: "absolute", right: 10 }}
              onPress={() => {
                const newOptions = [...options];
                newOptions.splice(index, 1);
                setOptions(newOptions);
              }}
            />
          </View>
        ))}

        <Button
          title="Add option"
          onPress={() => {
            setOptions([...options, ""]);
          }}
        />
        <Button title="Create Poll" onPress={() => {
            console.warn("Create poll", question, options);
        }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
});