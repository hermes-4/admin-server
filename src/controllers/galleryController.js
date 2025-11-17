import Gallery from "../models/galleryModel";

export const getGallery = async (req, res) => {
  try {
    let gallery = await Gallery.findOne();
    if (!gallery) gallery = await Gallery.create({ images: [] });

    return res.json({ images: gallery.images });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

 export const addImages = async (req, res) => {
  try {
    const { images } = req.body;

    if (!Array.isArray(images)) {
      return res.status(400).json({ error: "Images must be an array" });
    }

    const gallery = await Gallery.findOne();

    gallery.images.push(...images);
    await gallery.save();

    res.status(201).json({ images: gallery.images });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { images } = req.body;

    if (!Array.isArray(images)) {
      return res.status(400).json({ error: "Images must be an array" });
    }

    const gallery = await Gallery.findOne();

    gallery.images = images; // Mongoose assigns new _ids automatically
    await gallery.save();

    res.json({ images: gallery.images });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findOne();
    if (!gallery) return res.status(404).json({ error: "Gallery not found" });

    const exists = gallery.images.id(id);
    if (!exists) {
      return res.status(404).json({ error: "Image not found" });
    }

    gallery.images.id(id).deleteOne();
    await gallery.save();

    return res.json({ images: gallery.images });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
