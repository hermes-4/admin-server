import Hero from "../models/heroModels.js";

export const getHero = async (req, res) => {
  try {
    const { page } = req.query; 
    const hero = await Hero.findOne({ page });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHero = async (req, res) => {
  try {
    const { page, title, subtitle, images } = req.body;

    if (!page || !title || !subtitle || !images?.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let hero = await Hero.findOne({ page });

    if (!hero) {
      hero = await Hero.create({ page, title, subtitle, images });
    } else {
      hero.title = title;
      hero.subtitle = subtitle;
      hero.images = images;
      await hero.save();
    }

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
