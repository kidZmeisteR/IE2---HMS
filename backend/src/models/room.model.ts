export interface Room {
    id: number;
    roomNumber: string;
    type: 'SINGLE' | 'DOUBLE' | 'SUITE';
    price: number;
    status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
  }