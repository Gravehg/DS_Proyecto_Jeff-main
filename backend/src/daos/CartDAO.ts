import Cart from "../schemas/cartS";
import Order from "../schemas/orderS";

class CartDAO {
  constructor() {}

  //Obtiene el carrito de un usuario
  public async getCart(idUser: string) {
    const result = await Cart.aggregate([
      {
        $match: { client: idUser },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productRef",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $group: {
          _id: "$_id",
          products: {
            $push: {
              _id: "$productDetails._id",
              name: "$productDetails.name",
              price: "$productDetails.price",
              photo: "$productDetails.photo",
              units: "$products.units",
            },
          },
        },
      },
    ]);
    if (result.length > 0) {
      return result[0];
    }
    return { products: [] };
  }

  // Agrega un producto al carrito
  public async addProduct(idProduct: string, units: Number, idUser: string) {
    const newProduct = { productRef: idProduct, units: units };
    return await Cart.updateOne(
      { client: idUser },
      { $push: { products: newProduct } }
    );
  }

  // Elimina un producto del carrito
  public async deleteProduct(idProduct: string, idUser: string) {
    return await Cart.updateOne(
      { client: idUser },
      { $pull: { products: { productRef: idProduct } } }
    );
  }

  //Actualiza el número de unidades de un prodcuto
  public async updateUnits(idProduct: String, units: Number, idUser: String) {
    const filter = {
      client: idUser,
      "products.productRef": idProduct,
    };
    const update = {
      $set: {
        "products.$.units": units,
      },
    };
    return await Cart.updateOne(filter, update);
  }

  //Encuentra en producto, en caso de que sí exista retorna la cantidad
  //de unidades que hay del producto
  public async findProduct(idProduct: String, idUser: String) {
    const cart = await Cart.findOne(
      { client: idUser },
      { products: { $elemMatch: { productRef: idProduct } } }
    );
    if (cart.products.length === 0) {
      return -1;
    } else {
      const product = cart.products[0];
      return product.units;
    }
  }

  //Elimina todos los productos del carrito
  public async deleteAll(idUser: String) {
    return await Cart.updateOne({ client: idUser }, { $set: { products: [] } });
  }

  // Registrar un pedido
  public async registerOrder(
    client: string,
    orderDate: Date,
    address: string,
    priceWithDelivery: Number,
    lineProducts: [{ _id: string; name: string; units: Number; price: Number }],
    state: Number
  ) {
    const order = new Order({
      clientRef: client,
      orderDate: orderDate,
      address: address,
      price: priceWithDelivery,
      photoOfPayment: "TEMPORAL",
      lineProducts: lineProducts,
      state: state,
    });

    const result = await order.save();

    //Actualizar foto del pago de la orden
    await Order.updateOne(
      { _id: result._id },
      { photoOfPayment: "/photos/payments/" + result._id + ".png" }
    );

    return result._id;
  }
}
export { CartDAO };
