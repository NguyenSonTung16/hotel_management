import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert // Đã import nhưng chưa dùng, có thể dùng Alert.alert thay cho alert() nếu muốn native UI đẹp hơn
} from "react-native";
import { MOCK_USERS } from "../data/mockUsers";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // [UPDATED] 1. Kiểm tra dữ liệu rỗng trước tiên
    // .trim() giúp loại bỏ khoảng trắng thừa (ví dụ người dùng chỉ nhập dấu cách)
    if (!email.trim() || !password) {
      alert("Không được để trống thông tin");
      return;
    }

    // 2. Tìm user chỉ dựa trên email
    const foundUser = MOCK_USERS.find((u) => u.email === email);

    if (!foundUser) {
      // Trường hợp: Không tìm thấy email
      alert("Tài khoản không tồn tại!");
      return;
    }

    if (foundUser.password !== password) {
      // Trường hợp: Tìm thấy email nhưng sai password
      alert("Sai mật khẩu!");
      return;
    }

    // 3. Đăng nhập thành công
    onLogin(foundUser);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
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
            showSoftInputOnFocus={false}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { paddingRight: 50 }]}
              showSoftInputOnFocus={false}
            />
            
            <TouchableOpacity 
              style={styles.eyeButton} 
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeText}>
                {showPassword ? "Ẩn" : "Xem"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            testID="btnSignIn"
            accessibilityLabel="btnSignIn"
            style={styles.button}
            onPress={handleSubmit}
          >
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
  container: { flex: 1, backgroundColor: "#fff" },
  contentContainer: { flex: 1, paddingHorizontal: 24, justifyContent: "center", paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 32 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#DBEAFE", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  cameraIconShape: { width: 32, height: 24, backgroundColor: "#2563EB", borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  cameraLens: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#fff', borderWidth: 2, borderColor: '#2563EB' },
  title: { fontSize: 24, fontWeight: "800", color: "#111827", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#6B7280" },
  form: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8, marginTop: 16 },
  input: { height: 48, borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 8, paddingHorizontal: 16, fontSize: 16, color: "#111827", backgroundColor: "#fff" },
  button: { backgroundColor: "#2563EB", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", marginTop: 32, shadowColor: "#2563EB", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  demoBox: { backgroundColor: "#F9FAFB", padding: 16, borderRadius: 8, marginTop: 10 },
  demoTitle: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 4 },
  demoText: { fontSize: 14, color: "#4B5563", lineHeight: 20 },
  passwordContainer: { position: 'relative', justifyContent: 'center' },
  eyeButton: { position: 'absolute', right: 12, height: '100%', justifyContent: 'center', paddingHorizontal: 4 },
  eyeText: { color: '#6B7280', fontWeight: '600', fontSize: 14 }
});