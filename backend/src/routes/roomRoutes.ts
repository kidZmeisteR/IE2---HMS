import { Router } from 'express';
import { roomController } from '../controllers/roomController';

const router = Router();

router.get('/', roomController.getAllRooms);
router.post('/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);

export default router;