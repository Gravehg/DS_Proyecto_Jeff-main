import { CartDAO } from "../daos/CartDAO";
const { ToManyProductsInCart } = require("../exceptions/exceptions");
const fs = require("fs");

class CartAdmin {
  private cartDAO: CartDAO = new CartDAO();

  constructor() {}

  // Agrega un producto al carrito
  // Valida que no hayan más de 5 unidades del producto en el carrito
  public async addProductToCart(
    userId: string,
    productId: string,
    units: number
  ) {
    const actualUnits = await this.cartDAO.findProduct(productId, userId);
    //El -1 significa que el producto todavía no está en el carrito
    if (actualUnits === -1) {
      return await this.cartDAO.addProduct(productId, units, userId);
    } else {
      //Si las unidades son mayor a 5 se envia un mensaje de error
      const newUnits = actualUnits + units;
      if (newUnits > 5) {
        throw new ToManyProductsInCart();
      } else {
        //Sí el producto esta en el carrito y las unidades no son mayor a 5
        //se actualiza el número de unidades
        return await this.cartDAO.updateUnits(productId, newUnits, userId);
      }
    }
  }

  // Elimina una unidad de un producto del carrito
  // Si las unidades llegan a 0, se elimina el producto totalmente del carrito
  public async deleteProductFromCart(
    userId: string,
    productId: string,
    units: number
  ) {
    const actualUnits = await this.cartDAO.findProduct(productId, userId);
    const newUnits = actualUnits - units;
    if (newUnits <= 0) {
      return await this.cartDAO.deleteProduct(productId, userId);
    } else {
      return await this.cartDAO.updateUnits(productId, newUnits, userId);
    }
  }

  // Obtiene los productos del carrito de un usuario
  public async getCart(userId: string) {
    return await this.cartDAO.getCart(userId);
  }

  // Genera un pedido a partir del carrito de un usuario
  // Limpia los productos del carrito
  public async sendOrder(
    userId: string,
    address: string,
    totalPrice: Number,
    photoPath: string
  ) {
    //Linea de Productos
    const response = await this.getCart(userId);
    const lineProducts = response.products.map(
      (product: {
        _id: string;
        name: string;
        units: number;
        price: number;
      }) => ({
        id: product._id,
        name: product.name,
        units: product.units,
        price: product.price,
      })
    );

    const orderId = await this.cartDAO.registerOrder(
      userId,
      new Date(),
      address,
      totalPrice,
      lineProducts,
      1
    );

    // Vaciamos el carrito
    await this.cartDAO.deleteAll(userId);

    // Actualizamos el nombre de la foto en el sistema de archivos
    await fs.renameSync(photoPath, "photos/payments/" + orderId + ".png");

    return orderId;
  }
}

export { CartAdmin };
