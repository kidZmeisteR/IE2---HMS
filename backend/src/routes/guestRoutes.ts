import { Router } from 'express';
import { guestController } from '../controllers/guestController';

const router = Router();

router.get('/', guestController.getAllGuests);
router.post('/', guestController.createGuest);
router.put('/:id', guestController.updateGuest);
router.delete('/:id', guestController.deleteGuest);

export default router; 