import contactForm from "../models/contactForm";

export const createFormResponse = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    const newContact = new contactForm({ name, email, subject, message });
    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: "Response submitted successfully",
    }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

export const getAllFormResponses = async (req, res) => {
  try {
    const contacts = await contactForm.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}