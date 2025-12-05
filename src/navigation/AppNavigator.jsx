import React, { useState } from "react";
import LoginScreen from "../screens/LoginScreen";
import SearchScreen from "../screens/SearchScreen";
import BookingScreen from "../screens/BookingScreen";
import BookingSuccessScreen from "../screens/BookingSuccessScreen";

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentScreen("search");
  };

  const handleSelectRoom = (room, search) => {
    setSelectedRoom(room);
    setSearchData(search);
    setCurrentScreen("booking");
  };

  const handleConfirmBooking = (booking) => {
    setBookingData(booking);
    setCurrentScreen("success");
  };

  const resetApp = () => {
    setSelectedRoom(null);
    setSearchData(null);
    setBookingData(null);
    setCurrentScreen("search");
  };

  return (
    <>
      {currentScreen === "login" && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {currentScreen === "search" && (
        <SearchScreen
          user={currentUser}
          onSelectRoom={handleSelectRoom}
        />
      )}

      {currentScreen === "booking" && (
        <BookingScreen
          room={selectedRoom}
          searchData={searchData}
          onConfirm={handleConfirmBooking}
          onBack={() => setCurrentScreen("search")}
        />
      )}

      {currentScreen === "success" && (
        <BookingSuccessScreen
          booking={bookingData}
          onReset={resetApp}
        />
      )}
    </>
  );
}
