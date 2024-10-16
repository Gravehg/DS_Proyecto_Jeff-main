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
var EmailInUse = require("../exceptions/exceptions").EmailInUse;
var Controller_1 = require("../controllers/Controller");
var controller = Controller_1.Controller.getInstance();
// Rutas de publicaciones -------------------------------------------------------------
router.get("/get_publications", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var publications, categoryId, tags, keywords, trimmedKeywords, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                publications = [];
                if (!(Object.keys(req.query).length > 0)) return [3 /*break*/, 5];
                if (!req.query.categoryId) return [3 /*break*/, 2];
                categoryId = req.query.categoryId;
                return [4 /*yield*/, controller.getPublicationsByCategory(categoryId)];
            case 1:
                publications = _a.sent();
                return [3 /*break*/, 4];
            case 2:
                tags = req.query.keywords ? new String(req.query.keywords) : "";
                keywords = tags.split(",");
                trimmedKeywords = keywords.map(function (keyword) { return keyword.trim(); });
                return [4 /*yield*/, controller.getPublicationsByTags(trimmedKeywords)];
            case 3:
                publications = _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, controller.getPublications()];
            case 6:
                publications = _a.sent();
                _a.label = 7;
            case 7:
                res.send(JSON.stringify({
                    error: false,
                    message: "Publicaciones consultadas exitosamente",
                    result: publications,
                }));
                return [3 /*break*/, 9];
            case 8:
                e_1 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
router.get("/get_publication/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var publication, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getPublication(req.params.id)];
            case 1:
                publication = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Publicación consultado exitosamente",
                    result: publication,
                }));
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Rutas de productos -----------------------------------------------------------------
router.get("/get_products", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getProducts()];
            case 1:
                products = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Productos consultados exitosamente",
                    result: products,
                }));
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/get_product/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getProduct(req.params.id)];
            case 1:
                product = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Producto consultado exitosamente",
                    result: product,
                }));
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Rutas de categorías -----------------------------------------------------------------------
router.get("/get_categories", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getCategories()];
            case 1:
                categories = _a.sent();
                res.send({
                    error: false,
                    message: "Categorías consultadas exitosamente",
                    result: categories,
                });
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/get_subcategories/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var subcategories, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getSubCategories(req.params.id)];
            case 1:
                subcategories = _a.sent();
                res.send({
                    error: false,
                    message: "Subcategorías consultadas exitosamente",
                    result: subcategories,
                });
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/get_category/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getCategory(req.params.id)];
            case 1:
                category = _a.sent();
                res.send({
                    error: false,
                    message: "Categorías consultadas exitosamente",
                    result: category,
                });
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Rutas de usuario -----------------------------------------------------------------------
router.post("/update_user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, name, email, phone, password, e_8, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, name = _a.name, email = _a.email, phone = _a.phone, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.updateUser(userId, name, email, phone, password)];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Datos actualizados exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_8 = _b.sent();
                if (e_8 instanceof Error) {
                    message = "Ocurrió un error inesperado, intente de nuevo";
                    if (e_8 instanceof EmailInUse) {
                        message = e_8.message;
                    }
                    res.send(JSON.stringify({
                        error: true,
                        message: message,
                    }));
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/update_user_code", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.updateRecoverCode(email)];
            case 2:
                _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Código actualizado exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_9 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/check_recover_code", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, code, result, e_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, email = _a.email, code = _a.code;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.compareRecoverCode(email, code)];
            case 2:
                result = _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Código comparado exitosamente",
                    result: result,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_10 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/check_email_exists", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, result, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.query.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.userExists(email)];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Correo electrónico verificado exitosamente",
                    result: result,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_11 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/update_user_password", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, e_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.updatePassword(email, password)];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Contraseña actualizada exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_12 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rutas de pedidos -----------------------------------------------------------------------------------
router.get("/get_order/:orderId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, order, e_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = req.params.orderId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.getOrder(orderId)];
            case 2:
                order = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Pedido consultado exitosamente",
                    result: order,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_13 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rutas de notificaciones -----------------------------------------------------------------------------
router.get("/get_notifications", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userId, notifications, e_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                userId = user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.getUserNotifications(userId)];
            case 2:
                notifications = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Notificaciones consultadas exitosamente",
                    result: notifications,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_14 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/get_unread_amount", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userId, amount, e_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                userId = user.id;
                return [4 /*yield*/, controller.unreadAmount(userId)];
            case 1:
                amount = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Número de notificaciones no leídas consultadas exitosamente",
                    result: amount,
                }));
                return [3 /*break*/, 3];
            case 2:
                e_15 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/mark_notifications_as_read", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userId, e_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                userId = user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.markAsRead(userId)];
            case 2:
                _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Notificaciones marcadas como leídas exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_16 = _a.sent();
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
