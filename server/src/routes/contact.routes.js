import { Router } from 'express';
import { submitContactForm } from '../controllers/contact.controllers.js';

const router = Router();

// @route   POST /api/contact
// @desc    Submit a new contact/inquiry form
// @access  Public
router.post('/', submitContactForm);

export default router;
