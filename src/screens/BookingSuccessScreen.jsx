import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from "react-native";
import AppText from "../components/common/AppText";
import AppButton from "../components/common/AppButton";
import { calculateNights } from "../utils/calculateNights";
import { COLORS, FONTS, SIZES, SPACING, SHADOWS } from "../constants/hotelTheme";

export default function BookingSuccessScreen({ booking, onReset }) {
  const { room, formData } = booking;

  const nights = calculateNights(formData.checkIn, formData.checkOut);
  const finalTotalPrice = (nights > 0 ? nights : 1) * room.price;
  const mockBookingID = "BK" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.iconCircle}>
            <AppText style={styles.checkMark}>✓</AppText>
          </View>
          <AppText variant="title" align="center" style={styles.title}>Booking Confirmed!</AppText>
          <AppText variant="caption" align="center" color={COLORS.textLight} style={styles.subtitle}>
            Your reservation has been successfully placed
          </AppText>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <AppText style={styles.label}>Booking ID:</AppText>
            <AppText style={styles.valueAccent}>{mockBookingID}</AppText>
          </View>

          <View style={styles.row}>
            <AppText style={styles.label}>Guest:</AppText>
            <AppText style={styles.value}>{formData?.name || "Guest"}</AppText>
          </View>

          <View style={styles.row}>
            <AppText style={styles.label}>Room:</AppText>
            <AppText style={styles.value} numberOfLines={1}>{room?.name || "Room Name"}</AppText>
          </View>

          <View style={styles.row}>
            <AppText style={styles.label}>Check-in:</AppText>
            <AppText style={styles.value}>{formData?.checkIn || "TBD"}</AppText>
          </View>

          <View style={styles.row}>
            <AppText style={styles.label}>Check-out:</AppText>
            <AppText style={styles.value}>{formData?.checkOut || "TBD"}</AppText>
          </View>

          <View style={styles.row}>
            <AppText style={styles.label}>Duration:</AppText>
            <AppText style={styles.value}>{nights} night(s)</AppText>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <AppText style={styles.label}>Total:</AppText>
            <AppText style={styles.totalPrice}>${finalTotalPrice}</AppText>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <AppButton
            title="Book Another Room"
            onPress={onReset}
            style={styles.outlineButton}
            textStyle={styles.outlineButtonText}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    paddingTop: SPACING.xl + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
    alignItems: "center",
    gap: SPACING.lg,
  },
  headerContainer: {
    alignItems: "center",
    gap: SPACING.sm,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.light,
  },
  checkMark: {
    fontSize: 42,
    lineHeight: 44,
    fontWeight: "700",
    color: COLORS.success,
    textAlign: "center",
  },
  title: {
    color: COLORS.textDark,
  },
  subtitle: {
    maxWidth: "85%",
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
    gap: SPACING.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    ...FONTS.body4,
    color: COLORS.textLight,
    marginRight: SPACING.sm,
  },
  value: {
    ...FONTS.body3,
    color: COLORS.textDark,
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },
  valueAccent: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
  totalPrice: {
    ...FONTS.priceSmall,
  },
  buttonGroup: {
    width: "100%",
  },
  outlineButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    ...SHADOWS.light,
  },
  outlineButtonText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});