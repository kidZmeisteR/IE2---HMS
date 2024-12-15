import { Request, Response } from 'express';
import prisma from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const staffController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const staff = await prisma.staff.findUnique({
        where: { username }
      });

      if (!staff) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, staff.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: staff.id, role: staff.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        token,
        staff: {
          id: staff.id,
          username: staff.username,
          firstName: staff.firstName,
          lastName: staff.lastName,
          role: staff.role,
          email: staff.email
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  createStaff: async (req: Request, res: Response) => {
    try {
      const { password, ...staffData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const staff = await prisma.staff.create({
        data: {
          ...staffData,
          password: hashedPassword
        }
      });

      const { password: _, ...staffResponse } = staff;
      res.status(201).json(staffResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create staff member' });
    }
  },

  getAllStaff: async (req: Request, res: Response) => {
    try {
      const staff = await prisma.staff.findMany({
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          email: true,
          phone: true,
          createdAt: true,
          updatedAt: true
        }
      });
      res.json(staff);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch staff' });
    }
  }
};

export { staffController }; 