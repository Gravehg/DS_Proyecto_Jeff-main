import { ProductDAO } from "../daos/ProductDAO";
import { Product } from "../models/Product";
const fs = require("fs");

class ProductAdmin {
  private productDAO: ProductDAO = new ProductDAO();
  constructor() {}

  // Registra un producto
  public async registerProduct(product: Product) {
    const productId = await this.productDAO.registerProduct(product);
    // Guardamos la foto en el sistema de archivos
    await fs.renameSync(
      product.getPhoto(),
      "photos/products/" + productId + ".png"
    );
  }

  // Actualiza los datos de un producto
  public async updateProduct(product: Product) {
    // Si hay una foto nueva
    if (product.getPhoto() !== "") {
      // Eliminamos la foto anterior
      await fs.unlink("photos/products/" + product.getID() + ".png", () => {});
      // Guardamos la nueva foto
      await fs.renameSync(
        product.getPhoto(),
        "photos/products/" + product.getID() + ".png"
      );
    }
    return await this.productDAO.updateProduct(product);
  }

  // Elimina un producto por su Id
  public async deleteProduct(productId: string) {
    // Eliminamos la foto del sistema de archivos
    await fs.unlink("photos/products/" + productId + ".png", () => {});
    // Eliminamos el producto de la BD
    await this.productDAO.deleteProduct(productId);
  }

  // Retorna todos los productos registrados
  public async getProducts() {
    return await this.productDAO.getProducts();
  }

  // Retorna el producto con el Id enviado por parámetro
  public async getProduct(productId: string) {
    return await this.productDAO.getProduct(productId);
  }
}

export { ProductAdmin };
