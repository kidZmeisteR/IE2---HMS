import { Request, Response } from 'express';
import prisma from '../config/database';

export const roomController = {
  async getAllRooms(req: Request, res: Response) {
    try {
      const rooms = await prisma.room.findMany();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }
  },

  async createRoom(req: Request, res: Response) {
    try {
      const room = await prisma.room.create({
        data: req.body
      });
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create room' });
    }
  },

  async updateRoom(req: Request, res: Response) {
    try {
      const room = await prisma.room.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
      });
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update room' });
    }
  }
};