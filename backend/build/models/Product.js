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
exports.Product = void 0;
var Viewable_1 = require("./Viewable");
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product(description, photo, name, units, price, productId) {
        var _this = _super.call(this, photo, description) || this;
        _this.productId = productId;
        _this.name = name;
        _this.units = units;
        _this.price = price;
        return _this;
    }
    Product.prototype.getID = function () {
        return this.productId;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getDescription = function () {
        return this.description;
    };
    Product.prototype.getUnits = function () {
        return this.units;
    };
    Product.prototype.getPrice = function () {
        return this.price;
    };
    Product.prototype.getPhoto = function () {
        return this.photo;
    };
    Product.prototype.setId = function (newId) {
        this.productId = newId;
    };
    Product.prototype.setName = function (newName) {
        this.name = newName;
    };
    Product.prototype.setDescription = function (newDescription) {
        this.description = newDescription;
    };
    Product.prototype.setUnits = function (newUnits) {
        this.units = newUnits;
    };
    Product.prototype.setPrice = function (newPrice) {
        this.price = newPrice;
    };
    Product.prototype.setPhoto = function (newPhoto) {
        this.photo = newPhoto;
    };
    return Product;
}(Viewable_1.Viewable));
exports.Product = Product;
