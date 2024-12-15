import { Router } from 'express';
import { bookingController } from '../controllers/bookingController';

const router = Router();

router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);
router.patch('/:id/status', bookingController.updateBookingStatus);

export default router;