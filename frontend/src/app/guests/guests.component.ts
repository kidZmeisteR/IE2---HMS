import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Guest } from '../index';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss'
})
export class GuestsComponent implements OnInit {
  guests: Guest[] = [];
  newGuest: Partial<Guest> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };
  editingGuest: Guest | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadGuests();
  }

  loadGuests() {
    this.apiService.getGuests().subscribe(guests => this.guests = guests);
  }

  createGuest() {
    if (this.validateGuest(this.newGuest)) {
      this.apiService.createGuest(this.newGuest).subscribe(() => {
        this.loadGuests();
        this.resetNewGuest();
      });
    }
  }

  startEdit(guest: Guest) {
    this.editingGuest = { ...guest };
  }

  updateGuest() {
    if (this.editingGuest && this.validateGuest(this.editingGuest)) {
      this.apiService.updateGuest(this.editingGuest.id, this.editingGuest).subscribe(() => {
        this.loadGuests();
        this.editingGuest = null;
      });
    }
  }

  deleteGuest(id: number) {
    if (confirm('Are you sure you want to delete this guest?')) {
      this.apiService.deleteGuest(id).subscribe(() => {
        this.loadGuests();
      });
    }
  }

  private validateGuest(guest: Partial<Guest>): boolean {
    return !!(guest.firstName && guest.lastName && guest.email && guest.phone);
  }

  private resetNewGuest() {
    this.newGuest = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
  }
}