"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartAdmin = void 0;
var CartDAO_1 = require("../daos/CartDAO");
var ToManyProductsInCart = require("../exceptions/exceptions").ToManyProductsInCart;
var fs = require("fs");
var CartAdmin = /** @class */ (function () {
    function CartAdmin() {
        this.cartDAO = new CartDAO_1.CartDAO();
    }
    // Agrega un producto al carrito
    // Valida que no hayan más de 5 unidades del producto en el carrito
    CartAdmin.prototype.addProductToCart = function (userId, productId, units) {
        return __awaiter(this, void 0, void 0, function () {
            var actualUnits, newUnits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartDAO.findProduct(productId, userId)];
                    case 1:
                        actualUnits = _a.sent();
                        if (!(actualUnits === -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.cartDAO.addProduct(productId, units, userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        newUnits = actualUnits + units;
                        if (!(newUnits > 5)) return [3 /*break*/, 4];
                        throw new ToManyProductsInCart();
                    case 4: return [4 /*yield*/, this.cartDAO.updateUnits(productId, newUnits, userId)];
                    case 5: 
                    //Sí el producto esta en el carrito y las unidades no son mayor a 5
                    //se actualiza el número de unidades
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Elimina una unidad de un producto del carrito
    // Si las unidades llegan a 0, se elimina el producto totalmente del carrito
    CartAdmin.prototype.deleteProductFromCart = function (userId, productId, units) {
        return __awaiter(this, void 0, void 0, function () {
            var actualUnits, newUnits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartDAO.findProduct(productId, userId)];
                    case 1:
                        actualUnits = _a.sent();
                        newUnits = actualUnits - units;
                        if (!(newUnits <= 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.cartDAO.deleteProduct(productId, userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.cartDAO.updateUnits(productId, newUnits, userId)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Obtiene los productos del carrito de un usuario
    CartAdmin.prototype.getCart = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartDAO.getCart(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Genera un pedido a partir del carrito de un usuario
    // Limpia los productos del carrito
    CartAdmin.prototype.sendOrder = function (userId, address, totalPrice, photoPath) {
        return __awaiter(this, void 0, void 0, function () {
            var response, lineProducts, orderId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCart(userId)];
                    case 1:
                        response = _a.sent();
                        lineProducts = response.products.map(function (product) { return ({
                            id: product._id,
                            name: product.name,
                            units: product.units,
                            price: product.price,
                        }); });
                        return [4 /*yield*/, this.cartDAO.registerOrder(userId, new Date(), address, totalPrice, lineProducts, 1)];
                    case 2:
                        orderId = _a.sent();
                        // Vaciamos el carrito
                        return [4 /*yield*/, this.cartDAO.deleteAll(userId)];
                    case 3:
                        // Vaciamos el carrito
                        _a.sent();
                        // Actualizamos el nombre de la foto en el sistema de archivos
                        return [4 /*yield*/, fs.renameSync(photoPath, "photos/payments/" + orderId + ".png")];
                    case 4:
                        // Actualizamos el nombre de la foto en el sistema de archivos
                        _a.sent();
                        return [2 /*return*/, orderId];
                }
            });
        });
    };
    return CartAdmin;
}());
exports.CartAdmin = CartAdmin;
