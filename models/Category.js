import mongoose from "mongoose";
const categoryModel = new mongoose.Schema({
  catType: {
    type: String,
  },
});
const Category =
  mongoose.models.Category || mongoose.model("Category", categoryModel);

export default Category;
