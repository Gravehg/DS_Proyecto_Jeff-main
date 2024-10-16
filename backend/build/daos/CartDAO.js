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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartDAO = void 0;
var cartS_1 = __importDefault(require("../schemas/cartS"));
var orderS_1 = __importDefault(require("../schemas/orderS"));
var CartDAO = /** @class */ (function () {
    function CartDAO() {
    }
    //Obtiene el carrito de un usuario
    CartDAO.prototype.getCart = function (idUser) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cartS_1.default.aggregate([
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
                        ])];
                    case 1:
                        result = _a.sent();
                        if (result.length > 0) {
                            return [2 /*return*/, result[0]];
                        }
                        return [2 /*return*/, { products: [] }];
                }
            });
        });
    };
    // Agrega un producto al carrito
    CartDAO.prototype.addProduct = function (idProduct, units, idUser) {
        return __awaiter(this, void 0, void 0, function () {
            var newProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newProduct = { productRef: idProduct, units: units };
                        return [4 /*yield*/, cartS_1.default.updateOne({ client: idUser }, { $push: { products: newProduct } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Elimina un producto del carrito
    CartDAO.prototype.deleteProduct = function (idProduct, idUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cartS_1.default.updateOne({ client: idUser }, { $pull: { products: { productRef: idProduct } } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Actualiza el número de unidades de un prodcuto
    CartDAO.prototype.updateUnits = function (idProduct, units, idUser) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = {
                            client: idUser,
                            "products.productRef": idProduct,
                        };
                        update = {
                            $set: {
                                "products.$.units": units,
                            },
                        };
                        return [4 /*yield*/, cartS_1.default.updateOne(filter, update)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Encuentra en producto, en caso de que sí exista retorna la cantidad
    //de unidades que hay del producto
    CartDAO.prototype.findProduct = function (idProduct, idUser) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cartS_1.default.findOne({ client: idUser }, { products: { $elemMatch: { productRef: idProduct } } })];
                    case 1:
                        cart = _a.sent();
                        if (cart.products.length === 0) {
                            return [2 /*return*/, -1];
                        }
                        else {
                            product = cart.products[0];
                            return [2 /*return*/, product.units];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Elimina todos los productos del carrito
    CartDAO.prototype.deleteAll = function (idUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cartS_1.default.updateOne({ client: idUser }, { $set: { products: [] } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Registrar un pedido
    CartDAO.prototype.registerOrder = function (client, orderDate, address, priceWithDelivery, lineProducts, state) {
        return __awaiter(this, void 0, void 0, function () {
            var order, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = new orderS_1.default({
                            clientRef: client,
                            orderDate: orderDate,
                            address: address,
                            price: priceWithDelivery,
                            photoOfPayment: "TEMPORAL",
                            lineProducts: lineProducts,
                            state: state,
                        });
                        return [4 /*yield*/, order.save()];
                    case 1:
                        result = _a.sent();
                        //Actualizar foto del pago de la orden
                        return [4 /*yield*/, orderS_1.default.updateOne({ _id: result._id }, { photoOfPayment: "/photos/payments/" + result._id + ".png" })];
                    case 2:
                        //Actualizar foto del pago de la orden
                        _a.sent();
                        return [2 /*return*/, result._id];
                }
            });
        });
    };
    return CartDAO;
}());
exports.CartDAO = CartDAO;
