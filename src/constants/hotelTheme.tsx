// src/constants/hotelTheme.tsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// --- BẢNG MÀU CHO APP KHÁCH SẠN (COLOR PALETTE) ---
// Thiết kế dựa trên phong cách sang trọng, ấm áp và thư giãn
export const COLORS = {
  // Màu chủ đạo - Sang trọng & Đẳng cấp
  primary: '#2563EB',       // Xanh dương dùng cho nút chính, header
  primaryLight: '#EFF6FF',  // Xanh nhạt tinh tế cho nền card
  
  // Màu phụ trợ - Ấm áp & Cao cấp
  secondary: '#8B7355',     // Nâu gỗ ấm áp cho các yếu tố phụ
  accent: '#D4AF37',        // Vàng gold cho điểm nhấn VIP, premium features
  luxury: '#C0A080',        // Beige cao cấp cho các phần tử đặc biệt

  // Màu trạng thái
  success: '#059669',       // Xanh emerald cho "Đặt phòng thành công"
  warning: '#F59E0B',       // Vàng cam cho cảnh báo, thông báo
  danger: '#DC2626',        // Đỏ cho lỗi hoặc hủy đặt phòng

  // Màu văn bản (Text)
  textDark: '#1F2937',      // Xám đen cho tiêu đề chính
  text: '#374151',          // Xám đậm cho văn bản phụ
  textLight: '#9CA3AF',     // Xám nhạt cho ghi chú, placeholder
  textOnPrimary: '#FFFFFF', // Màu chữ trên nền primary/accent

  // Màu nền (Background)
  background: '#FAFAF9',    // Nền kem nhẹ nhàng, ấm áp
  white: '#FFFFFF',         // Trắng tinh khiết cho card, modal
  lightGray: '#F5F5F4',     // Xám ấm cho divider, input background
  border: '#E5E7EB',        // Màu viền tinh tế

  // Màu đặc trưng cho tính năng khách sạn
  roomAvailable: '#10B981',     // Xanh lá cho "Còn phòng"
  roomBooked: '#EF4444',        // Đỏ cho "Hết phòng"
  rating: '#FBBF24',            // Vàng cho rating/sao
  discount: '#DC2626',          // Đỏ cho giá khuyến mãi
  amenities: '#6366F1',         // Xanh indigo cho tiện ích
  
  placeholderColor: '#9fa2a7ff', // Màu placeholder
  introduction: '#1E40AF',     // Xanh đậm cho màn hình giới thiệu
  lightBlue: '#3B82F6',        // Xanh dương nhẹ
  screenBackGround: '#F9FAFB', // Màu nền screen
  placeHolderIcon: '#9CA3AF',  // Màu icon placeholder
  lightBlack: '#374151',       // Xám đen nhạt
  
  // Màu trong suốt
  transparent: 'transparent',
};

export const DARK_COLORS = {
  // Màu chủ đạo
  primary: '#3B82F6',       // Xanh dương sáng cho dark mode
  primaryLight: '#1E293B',  // Card tối hơn nền chính

  // Màu phụ trợ
  secondary: '#A78563',     // Nâu vàng nhẹ
  accent: '#FBBF24',        // Vàng gold sáng hơn
  luxury: '#D4AF37',        // Gold cho luxury features

  // Màu trạng thái
  success: '#10B981',       // Xanh emerald
  warning: '#F59E0B',       // Vàng cam
  danger: '#EF4444',        // Đỏ

  // Màu văn bản
  textDark: '#F9FAFB',      // Text chính (gần trắng)
  text: '#E5E7EB',          // Text phụ
  textLight: '#9CA3AF',     // Placeholder
  textOnPrimary: '#FFFFFF', // Chữ trên nền primary

  // Màu nền
  background: '#0F172A',    // Nền tối navy
  white: '#1E293B',         // Card background tối
  lightGray: '#334155',     // Input / divider
  border: '#475569',        // Viền

  // Màu đặc trưng
  roomAvailable: '#10B981',
  roomBooked: '#EF4444',
  rating: '#FBBF24',
  discount: '#EF4444',
  amenities: '#818CF8',
  
  placeholderColor: '#6B7280',
  introduction: '#1E40AF',
  lightBlue: '#60A5FA',
  screenBackGround: '#0F172A',
  placeHolderIcon: '#6B7280',
  lightBlack: '#E5E7EB',

  transparent: 'transparent',
};

