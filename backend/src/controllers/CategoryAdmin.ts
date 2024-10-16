import { CategoryDAO } from "../daos/CategoryDAO";

class CategoryAdmin {
  private categoryDAO: CategoryDAO = new CategoryDAO();

  constructor() {}

  // Registra una categoría
  public async registerCategory(name: string) {
    return await this.categoryDAO.registerCategory(name);
  }

  // Actualiza una categoría
  public async editCategory(categoryId: string, newName: string) {
    return await this.categoryDAO.updateCategory(categoryId, newName);
  }

  // Obtiene todas las categorías
  public async getCategories() {
    return await this.categoryDAO.getCategories();
  }

  // Obtiene una categoría por Id
  public async getCategory(categoryId: string) {
    return await this.categoryDAO.getCategoryByID(categoryId);
  }

  // Elimina una categoría por Id
  public async deleteCategory(categoryId: string) {
    return await this.categoryDAO.deleteCategory(categoryId);
  }

  // Registra una subcategoría en una categoría
  public async registerSubCategory(name: string, fatherCategory: string) {
    return await this.categoryDAO.registerSubCategory(name, fatherCategory);
  }

  // Retorna todas las subcategorías de una categoría padre
  public async getSubCategories(fatherCategory: string) {
    return await this.categoryDAO.getSubCategories(fatherCategory);
  }
}

export { CategoryAdmin };
