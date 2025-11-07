import Category from "../models/categoryModels.js";


export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );

    if (!updated) return res.status(404).json({ error: "Category not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


export const deleteCategories =  async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

