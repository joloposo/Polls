import { useLocalSearchParams, Stack } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Poll, Vote } from "../../types/db";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";

export default function PollDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = useState<string | null>(null);
  const [poll, setPoll] = useState<Poll>(null);
  const [userVote, setUserVote] = useState<Vote>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", Number.parseInt(id))
        .single();

      if (error) {
        Alert.alert("Error", error.message);
      }
      setPoll(data);
    };

    const fetchUserVotes = async () => {

      if (!user) {return;}

      let { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("poll_id", Number.parseInt(id))
        .eq("user_id", user.id)
        .limit(1)
        .single();

      setUserVote(data);
      if (data) {
        setSelected(data.option);
      }
    };

    fetchPolls();
    fetchUserVotes();
  }, []);

  const vote = async () => {
    const newVote = {
      option: selected,
      poll_id: poll.id,
      user_id: user?.id,
    };
    if (userVote) {
      newVote.id = userVote.id;
    }

    const { data, error } = await supabase
      .from('votes')
      .upsert([newVote])
      .select()
      .single();

    if (error) {
      Alert.alert("Failed to vote");
    } else {
      setUserVote(data);
      Alert.alert("Thank you for voting!");
    }
  };

  if (!poll) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Poll ${id}` }} />
      <Text style={styles.question}>{poll.question}</Text>
      <View style={{ gap: 5 }}>
        {poll.options.map((option, index) => (
          <Pressable
            onPress={() => setSelected(option)}
            key={index}
            style={styles.optionContainer}
          >
            <Feather
              name={option === selected ? "check-circle" : "circle"}
              size={18}
              color={option === selected ? "green" : "gray"}
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
