import express from "express";
import { addEvent, deleteEvent, getEvents } from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", getEvents);     
router.post("/", addEvent);     
router.delete("/:id", deleteEvent); 

export default router;
