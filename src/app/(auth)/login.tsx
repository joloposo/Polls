import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { supabase } from "../../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize={'none'}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}          
        />
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  title: {},
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
