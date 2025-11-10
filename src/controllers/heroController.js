import Hero from "../models/heroModels.js";

export const getHero = async (req, res) => {
  try {
    const { page } = req.query;
    const hero = await Hero.findOne({ page });

    res.json(hero || { page, slides: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateHero = async (req, res) => {
  try {
    const { page, slides } = req.body;

    if (!page || !slides?.length) {
      return res.status(400).json({ message: "Page and slides are required" });
    }

    const invalidSlide = slides.find(slide => !slide.images || slide.images.length === 0);
    if (invalidSlide) {
      return res.status(400).json({ message: "Each slide must have at least one image" });
    }

    let hero = await Hero.findOne({ page });

    if (!hero) {
      hero = await Hero.create({ page, slides });
    } else {
      hero.slides = slides;
      await hero.save();
    }

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

