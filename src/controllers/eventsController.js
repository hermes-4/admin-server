import Event from "../models/eventsModel.js";

export const addEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, image } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      image,
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    console.error("Add Event Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(id);

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete Event Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("Get Events Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
