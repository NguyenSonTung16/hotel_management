import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/hotelTheme';

// Usage: <AppInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
// Trường hợp: form đăng nhập/đặt phòng; nhập số đêm/giá bằng keyboardType.
// Dùng errorText để hiển thị lỗi; inputStyle/containerStyle/labelStyle để tùy chỉnh layout.

interface AppInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  errorText,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!errorText;

  const inputContainerStyle = [
    styles.inputContainer,
    isFocused && styles.inputContainer_focused,
    hasError && styles.inputContainer_error,
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      
      <View style={inputContainerStyle}>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={COLORS.placeholderColor}
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
          {...textInputProps}
        />
      </View>

      {hasError && (
        <Text style={[styles.errorText, errorStyle]}>{errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding,
  },
  label: {
    ...FONTS.body4,
    fontWeight: '500',
    color: COLORS.textDark,
    marginBottom: SIZES.base,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding * 0.8,
    borderWidth: 2,
    borderColor: 'transparent',
    height: SIZES.base * 6.25,
    ...SHADOWS.medium,
  },
  inputContainer_focused: {
    borderColor: COLORS.primary,
  },
  inputContainer_error: {
    borderColor: COLORS.danger,
  },
  input: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.textDark,
    height: 55,
  },
  errorText: {
    ...FONTS.body5,
    color: COLORS.danger,
    marginTop: SIZES.base / 2,
    marginLeft: SIZES.base,
  },
});

export default AppInput;
