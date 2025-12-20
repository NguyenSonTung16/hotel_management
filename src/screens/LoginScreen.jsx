import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import { MOCK_USERS } from "../data/mockUsers";
import AppText from "../components/common/AppText";
import AppButton from "../components/common/AppButton";
import AppInput from "../components/common/AppInput";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants/hotelTheme";

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
          <AppText variant="title" style={styles.title}>Hotel Manager</AppText>
          <AppText variant="body" color={COLORS.textLight}>Sign in to your account</AppText>
        </View>

        {/* --- Form Area --- */}
        <View style={styles.form}>
          <AppInput
            label="Email"
            placeholder="admin@hotel.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <AppInput
            label="Password"
            placeholder="••••••"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={styles.togglePassword} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <AppText variant="caption" color={COLORS.primary}>
              {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            </AppText>
          </TouchableOpacity>

          <AppButton
            title="Sign In"
            onPress={handleSubmit}
            fullWidth
            style={styles.loginButton}
          />
        </View>

        {/* --- Footer / Demo Info --- */}
        <View style={styles.demoBox}>
          <AppText variant="caption" style={styles.demoTitle}>Demo Credentials:</AppText>
          <AppText variant="caption" color={COLORS.text}>Email: admin@hotel.com</AppText>
          <AppText variant="caption" color={COLORS.text}>Password: 123456</AppText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  contentContainer: { 
    flex: 1, 
    paddingHorizontal: SIZES.paddingLarge, 
    justifyContent: "center", 
    paddingBottom: 40 
  },
  header: { 
    alignItems: "center", 
    marginBottom: SIZES.base * 4 
  },
  iconCircle: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    backgroundColor: COLORS.primaryLight, 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: SIZES.base * 2,
    ...SHADOWS.medium
  },
  cameraIconShape: { 
    width: 32, 
    height: 24, 
    backgroundColor: COLORS.primary, 
    borderRadius: SIZES.radiusSmall, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  cameraLens: { 
    width: 12, 
    height: 12, 
    borderRadius: 6, 
    backgroundColor: COLORS.white, 
    borderWidth: 2, 
    borderColor: COLORS.primary 
  },
  title: { 
    marginBottom: SIZES.base,
    color: COLORS.textDark
  },
  form: { 
    marginBottom: SIZES.paddingLarge 
  },
  togglePassword: {
    alignSelf: 'flex-end',
    marginTop: -SIZES.base,
    marginBottom: SIZES.base * 2
  },
  loginButton: {
    marginTop: SIZES.base * 2
  },
  demoBox: { 
    backgroundColor: COLORS.lightGray, 
    padding: SIZES.base * 2, 
    borderRadius: SIZES.radius, 
    marginTop: SIZES.base,
    ...SHADOWS.light
  },
  demoTitle: { 
    fontWeight: "600", 
    color: COLORS.textDark, 
    marginBottom: SIZES.base / 2 
  }
});