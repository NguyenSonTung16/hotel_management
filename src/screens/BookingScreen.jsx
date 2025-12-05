import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert // <--- Đảm bảo đã import Alert
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { calculateNights } from "../utils/calculateNights";

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
        
        <Text style={styles.headerTitle}>Booking Details</Text>

        {/* --- CARD INFO --- */}
        <View style={styles.card}>
          <Image 
            source={{ uri: room.image || "https://via.placeholder.com/100" }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardContent}>
            <Text style={styles.roomName} numberOfLines={2}>{room.name}</Text>
            <Text style={styles.roomMeta}>{room.size || "45m²"} • {room.bed || "King Bed"}</Text>
            
            {/* Hiển thị logic Preview */}
            <Text style={styles.roomMeta}>
              {capacityPreview} adults
            </Text>
            
            <Text style={styles.totalPrice}>
              ${totalPricePreview} <Text style={{ color: '#2563EB', fontWeight: '400', fontSize: 14 }}>/night</Text>
            </Text>
          </View>
        </View>

        {/* --- FORM --- */}
        <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Thông tin khách hàng</Text>
            <TextInput
              placeholder="Tên khách"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            {/* CHECK-IN INPUT */}
            <Text style={styles.label}>Ngày nhận phòng</Text>
            <TouchableOpacity onPress={() => setShowCheckInPicker(true)} style={styles.input}>
              <Text style={{ color: "#374151" }}>{formatDate(checkIn)}</Text>
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
            <Text style={styles.label}>Ngày trả phòng</Text>
            <TouchableOpacity onPress={() => setShowCheckOutPicker(true)} style={styles.input}>
              <Text style={{ color: "#374151" }}>{formatDate(checkOut)}</Text>
            </TouchableOpacity>

            {showCheckOutPicker && (
              <DateTimePicker
                value={checkOut}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeCheckOut}
                // ĐÃ BỎ: minimumDate={minCheckOutDate}
                // Chỉ chặn ngày quá khứ để tránh lỗi logic hệ thống
                minimumDate={new Date()} 
              />
            )}

            <View style={{ marginTop: 20, gap: 10 }}>
                {/* Logic Validation nằm trong hàm handleConfirm khi bấm nút này */}
                <Button title="Xác nhận" onPress={handleConfirm} color="#2563EB" />
                <Button title="Quay lại" color="gray" onPress={onBack} />
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#000", marginBottom: 16 },
  card: {
    backgroundColor: "#EFF6FF", borderRadius: 12, padding: 12,
    flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#DBEAFE",
  },
  cardImage: { width: 80, height: 80, borderRadius: 8, backgroundColor: "#ccc" },
  cardContent: { flex: 1, marginLeft: 12, justifyContent: "center" },
  roomName: { fontSize: 16, fontWeight: "bold", color: "#1F2937", marginBottom: 4 },
  roomMeta: { fontSize: 13, color: "#6B7280", marginBottom: 2 },
  totalPrice: { fontSize: 18, fontWeight: "bold", color: "#2563EB", marginTop: 4 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginTop: 12, marginBottom: 4 },
  input: {
    padding: 12, backgroundColor: "#F3F4F6", borderRadius: 8,
    borderWidth: 1, borderColor: "#E5E7EB", justifyContent: 'center'
  },
});