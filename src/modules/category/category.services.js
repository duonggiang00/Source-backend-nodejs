
import Category from "../../modules/category/category.model.js"

export const findByIdCategory = async (id) => {
    const data = await Category.findById(id);
    if (data) return data;
}

export default findByIdCategory;