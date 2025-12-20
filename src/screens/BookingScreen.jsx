import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { calculateNights } from "../utils/calculateNights";
import AppText from "../components/common/AppText";
import AppButton from "../components/common/AppButton";
import AppInput from "../components/common/AppInput";
import { COLORS, SIZES, FONTS, SHADOWS, SPACING } from "../constants/hotelTheme";

export default function BookingScreen({ room, searchData, onConfirm, onBack }) {
  const [name, setName] = useState("");
  
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  // --- HELPER ---
  const formatDate = (date) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  // --- LOGIC XỬ LÝ NGÀY (Đã đơn giản hóa: Chỉ set state, không chặn logic tại đây) ---
  const onChangeCheckIn = (event, selectedDate) => {
    setShowCheckInPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setCheckIn(selectedDate);
      // ĐÃ BỎ: Logic tự động đẩy ngày check-out
    }
  };

  const onChangeCheckOut = (event, selectedDate) => {
    setShowCheckOutPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setCheckOut(selectedDate);
      // ĐÃ BỎ: Logic báo lỗi ngay lập tức
    }
  };

  // --- LOGIC XÁC NHẬN (Kiểm tra lỗi tại đây) ---
  const handleConfirm = () => {
    // 1. Kiểm tra logic ngày: Ngày trả phòng phải sau ngày nhận phòng
    if (checkOut <= checkIn) {
      Alert.alert(
        "Ngày không hợp lệ", 
        "Ngày trả phòng phải sau ngày nhận phòng. Vui lòng chọn lại!"
      );
      return; // <--- DỪNG LẠI, không chạy tiếp code bên dưới
    }

    // 2. Nếu ngày hợp lệ thì mới tính toán và chuyển trang
    const strCheckIn = formatDate(checkIn);
    const strCheckOut = formatDate(checkOut);
    const nights = calculateNights(strCheckIn, strCheckOut);

    onConfirm({
      room,
      searchData,
      formData: { name, checkIn: strCheckIn, checkOut: strCheckOut },
      totalPrice: nights * room.price
    });
  };

  // --- PREVIEW DATA ---
  const strCheckIn = formatDate(checkIn);
  const strCheckOut = formatDate(checkOut);
  
  // Tính số đêm để hiển thị preview
  // Nếu user chọn ngày sai (CheckOut < CheckIn), nightsPreview sẽ <= 0
  const nightsPreview = calculateNights(strCheckIn, strCheckOut);
  
  // Logic hiển thị: Nếu ngày sai, tạm thời hiện là 0 hoặc -- để user biết
  const isValidPreview = nightsPreview > 0;
  const validNights = isValidPreview ? nightsPreview : "--"; 
  const totalPricePreview = isValidPreview ? (nightsPreview * room.price) : 0;
  
  const capacityPreview = searchData?.capacity || "2";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        
        <AppText variant="title" style={styles.headerTitle}>Booking Details</AppText>

        {/* --- CARD INFO --- */}
        <View style={styles.card}>
          <Image 
            source={{ uri: room.image || "https://via.placeholder.com/100" }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardContent}>
            <AppText variant="body" style={styles.roomName} numberOfLines={2}>{room.name}</AppText>
            <AppText variant="caption" color={COLORS.textLight}>{room.size || "45m²"} • {room.bed || "King Bed"}</AppText>
            
            {/* Hiển thị logic Preview */}
            <AppText variant="caption" color={COLORS.textLight}>
              {capacityPreview} adults
            </AppText>
            
            <AppText style={styles.totalPrice}>
              ${totalPricePreview} <AppText variant="caption" color={COLORS.primary}>/night</AppText>
            </AppText>
          </View>
        </View>

        {/* --- FORM --- */}
        <View style={{ marginTop: 20 }}>
            <AppInput
              label="Thông tin khách hàng"
              placeholder="Tên khách"
              value={name}
              onChangeText={setName}
            />

            {/* CHECK-IN INPUT */}
            <AppText variant="caption" style={styles.label}>Ngày nhận phòng</AppText>
            <TouchableOpacity onPress={() => setShowCheckInPicker(true)} style={styles.dateInputTouchable}>
              <AppText color={COLORS.textDark}>{formatDate(checkIn)}</AppText>
            </TouchableOpacity>
            
            {showCheckInPicker && (
              <DateTimePicker
                value={checkIn}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeCheckIn}
                minimumDate={new Date()} // Vẫn giữ chặn ngày quá khứ (UX cơ bản)
              />
            )}

            {/* CHECK-OUT INPUT */}
            <AppText variant="caption" style={styles.label}>Ngày trả phòng</AppText>
            <TouchableOpacity onPress={() => setShowCheckOutPicker(true)} style={styles.dateInputTouchable}>
              <AppText color={COLORS.textDark}>{formatDate(checkOut)}</AppText>
            </TouchableOpacity>

            {showCheckOutPicker && (
              <DateTimePicker
                value={checkOut}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeCheckOut}
                minimumDate={new Date()} 
              />
            )}

            <View style={{ marginTop: SPACING.xl, gap: SPACING.sm }}>
                <AppButton 
                  title="Xác nhận" 
                  onPress={handleConfirm} 
                  fullWidth
                />
                <AppButton 
                  title="Quay lại" 
                  onPress={onBack} 
                  variant="secondary"
                  fullWidth
                />
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: { 
    marginBottom: SPACING.md,
    color: COLORS.textDark
  },
  card: {
    backgroundColor: COLORS.primaryLight, 
    borderRadius: SIZES.radius, 
    padding: SPACING.sm,
    flexDirection: "row", 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: COLORS.border,
    ...SHADOWS.medium
  },
  cardImage: { 
    width: 80, 
    height: 80, 
    borderRadius: SIZES.radiusSmall, 
    backgroundColor: COLORS.lightGray 
  },
  cardContent: { 
    flex: 1, 
    marginLeft: SPACING.sm, 
    justifyContent: "center" 
  },
  roomName: { 
    fontWeight: "bold", 
    color: COLORS.textDark, 
    marginBottom: SPACING.xs 
  },
  totalPrice: { 
    ...FONTS.h3,
    fontWeight: "bold", 
    color: COLORS.primary, 
    marginTop: SPACING.xs 
  },
  label: { 
    fontWeight: "600", 
    color: COLORS.textDark, 
    marginTop: SPACING.sm, 
    marginBottom: SPACING.xs 
  },
  dateInputTouchable: {
    padding: SPACING.sm, 
    backgroundColor: COLORS.primaryLight, 
    borderRadius: SIZES.radius,
    borderWidth: 2, 
    borderColor: 'transparent', 
    justifyContent: 'center',
    height: SIZES.base * 6.25,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium
  },
});