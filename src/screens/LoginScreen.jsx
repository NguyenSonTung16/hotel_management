import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform
} from "react-native";
import { MOCK_USERS } from "../data/mockUsers";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("admin@hotel.com"); // Set default để test giống hình
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) onLogin(user);
    else alert("Sai tài khoản hoặc mật khẩu!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* --- Header / Logo Area --- */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            {/* Giả lập icon Camera bằng Text hoặc View, 
                trong thực tế bạn nên dùng thư viện icon như react-native-vector-icons */}
            <View style={styles.cameraIconShape}>
                <View style={styles.cameraLens} />
            </View>
          </View>
          <Text style={styles.title}>Hotel Manager</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        {/* --- Form Area --- */}
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="admin@hotel.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* --- Footer / Demo Info --- */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Demo Credentials:</Text>
          <Text style={styles.demoText}>Email: admin@hotel.com</Text>
          <Text style={styles.demoText}>Password: 123456</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DBEAFE", // Xanh nhạt nền icon
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  cameraIconShape: {
    width: 32,
    height: 24,
    backgroundColor: "#2563EB", // Xanh đậm
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraLens: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2563EB'
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2563EB", // Màu xanh chủ đạo
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Đổ bóng cho Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  demoBox: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  demoText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
});