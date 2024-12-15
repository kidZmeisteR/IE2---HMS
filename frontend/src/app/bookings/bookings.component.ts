import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Booking, Room, Guest } from '../index';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  rooms: Room[] = [];
  guests: Guest[] = [];
  newBooking: Partial<Booking> = {
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'CONFIRMED'
  };
  editingBooking: Booking | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadBookings();
    this.loadRooms();
    this.loadGuests();
  }

  loadBookings() {
    this.apiService.getBookings().subscribe(bookings => this.bookings = bookings);
  }

  loadRooms() {
    this.apiService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

  loadGuests() {
    this.apiService.getGuests().subscribe(guests => this.guests = guests);
  }

  createBooking() {
    this.apiService.createBooking(this.newBooking).subscribe(() => {
      this.loadBookings();
      this.newBooking = {
        checkIn: new Date(),
        checkOut: new Date(),
        status: 'CONFIRMED'
      };
    });
  }

  updateBookingStatus(id: number, status: 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED') {
    this.apiService.updateBookingStatus(id, status).subscribe(() => {
      this.loadBookings();
    });
  }
}
