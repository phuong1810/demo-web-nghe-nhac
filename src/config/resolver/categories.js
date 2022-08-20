const Category = require("../models/Category");
module.exports = {
  Query: {
    async getCategories() {
      try {
        const categories = await Category.find().sort({ createdAt: -1 });
        return categories;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getCategoriesById(_, { id }) {
      try {
        const category = await Category.findById(id);
        return category;
      } catch (err) {
        return null;
      }
    },
  },
  Mutation: {
    async createCategory(_, { name }) {
      const newCategory = new Category({
        name,
        createdAt: new Date().toISOString(),
      });

      const category = await newCategory.save();

      // if (category) {
      //     return "success";
      // }
      // return "error";
      return category;
    },
    async updateCategory(_, { id, name }) {
      try {
        const category = await Category.findById(id);
        if (category) {
          category.name = name;
          await category.save();
          return category;
        }
      } catch (e) {
        return "error";
      }
    },
    async deleteCategory(_, { categoryId }) {
      try {
        const category = await Category.findById(categoryId);
        if (category) {
          const data = await Category.findByIdAndDelete(categoryId);
          return "success";
        }
      } catch (e) {
        return "error";
      }
    },
  },
};
