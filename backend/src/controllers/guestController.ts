import { Request, Response } from 'express';
import prisma from '../config/database';

export const guestController = {
  async getAllGuests(req: Request, res: Response) {
    try {
      const guests = await prisma.guest.findMany({
        include: {
          bookings: true
        }
      });
      res.json(guests);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch guests' });
    }
  },

  async createGuest(req: Request, res: Response) {
    try {
      const guest = await prisma.guest.create({
        data: req.body,
        include: {
          bookings: true
        }
      });
      res.status(201).json(guest);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create guest' });
    }
  },

  async updateGuest(req: Request, res: Response) {
    try {
      const guest = await prisma.guest.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
        include: {
          bookings: true
        }
      });
      res.json(guest);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update guest' });
    }
  },

  async deleteGuest(req: Request, res: Response) {
    try {
      await prisma.guest.delete({
        where: { id: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete guest' });
    }
  }
}; 