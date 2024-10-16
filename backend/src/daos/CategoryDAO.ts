import Category from "../schemas/categoryS";

class CategoryDAO {
  constructor() {}

  // Retorna la categoria correspondiente al Id
  public async getCategoryByID(categoryId: string) {
    return await Category.findOne({ _id: categoryId });
  }

  // Retorna la categoria por el nombre
  public async getCategoryByName(name: string) {
    return await Category.findOne({ name: name });
  }

  // Retorna todas las categorias
  public async getCategories() {
    const categories = await Category.find({ fatherCategory: null }).select({
      _id: 1,
      name: 1,
    });
    const categoriesArray = categories.map((category) => category.toObject());
    for (let i = 0; i < categoriesArray.length; i++) {
      const categoryId: string = String(categoriesArray[i]._id);
      categoriesArray[i].subs = await this.getSubCategories(categoryId);
    }
    return categoriesArray;
  }

  // Retorna todas las subcategorias de una categoria
  public async getSubCategories(fatherCategory: string) {
    return await Category.find({ fatherCategory: fatherCategory }).select({
      _id: 1,
      name: 1,
    });
  }

  // Registra una categoria padre
  public async registerCategory(name: string) {
    const category = new Category({
      name: name,
    });
    return await category.save();
  }

  // Actualiza una categoría
  public async updateCategory(categoryId: string, name: string) {
    return await Category.updateOne(
      { _id: categoryId },
      { $set: { name: name } }
    );
  }

  // Elimina la categoria correspondiente al id
  public async deleteCategory(categoryId: string) {
    // Eliminamos las subcategorías de la categoría
    await Category.deleteMany({ fatherCategory: categoryId });
    // Eliminamos la categoría padre
    return await Category.deleteOne({ _id: categoryId });
  }

  // Registra una subcategoria de una categoría
  public async registerSubCategory(name: string, fatherCategory: string) {
    const subcategory = new Category({
      name: name,
      fatherCategory: fatherCategory,
    });
    return await subcategory.save();
  }
}

export { CategoryDAO };
