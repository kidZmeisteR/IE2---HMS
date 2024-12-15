export interface Staff {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'RECEPTIONIST' | 'HOUSEKEEPER' | 'MANAGER';
  email: string;
  phone: string;
}

export interface StaffLoginDto {
  username: string;
  password: string;
} 