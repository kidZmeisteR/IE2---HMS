export interface Room {
  id: number;
  roomNumber: string;
  type: 'SINGLE' | 'DOUBLE' | 'SUITE';
  price: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
}

export interface Booking {
  id: number;
  roomId: number;
  guestId: number;
  room?: Room;
  guest?: Guest;
  checkIn: Date;
  checkOut: Date;
  status: 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
}

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
