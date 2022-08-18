const Category = require('../models/Category');

module.exports = {
    Query: {
        async getCategories() {
            try{
                const categories = await Category.find().sort({ createdAt: -1 });
                return categories;
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation:{
        async createCategory (_, { name }) {
         
            const newCategory = new Category({
                name,
                createdAt: new Date().toISOString()
            });

            const category = await newCategory.save();

            // if (category) {
            //     return "success";
            // }
            // return "error";
            return category;
        },
        async deleteCategory(_, {categoryId}){
            const category = await Post.findById(postId);
            
            
             if (category) {
                return "success";
            }
            return "error";
        },
        async deleteCategory(_, {categoryId}){

            const category = await Category.findById(categoryId);

            if (category) {
                return "success";
            }
            return "error";
            // const totalBefore = category.length;

            // const day = category.find(day => day.id === id);

            // let removed = false;
      
            // if (day) {
            //     category = category.filter(day => day.id !== id);
            //   removed = true;
            // }
      
            // const totalAfter = category.length;
      
            // return {
            //   removed,
            //   category,
            //   totalAfter,
            //   day
            // };
          
        },
    }
}
