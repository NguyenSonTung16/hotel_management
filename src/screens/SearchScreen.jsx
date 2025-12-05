import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Platform,
    StatusBar,
} from "react-native";

import { MOCK_ROOMS } from "../data/mockRooms";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40 - 15) / 2;

export default function SearchScreen({ user = { name: "Admin User" }, onSelectRoom }) {
    // --- STATE ---
    const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm tên
    const [capacity, setCapacity] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [showCapacityDropdown, setShowCapacityDropdown] = useState(false);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);

    // --- LOGIC LỌC (FILTER) ---
    const filteredRooms = MOCK_ROOMS.filter((r) => {
        // --- CAPACITY FILTER ---
        // Nếu chọn "none" => bỏ qua
        let matchCapacity = true;
        if (capacity !== "none") {
            matchCapacity = r.capacity >= Number(capacity);
        }

        // --- NAME FILTER ---
        const matchName = r.name.toLowerCase().includes(searchQuery.toLowerCase());

        // --- PRICE RANGE FILTER ---
        let matchPrice = true;

        if (priceRange !== "none") {
            // TH1: dạng 100-200
            if (priceRange.includes("-")) {
                const [min, max] = priceRange.split("-").map(Number);
                matchPrice = r.price >= min && r.price <= max;
            }

            // TH2: dạng >500
            if (priceRange.startsWith(">")) {
                const min = Number(priceRange.replace(">", ""));
                matchPrice = r.price > min;
            }
        }

        return matchCapacity && matchName && matchPrice;
    });


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2563EB" barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Find Your Perfect Room</Text>
                    <Text style={styles.headerSubtitle}>Welcome, {user.name}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* --- SEARCH CARD --- */}
                <View style={styles.searchCard}>
                    {/* Search Input (Tìm theo tên) */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Room Name</Text>
                        <TextInput
                            placeholder="Nhập tên phòng..."
                            value={searchQuery}
                            onChangeText={setSearchQuery} // Cập nhật state tìm kiếm khi gõ
                            style={styles.mainInput}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>



                    {/* Capacity Row */}
                    <View style={[styles.row, { marginTop: 15, zIndex: 100 }]}>
                        <View
                            style={[
                                styles.col,
                                {
                                    marginRight: 10,
                                    zIndex: showCapacityDropdown ? 2000 : 1
                                }
                            ]}
                        >
                            <Text style={styles.label}>Capacity</Text>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => {
                                    setShowCapacityDropdown(!showCapacityDropdown);
                                    setShowPriceDropdown(false);
                                }}
                            >
                                <Text style={styles.dropdownInput}>{capacity || "Select capacity"}</Text>
                                <Text style={styles.icon}>▼</Text>
                            </TouchableOpacity>

                            {showCapacityDropdown && (
                                <View style={styles.dropdownList}>
                                    {["none", "1", "2", "3", "4"].map((c) => (
                                        <TouchableOpacity
                                            key={c}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setCapacity(c);
                                                setShowCapacityDropdown(false);
                                            }}
                                        >
                                            <Text style={styles.dropdownItemText}>{c}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Price Range Column */}
                        <View
                            style={[
                                styles.col,
                                {
                                    zIndex: showPriceDropdown ? 2000 : 1
                                }
                            ]}
                        >
                            <Text style={styles.label}>Price Range</Text>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => {
                                    setShowPriceDropdown(!showPriceDropdown);
                                    setShowCapacityDropdown(false);
                                }}
                            >
                                <Text style={styles.dropdownInput}>{priceRange || "Select range"}</Text>
                                <Text style={styles.icon}>▼</Text>
                            </TouchableOpacity>

                            {showPriceDropdown && (
                                <View style={styles.dropdownList}>
                                    {["none", "100-200", "200-300", "300-500", ">500"].map((r) => (
                                        <TouchableOpacity
                                            key={r}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setPriceRange(r);
                                                setShowPriceDropdown(false);
                                            }}
                                        >
                                            <Text style={styles.dropdownItemText}>{r}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                    </View>

                </View>

                {/* --- ROOM LIST --- */}
                <Text style={styles.sectionTitle}>Recommended Rooms</Text>
                {filteredRooms.length > 0 ? (
                    <View style={styles.gridContainer}>
                        {filteredRooms.map((room) => (
                            <View key={room.id} style={styles.roomCard}>
                                <Image source={{ uri: room.image }} style={styles.roomImage} />

                                <View style={styles.roomContent}>
                                    <Text style={styles.roomName} numberOfLines={1}>
                                        {room.name}
                                    </Text>

                                    <View style={styles.roomMetaContainer}>
                                        <Text style={styles.metaText}>📍 {room.size}</Text>
                                        <Text style={styles.metaText}>🛏️ {room.bed}</Text>
                                        <Text style={styles.metaText}>👁️ {room.view}</Text>
                                    </View>

                                    <View style={styles.footerRow}>
                                        <Text style={styles.price}>
                                            ${room.price}
                                            <Text style={styles.perNight}>/night</Text>
                                        </Text>

                                        <TouchableOpacity
                                            style={styles.selectButton}
                                            onPress={() => onSelectRoom && onSelectRoom(room, { capacity })}
                                        >
                                            <Text style={styles.selectButtonText}>Select</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    // --- UI KHI KHÔNG TÌM THẤY PHÒNG ---
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🔍</Text>
                        <Text style={styles.emptyText}>Phòng không tồn tại</Text>
                        <Text style={styles.emptySubText}>Vui lòng thử từ khóa khác</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9FAFB" },
    header: {
        backgroundColor: "#2563EB",
        height: 150,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? 20 : 0,
        justifyContent: "flex-start",
    },
    headerContent: { marginTop: 40 },
    headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
    headerSubtitle: { fontSize: 14, color: "#DBEAFE", marginTop: 5 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

    // Search Card
    searchCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginTop: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 10,
    },
    inputGroup: { marginBottom: 16 },
    mainInput: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: "#374151",
    },
    row: { flexDirection: "row" },
    col: { flex: 1 },
    label: { fontSize: 13, color: "#6B7280", marginBottom: 6, fontWeight: "500" },
    dateInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 44,
    },
    dateInput: { flex: 1, fontSize: 13, color: "#374151", padding: 0 },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 44,
    },
    dropdownInput: { flex: 1, fontSize: 14, color: "#374151", padding: 0 },
    icon: { fontSize: 12, color: "#9CA3AF", marginLeft: 5 },

    // List & Room Card
    sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#111827", marginBottom: 16 },
    gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    roomCard: {
        width: CARD_WIDTH,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    roomImage: { width: "100%", height: 120, resizeMode: "cover" },
    roomContent: { padding: 12 },
    roomName: { fontSize: 14, fontWeight: "bold", color: "#1F2937", marginBottom: 8 },
    roomMetaContainer: { marginBottom: 12 },
    metaText: { fontSize: 11, color: "#6B7280", marginBottom: 4 },
    footerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
    price: { fontSize: 16, fontWeight: "bold", color: "#2563EB" },
    perNight: { fontSize: 10, color: "#6B7280", fontWeight: "normal" },
    selectButton: { backgroundColor: "#2563EB", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
    selectButtonText: { color: "#fff", fontSize: 12, fontWeight: "600" },

    // Empty State Styles (Mới thêm)
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
    },
    emptyIcon: {
        fontSize: 40,
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#374151",
        marginBottom: 4,
    },
    emptySubText: {
        fontSize: 14,
        color: "#9CA3AF",
    },
    dropdownList: {
        position: "absolute",
        top: 48,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        zIndex: 999,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        maxHeight: 180,
        overflow: "hidden",
    }


});