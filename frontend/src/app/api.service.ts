import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, Booking, Guest } from './index';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // Rooms
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.apiUrl}/api/rooms`);
  }

  // Bookings
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${environment.apiUrl}/api/bookings`);
  }

  createBooking(booking: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(`${environment.apiUrl}/api/bookings`, booking);
  }

  updateBookingStatus(id: number, status: string): Observable<Booking> {
    return this.http.patch<Booking>(`${environment.apiUrl}/api/bookings/${id}/status`, { status });
  }

  // Guests
  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${environment.apiUrl}/api/guests`);
  }

  createGuest(guest: Partial<Guest>): Observable<Guest> {
    return this.http.post<Guest>(`${environment.apiUrl}/api/guests`, guest);
  }

  updateGuest(id: number, guest: Partial<Guest>): Observable<Guest> {
    return this.http.put<Guest>(`${environment.apiUrl}/api/guests/${id}`, guest);
  }

  deleteGuest(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/guests/${id}`);
  }
}