// --- KÍCH THƯỚC (SIZING & SPACING) ---
// Sử dụng hệ thống 8-point grid system cho consistency
export const SIZES = {
  // Kích thước cơ bản
  base: 8,
  font: 14,
  radius: 12,
  radiusLarge: 16,      // Border radius lớn cho card khách sạn
  radiusSmall: 8,       // Border radius nhỏ
  padding: 20,          // Padding chính
  paddingLarge: 24,     // Padding rộng cho spacing thoáng
  paddingSmall: 12,     // Padding nhỏ

  // Kích thước phông chữ
  h1: 32,               // Tiêu đề lớn (tên khách sạn)
  h2: 24,               // Tiêu đề phụ (loại phòng)
  h3: 20,               // Tiêu đề nhỏ
  h4: 16,               // Label, section title
  body1: 16,            // Body text chính
  body2: 14,            // Body text phụ
  body3: 13,            // Caption, description
  body4: 12,            // Small text
  body5: 11,            // Tiny text, footnote

  // Kích thước đặc biệt cho hotel UI
  priceText: 28,        // Giá phòng
  ratingText: 16,       // Text rating

  // Kích thước màn hình
  width,
  height,
};

// --- PHÔNG CHỮ (TYPOGRAPHY) ---
// Typography sang trọng và dễ đọc cho app khách sạn
export const FONTS = {
  // Headings - Bold & Prominent
  h1: { 
    fontFamily: 'System', 
    fontSize: SIZES.h1, 
    lineHeight: 40, 
    fontWeight: 'bold' as const, 
    color: COLORS.textDark 
  },
  h2: { 
    fontFamily: 'System', 
    fontSize: SIZES.h2, 
    lineHeight: 32, 
    fontWeight: 'bold' as const, 
    color: COLORS.textDark 
  },
  h3: { 
    fontFamily: 'System', 
    fontSize: SIZES.h3, 
    lineHeight: 28, 
    fontWeight: '600' as const, 
    color: COLORS.textDark 
  },
  h4: { 
    fontFamily: 'System', 
    fontSize: SIZES.h4, 
    lineHeight: 24, 
    fontWeight: '600' as const, 
    color: COLORS.textDark 
  },
  
  // Body text - Readable & Clear
  body1: { 
    fontFamily: 'System', 
    fontSize: SIZES.body1, 
    lineHeight: 24, 
    fontWeight: 'normal' as const, 
    color: COLORS.text 
  },
  body2: { 
    fontFamily: 'System', 
    fontSize: SIZES.body2, 
    lineHeight: 22, 
    fontWeight: 'normal' as const, 
    color: COLORS.text 
  },
  body3: { 
    fontFamily: 'System', 
    fontSize: SIZES.body3, 
    lineHeight: 20, 
    fontWeight: 'normal' as const, 
    color: COLORS.text 
  },
  body4: { 
    fontFamily: 'System', 
    fontSize: SIZES.body4, 
    lineHeight: 18, 
    fontWeight: 'normal' as const, 
    color: COLORS.textLight 
  },
  body5: { 
    fontFamily: 'System', 
    fontSize: SIZES.body5, 
    lineHeight: 16, 
    fontWeight: 'normal' as const, 
    color: COLORS.textLight 
  },

  // Specialized text styles
  price: { 
    fontFamily: 'System', 
    fontSize: SIZES.priceText, 
    lineHeight: 36, 
    fontWeight: 'bold' as const, 
    color: COLORS.primary 
  },
  priceSmall: { 
    fontFamily: 'System', 
    fontSize: SIZES.h3, 
    lineHeight: 28, 
    fontWeight: '600' as const, 
    color: COLORS.primary 
  },
  rating: { 
    fontFamily: 'System', 
    fontSize: SIZES.ratingText, 
    lineHeight: 24, 
    fontWeight: '600' as const, 
    color: COLORS.rating 
  },
};

// --- HIỆU ỨNG BÓNG ĐỔ (SHADOWS) ---
// Bóng đổ tinh tế cho card khách sạn, ảnh phòng
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  light: {
    shadowColor: COLORS.textDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.textDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: COLORS.textDark,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  // Bóng đặc biệt cho floating button, modal
  floating: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
};

// --- SPACING HELPERS ---
// Helper constants cho spacing nhất quán
export const SPACING = {
  xs: SIZES.base / 2,      // 4px
  sm: SIZES.base,          // 8px
  md: SIZES.base * 2,      // 16px
  lg: SIZES.padding,       // 20px
  xl: SIZES.paddingLarge,  // 24px
  xxl: SIZES.base * 4,     // 32px
};

const hotelTheme = { COLORS, DARK_COLORS, SIZES, FONTS, SHADOWS, SPACING };

export default hotelTheme;
