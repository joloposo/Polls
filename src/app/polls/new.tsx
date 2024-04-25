import { Redirect, Stack, router } from "expo-router";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";

export default function NewPoll() {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const { user } = useAuth();
  const [error, setError] = useState<string>("");

  const createPoll = async () => {
    setError("");

    if (!question) {
      setError("Question is required");
      return;
    }

    const validOptions = options.filter((option) => !!option.trim());
    if (validOptions.length < 2) {
      setError("At least two options are required");
      return;
    }

    const { data, error } = await supabase
      .from("polls")
      .insert([{ question, options: validOptions }])
      .select();

    if (error) {
      Alert.alert("Failed to create poll");
      console.error(error);
      return;
    }

    router.back();

    console.warn("Create poll", question, validOptions);
  };

  if (!user) {
    return <Redirect href="/login" />;
  }

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
          autoCorrect={false}
        />

        <Text style={styles.title}>Options</Text>
        {options.map((option, index) => (
          <View style={{ justifyContent: "center" }} key={index}>
            <TextInput
              value={option}
              onChangeText={(text) => {
                const newOptions = [...options];
                newOptions[index] = text;
                setOptions(newOptions);
              }}
              style={styles.input}
              placeholder={`Option ${index + 1}`}
              autoCorrect={false}
            />
            <Feather
              name="x"
              size={18}
              color="gray"
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
        <Button title="Create Poll" onPress={createPoll} />
        <Text style={{ color: "crimson" }}>{error}</Text>
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
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  input: {
    fontSize: 14,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
});
