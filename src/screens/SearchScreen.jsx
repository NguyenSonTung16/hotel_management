import React, { useState } from "react";
import {
    View,
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
import AppText from "../components/common/AppText";
import AppButton from "../components/common/AppButton";
import AppInput from "../components/common/AppInput";
import { COLORS, SIZES, FONTS, SHADOWS, SPACING } from "../constants/hotelTheme";

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
                    <AppText variant="title" color={COLORS.white}>Find Your Perfect Room</AppText>
                    <AppText variant="caption" color={COLORS.primaryLight}>Welcome, {user.name}</AppText>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* --- SEARCH CARD --- */}
                <View style={styles.searchCard}>
                    {/* Search Input (Tìm theo tên) */}
                    <AppInput
                        label="Room Name"
                        placeholder="Nhập tên phòng..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

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
                            <AppText variant="caption" style={styles.label}>Capacity</AppText>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => {
                                    setShowCapacityDropdown(!showCapacityDropdown);
                                    setShowPriceDropdown(false);
                                }}
                            >
                                <AppText style={styles.dropdownInput}>{capacity || "Select capacity"}</AppText>
                                <AppText style={styles.icon}>▼</AppText>
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
                                            <AppText style={styles.dropdownItemText}>{c}</AppText>
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
                            <AppText variant="caption" style={styles.label}>Price Range</AppText>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => {
                                    setShowPriceDropdown(!showPriceDropdown);
                                    setShowCapacityDropdown(false);
                                }}
                            >
                                <AppText style={styles.dropdownInput}>{priceRange || "Select range"}</AppText>
                                <AppText style={styles.icon}>▼</AppText>
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
                                            <AppText style={styles.dropdownItemText}>{r}</AppText>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                    </View>

                </View>

                {/* --- ROOM LIST --- */}
                <AppText variant="subtitle" style={styles.sectionTitle}>Recommended Rooms</AppText>
                {filteredRooms.length > 0 ? (
                    <View style={styles.gridContainer}>
                        {filteredRooms.map((room) => (
                            <View key={room.id} style={styles.roomCard}>
                                <Image source={{ uri: room.image }} style={styles.roomImage} />

                                <View style={styles.roomContent}>
                                    <AppText variant="body" style={styles.roomName} numberOfLines={1}>
                                        {room.name}
                                    </AppText>

                                    <View style={styles.roomMetaContainer}>
                                        <AppText variant="caption" color={COLORS.textLight}>📍 {room.size}</AppText>
                                        <AppText variant="caption" color={COLORS.textLight}>🛏️ {room.bed}</AppText>
                                        <AppText variant="caption" color={COLORS.textLight}>👁️ {room.view}</AppText>
                                    </View>

                                    <View style={styles.footerRow}>
                                        <View>
                                            <AppText style={styles.price}>
                                                ${room.price}
                                            </AppText>
                                            <AppText variant="caption" color={COLORS.textLight}>/night</AppText>
                                        </View>

                                        <AppButton
                                            title="Select"
                                            onPress={() => onSelectRoom && onSelectRoom(room, { capacity })}
                                            style={styles.selectButton}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    // --- UI KHI KHÔNG TÌM THẤY PHÒNG ---
                    <View style={styles.emptyContainer}>
                        <AppText style={styles.emptyIcon}>🔍</AppText>
                        <AppText variant="body" style={styles.emptyText}>Phòng không tồn tại</AppText>
                        <AppText variant="caption" color={COLORS.textLight}>Vui lòng thử từ khóa khác</AppText>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        backgroundColor: COLORS.primary,
        height: 150,
        paddingHorizontal: SPACING.lg,
        paddingTop: Platform.OS === "android" ? SPACING.lg : 0,
        justifyContent: "flex-start",
    },
    headerContent: { marginTop: 40 },
    scrollContent: { paddingHorizontal: SPACING.lg, paddingBottom: 40 },

    // Search Card
    searchCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SPACING.lg,
        marginTop: SPACING.lg,
        marginBottom: SPACING.xl,
        ...SHADOWS.medium,
        zIndex: 10,
    },
    row: { flexDirection: "row" },
    col: { flex: 1 },
    label: { 
        fontWeight: "500",
        color: COLORS.text,
        marginBottom: SPACING.xs
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.sm,
        height: 44,
        backgroundColor: COLORS.primaryLight,
    },
    dropdownInput: { 
        flex: 1, 
        ...FONTS.body3,
        color: COLORS.textDark, 
        padding: 0 
    },
    icon: { 
        ...FONTS.body4,
        color: COLORS.textLight, 
        marginLeft: 5 
    },

    // List & Room Card
    sectionTitle: { 
        fontWeight: "bold", 
        color: COLORS.textDark, 
        marginBottom: SPACING.md 
    },
    gridContainer: { 
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: "space-between" 
    },
    roomCard: {
        width: CARD_WIDTH,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radiusSmall,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
        ...SHADOWS.light,
    },
    roomImage: { width: "100%", height: 120, resizeMode: "cover" },
    roomContent: { padding: SPACING.sm },
    roomName: { 
        fontWeight: "bold", 
        color: COLORS.textDark, 
        marginBottom: SPACING.sm 
    },
    roomMetaContainer: { marginBottom: SPACING.sm },
    footerRow: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginTop: SPACING.xs 
    },
    price: { 
        ...FONTS.h4,
        fontWeight: "bold", 
        color: COLORS.primary 
    },
    selectButton: { 
        backgroundColor: COLORS.primary, 
        paddingVertical: SPACING.xs, 
        paddingHorizontal: SPACING.sm, 
        borderRadius: SIZES.radiusSmall,
        minHeight: 32,
        shadowOpacity: 0,
        elevation: 0,
    },

    // Empty State
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
    },
    emptyIcon: {
        fontSize: 40,
        marginBottom: SPACING.sm,
    },
    emptyText: {
        fontWeight: "bold",
        color: COLORS.textDark,
        marginBottom: SPACING.xs,
    },
    dropdownList: {
        position: "absolute",
        top: 48,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        zIndex: 999,
        elevation: 10,
        ...SHADOWS.medium,
        maxHeight: 180,
        overflow: "hidden",
    },
    dropdownItem: {
        padding: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    dropdownItemText: {
        ...FONTS.body3,
        color: COLORS.textDark,
    }
});