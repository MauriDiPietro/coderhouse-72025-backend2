import { Router } from "express";
import { ticketController } from "../controllers/ticket-controller.js";
import { passportCall } from '../middlewares/passport-call.js'

const router = Router();

router.post("/purchase", passportCall('jwt', { session: false }), ticketController.generateTicket);

export default router;
