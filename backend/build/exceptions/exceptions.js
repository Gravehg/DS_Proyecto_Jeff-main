"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToManyProductsInCart = exports.ProductDoesNotExists = exports.ProductNotInStock = exports.EmailInUse = void 0;
var EmailInUse = /** @class */ (function (_super) {
    __extends(EmailInUse, _super);
    function EmailInUse() {
        var _this = _super.call(this, "El correo electrónico ya se encuentra en uso") || this;
        _this.name = "EmailInUse";
        Object.setPrototypeOf(_this, EmailInUse.prototype);
        return _this;
    }
    return EmailInUse;
}(Error));
exports.EmailInUse = EmailInUse;
var ProductNotInStock = /** @class */ (function (_super) {
    __extends(ProductNotInStock, _super);
    function ProductNotInStock(productName) {
        var _this = _super.call(this, "No hay suficientes unidades del producto con el nombre: " + productName) || this;
        _this.name = "ProductNotInStock";
        Object.setPrototypeOf(_this, ProductNotInStock.prototype);
        return _this;
    }
    return ProductNotInStock;
}(Error));
exports.ProductNotInStock = ProductNotInStock;
var ProductDoesNotExists = /** @class */ (function (_super) {
    __extends(ProductDoesNotExists, _super);
    function ProductDoesNotExists(productName) {
        var _this = _super.call(this, "No existe el producto en el inventario con el nombre: " + productName) || this;
        _this.name = "ProductDoesNotExists";
        Object.setPrototypeOf(_this, ProductDoesNotExists.prototype);
        return _this;
    }
    return ProductDoesNotExists;
}(Error));
exports.ProductDoesNotExists = ProductDoesNotExists;
var ToManyProductsInCart = /** @class */ (function (_super) {
    __extends(ToManyProductsInCart, _super);
    function ToManyProductsInCart() {
        var _this = _super.call(this, "No se pueden agregar más unidades del producto al carrito") || this;
        _this.name = "ToManyProductsInCart";
        Object.setPrototypeOf(_this, ToManyProductsInCart.prototype);
        return _this;
    }
    return ToManyProductsInCart;
}(Error));
exports.ToManyProductsInCart = ToManyProductsInCart;
