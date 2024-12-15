import { Router } from 'express';
import { staffController } from '../controllers/staffController';

const router = Router();

router.post('/login', staffController.login);
router.post('/staff', staffController.createStaff);
router.get('/staff', staffController.getAllStaff);

export default router; 