import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/hotelTheme';

// Usage: <AppButton title="Book now" onPress={handlePress} style={{ backgroundColor: COLORS.primary }} />
// textStyle prop để đổi màu/chữ; fullWidth để chiếm toàn bộ chiều ngang
// Trường hợp dùng nhanh: primary action (đặt phòng), secondary action với style xám, outline bằng cách set border/background qua style prop
// Dùng loading=true khi đang submit; disabled để khóa tương tác; kết hợp style để thay đổi bo góc/padding

interface AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.button,
    isDisabled && styles.button_disabled,
    fullWidth && styles.button_fullWidth,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    isDisabled && styles.text_disabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={COLORS.white}
          size="small"
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SIZES.base * 1.75,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: SIZES.base * 6.25,
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  button_disabled: {
    backgroundColor: COLORS.border,
  },
  button_fullWidth: {
    width: '100%',
  },
  text: {
    ...FONTS.body3,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },
  text_disabled: {
    color: COLORS.textLight,
  },
});

export default AppButton;
