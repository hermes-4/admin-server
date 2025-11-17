import Category from "../models/categoryModels.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    if (Array.isArray(req.body.categories)) {
      const created = await Category.insertMany(req.body.categories);
      return res.status(201).json(created);
    }

    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Category not found" });

    res.status(201).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCategories = async (req, res) => { 
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Category not found" });

    res.status(201).json({ message: "Category deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
