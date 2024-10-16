import Product from "../schemas/productS";
import Cart from "../schemas/cartS";
import { Product as ProductModel } from "../models/Product";

class ProductDAO {
  constructor() {}

  // Obtiene un producto por su id
  public async getProduct(productId: string) {
    return await Product.findOne({ _id: productId });
  }

  // Obtiene todos los productos registrados
  public async getProducts() {
    return await Product.find();
  }

  // Registra un producto
  public async registerProduct(productToRegister: ProductModel) {
    const product = new Product({
      name: productToRegister.getName(),
      description: productToRegister.getDescription(),
      units: productToRegister.getUnits(),
      photo: "TEMPORAL",
      price: productToRegister.getPrice(),
    });

    const result = await product.save();

    // Actualizamos el producto con la ruta de la foto en el sistema de archivos
    await Product.updateOne(
      { _id: result._id },
      { photo: "/photos/products/" + result._id + ".png" }
    );
    return result._id;
  }

  // Actualiza un producto
  public async updateProduct(productToUpdate: ProductModel) {
    return await Product.updateOne(
      { _id: productToUpdate.getID() },
      {
        name: productToUpdate.getName(),
        description: productToUpdate.getDescription(),
        units: productToUpdate.getUnits(),
        price: productToUpdate.getPrice(),
      }
    );
  }

  // Actualiza las unidades de un producto
  public async updateProductUnits(productId: string, units: number) {
    return await Product.updateOne(
      { _id: productId },
      {
        units: units,
      }
    );
  }

  // Elimina un producto
  // Nota: también elimina los productos de los carritos en los que se encontrara el producto
  public async deleteProduct(productId: string) {
    // Eliminamos los productos de los carritos
    await Cart.updateMany(
      {},
      {
        $pull: {
          products: {
            productRef: productId,
          },
        },
      }
    );
    return await Product.deleteOne({ _id: productId });
  }
}

export { ProductDAO };
