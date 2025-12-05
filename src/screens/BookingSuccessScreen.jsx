import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView 
} from "react-native";
// Import hàm tính ngày (đảm bảo đường dẫn đúng với cấu trúc dự án của bạn)
import { calculateNights } from "../utils/calculateNights"; 

export default function BookingSuccessScreen({ booking, onReset }) {
  // Lấy dữ liệu từ prop booking
  const { room, formData } = booking;
  
  // --- TÍNH TOÁN LẠI TỔNG TIỀN ---
  // 1. Tính số đêm lưu trú dựa trên ngày check-in/check-out
  const nights = calculateNights(formData.checkIn, formData.checkOut);
  
  // 2. Tính tổng tiền = Giá phòng * Số đêm
  // (Đảm bảo ít nhất là 1 đêm để tránh hiển thị $0 nếu lỗi)
  const finalTotalPrice = (nights > 0 ? nights : 1) * room.price;

  // Tạo mã booking giả lập
  const mockBookingID = "BK" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- HEADER ICON & TEXT --- */}
        <View style={styles.headerContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.title}>Booking Confirmed!</Text>
          <Text style={styles.subtitle}>Your reservation has been successfully placed</Text>
        </View>

        {/* --- DETAILS CARD --- */}
        <View style={styles.card}>
          {/* Row: Booking ID */}
          <View style={styles.row}>
            <Text style={styles.label}>Booking ID:</Text>
            <Text style={styles.valueBlue}>{mockBookingID}</Text>
          </View>

          {/* Row: Guest */}
          <View style={styles.row}>
            <Text style={styles.label}>Guest:</Text>
            <Text style={styles.value}>{formData?.name || "Guest"}</Text>
          </View>

          {/* Row: Room */}
          <View style={styles.row}>
            <Text style={styles.label}>Room:</Text>
            <Text style={styles.value} numberOfLines={1}>{room?.name || "Room Name"}</Text>
          </View>

          {/* Row: Check-in */}
          <View style={styles.row}>
            <Text style={styles.label}>Check-in:</Text>
            <Text style={styles.value}>{formData?.checkIn || "TBD"}</Text>
          </View>

          {/* Row: Check-out */}
          <View style={styles.row}>
            <Text style={styles.label}>Check-out:</Text>
            <Text style={styles.value}>{formData?.checkOut || "TBD"}</Text>
          </View>
          
           {/* Row: Duration (Thêm dòng này để rõ ràng hơn - Tùy chọn) */}
           <View style={styles.row}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{nights} night(s)</Text>
          </View>

          {/* Divider line */}
          <View style={styles.divider} />

          {/* Row: Total */}
          <View style={styles.row}>
            <Text style={styles.label}>Total:</Text>
            {/* Sử dụng biến finalTotalPrice vừa tính toán */}
            <Text style={styles.totalPrice}>${finalTotalPrice}</Text>
          </View>
        </View>

        {/* --- ACTION BUTTONS --- */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.outlineButton} onPress={onReset}>
            <Text style={styles.outlineButtonText}>Book Another Room</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 24,
    alignItems: "center",
  },
  
  // Header Styles
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#DCFCE7", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  checkMark: {
    fontSize: 40,
    color: "#22C55E", 
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },

  // Card Styles
  card: {
    width: "100%",
    backgroundColor: "#F9FAFB", 
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    maxWidth: "60%",
    textAlign: "right",
  },
  valueBlue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563EB",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
  },

  // Button Styles
  buttonGroup: {
    width: "100%",
    gap: 12, 
  },
  outlineButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563EB",
  },
  outlineButtonText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
  },
});