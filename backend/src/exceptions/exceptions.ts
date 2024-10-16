class EmailInUse extends Error {
  constructor() {
    super("El correo electrónico ya se encuentra en uso");
    this.name = "EmailInUse";
    Object.setPrototypeOf(this, EmailInUse.prototype);
  }
}

class ProductNotInStock extends Error {
  constructor(productName: String) {
    super(
      "No hay suficientes unidades del producto con el nombre: " + productName
    );
    this.name = "ProductNotInStock";
    Object.setPrototypeOf(this, ProductNotInStock.prototype);
  }
}

class ProductDoesNotExists extends Error {
  constructor(productName: String) {
    super(
      "No existe el producto en el inventario con el nombre: " + productName
    );
    this.name = "ProductDoesNotExists";
    Object.setPrototypeOf(this, ProductDoesNotExists.prototype);
  }
}

class ToManyProductsInCart extends Error {
  constructor() {
    super("No se pueden agregar más unidades del producto al carrito");
    this.name = "ToManyProductsInCart";
    Object.setPrototypeOf(this, ToManyProductsInCart.prototype);
  }
}

export {
  EmailInUse,
  ProductNotInStock,
  ProductDoesNotExists,
  ToManyProductsInCart,
};
