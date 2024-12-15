import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Room } from '../index';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRooms().subscribe(rooms => this.rooms = rooms);
  }
}
