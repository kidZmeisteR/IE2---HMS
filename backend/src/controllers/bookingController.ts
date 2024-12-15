import { Request, Response } from 'express';
import prisma from '../config/database';

export const bookingController = {
  async getAllBookings(req: Request, res: Response) {
    try {
      const bookings = await prisma.booking.findMany({
        include: {
          room: true,
          guest: true
        }
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  },

  async createBooking(req: Request, res: Response) {
    try {
      const { roomId, guestId, checkIn, checkOut, status } = req.body;
      
      // Check if room is available
      const room = await prisma.room.findUnique({
        where: { id: roomId }
      });

      if (!room || room.status !== 'AVAILABLE') {
        return res.status(400).json({ error: 'Room is not available' });
      }

      const booking = await prisma.booking.create({
        data: {
          roomId,
          guestId,
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          status
        },
        include: {
          room: true,
          guest: true
        }
      });

      // Update room status
      await prisma.room.update({
        where: { id: roomId },
        data: { status: 'OCCUPIED' }
      });

      res.status(201).json(booking);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },

  async updateBookingStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const booking = await prisma.booking.update({
        where: { id: parseInt(id) },
        data: { status },
        include: {
          room: true,
          guest: true
        }
      });

      // Update room status based on booking status
      if (status === 'CHECKED_OUT') {
        await prisma.room.update({
          where: { id: booking.roomId },
          data: { status: 'AVAILABLE' }
        });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update booking status' });
    }
  }
};