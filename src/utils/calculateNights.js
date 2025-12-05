export const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1;
  
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
  
    const nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return nights <= 0 ? 1 : nights;
  };
  