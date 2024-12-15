export interface Booking {
    id: number;
    roomId: number;
    guestId: number;
    checkIn: Date;
    checkOut: Date;
    status: 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
  }