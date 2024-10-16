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
var router = require("express").Router();
var multer = require("multer");
var ToManyProductsInCart = require("../exceptions/exceptions").ToManyProductsInCart;
var paymentUpload = multer({ dest: "photos/payments" });
var Controller_1 = require("../controllers/Controller");
var controller = Controller_1.Controller.getInstance();
// Funciones de carrito -------------------------------------------------------------------------
router.post("/add_product_to_cart", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, units, user, userId, e_1, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, productId = _a.productId, units = _a.units;
                user = req.user;
                userId = user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.addProductToCart(userId, productId, parseInt(units, 10))];
            case 2:
                _b.sent();
                res.send(JSON.stringify({ error: false, message: "Producto agregado al carrito" }));
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                message = "Ocurrió un error inesperado, intente de nuevo";
                if (e_1 instanceof ToManyProductsInCart) {
                    message = e_1.message;
                }
                res.send(JSON.stringify({
                    error: true,
                    message: message,
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/delete_product_from_cart", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, units, user, userId, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, productId = _a.productId, units = _a.units;
                user = req.user;
                userId = user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.deleteProductFromCart(userId, productId, parseInt(units, 10))];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Producto eliminado",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/get_cart", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userId, cart, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                userId = user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.getCart(userId)];
            case 2:
                cart = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Carrito consultado exitosamente",
                    result: cart,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/confirm_order", paymentUpload.single("photo"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, address, totalPrice, user, userId, photoPath, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, address = _a.address, totalPrice = _a.totalPrice;
                user = req.user;
                userId = user.id;
                photoPath = req.file ? req.file.path : "";
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.sendOrder(userId, address, totalPrice, photoPath)];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Pedido generado exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_4 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rutas de pedidos -------------------------------------------------------------------------------
router.get("/get_orders", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userId, orders, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                userId = user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.getUserOrders(userId)];
            case 2:
                orders = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Pedidos consultados exitosamente",
                    result: orders,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
