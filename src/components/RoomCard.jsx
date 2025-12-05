import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function RoomCard({ room, onPress }) {
  return (
    <TouchableOpacity
      style={{
        padding: 16,
        backgroundColor: "#fff",
        marginBottom: 12,
        borderRadius: 12
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{room.name}</Text>
      <Text>Giá: ${room.price} / đêm</Text>
      <Text>Sức chứa: {room.capacity} người</Text>
    </TouchableOpacity>
  );
}
