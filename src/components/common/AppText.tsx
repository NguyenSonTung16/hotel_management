import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/hotelTheme';

// Usage: <AppText variant="title" color={COLORS.primary}>Hotel Name</AppText>
// Variants: title | subtitle | body | caption; align: left | center | right.
// Trường hợp: title cho header màn hình; subtitle cho section; body cho nội dung; caption cho ghi chú/phụ đề.

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption';

interface AppTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  style,
  numberOfLines,
  color,
  align = 'left',
}) => {
  const variantStyle = styles[variant];
  const colorStyle = color ? { color } : {};
  const alignStyle = { textAlign: align };

  return (
    <Text
      style={[variantStyle, colorStyle, alignStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    ...FONTS.h1,
  },
  subtitle: {
    ...FONTS.h2,
  },
  body: {
    ...FONTS.body3,
  },
  caption: {
    ...FONTS.body5,
  },
});

export default AppText;
