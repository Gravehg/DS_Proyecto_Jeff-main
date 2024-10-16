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
var Controller_1 = require("../controllers/Controller");
var exceptions_1 = require("../exceptions/exceptions");
var productUpload = multer({ dest: "photos/products" });
var publicationUpload = multer({ dest: "photos/publications" });
var controller = Controller_1.Controller.getInstance();
// Rutas de productos --------------------------------------------------------------------
router.post("/register_product", productUpload.single("photo"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, units, price, photoPath, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description, units = _a.units, price = _a.price;
                photoPath = req.file ? req.file.path : "";
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.registerProduct(name, description, units, price, photoPath)];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Producto registrado exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/delete_product/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.deleteProduct(req.params.id)];
            case 1:
                _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Producto eliminado exitosamente",
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
router.post("/update_product", productUpload.single("photo"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, name, description, units, price, photoPath, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, productId = _a.productId, name = _a.name, description = _a.description, units = _a.units, price = _a.price;
                photoPath = req.file ? req.file.path : "";
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.updateProduct(productId, name, description, units, price, photoPath)];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Producto actualizado exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_3 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rutas de categorías -------------------------------------------------------------------
router.post("/register_category", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.registerCategory(name)];
            case 2:
                _a.sent();
                res.send({ error: false, message: "Categoría registrada exitosamente" });
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/register_subcategory", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, fatherCategory, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, fatherCategory = _a.fatherCategory;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.registerSubcategory(name, fatherCategory)];
            case 2:
                _b.sent();
                res.send({ error: false, message: "Subcategoría registrada exitosamente" });
                return [3 /*break*/, 4];
            case 3:
                e_5 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/edit_category", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, categoryId, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name = _a.name, categoryId = _a.categoryId;
                return [4 /*yield*/, controller.updateCategory(categoryId, name)];
            case 1:
                _b.sent();
                res.send({ error: false, message: "Categoría actualizada exitosamente" });
                return [3 /*break*/, 3];
            case 2:
                e_6 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/delete_category", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.deleteCategory(req.body.categoryId)];
            case 1:
                _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Categoría eliminada exitosamente",
                }));
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
// Rutas de publicaciones ----------------------------------------------------------------
router.post("/register_publication", publicationUpload.single("photo"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, description, keywords, categoryId, photoPath, e_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, description = _a.description, keywords = _a.keywords, categoryId = _a.categoryId;
                photoPath = req.file ? req.file.path : "";
                return [4 /*yield*/, controller.registerPublication(description, keywords, categoryId, photoPath)];
            case 1:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Publicación registrada exitosamente",
                }));
                return [3 /*break*/, 3];
            case 2:
                e_8 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/update_publication", publicationUpload.single("photo"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, publicationId, description, tags, categoryId, photoPath, e_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, publicationId = _a.publicationId, description = _a.description, tags = _a.tags, categoryId = _a.categoryId;
                photoPath = req.file ? req.file.path : "";
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.updatePublication(publicationId, description, tags, categoryId, photoPath)];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Publicación actualizada exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_9 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/delete_publication/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var publicationId, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                publicationId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.deletePublication(publicationId)];
            case 2:
                _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Publicación eliminada exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_10 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rutas de pedidos ----------------------------------------------------------------------
router.get("/get_ordes", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getOrders()];
            case 1:
                orders = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Pedidos consultado exitosamente",
                    result: orders,
                }));
                return [3 /*break*/, 3];
            case 2:
                e_11 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/set_order_state", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, orderId, newState, e_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, orderId = _a.orderId, newState = _a.newState;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.setOrderState(orderId, newState)];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Estado de pedido actualizado exitosamente",
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
router.post("/confirm_order", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, e_13, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = req.body.orderId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.confirmOrder(orderId)];
            case 2:
                _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Pedido confirmado exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_13 = _a.sent();
                message = "Ocurrió un error inesperado, intente de nuevo";
                if (e_13 instanceof exceptions_1.ProductDoesNotExists) {
                    message = e_13.message;
                }
                if (e_13 instanceof exceptions_1.ProductNotInStock) {
                    message = e_13.message;
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
// Rutas de agenda -----------------------------------------------------------------------
router.post("/register_event", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, date, duration, description, type, e_14;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, date = _a.date, duration = _a.duration, description = _a.description, type = _a.type;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.registerEvent(date, duration, description, type)];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Evento registrado exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_14 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/event_overlaps", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, date, duration, description, type, eventId, result, e_15;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, date = _a.date, duration = _a.duration, description = _a.description, type = _a.type, eventId = _a.eventId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.overlaps(date, duration, description, type, eventId)];
            case 2:
                result = _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Traslape consultado exitosamente",
                    result: result,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_15 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/update_event", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, eventId, date, duration, description, type, e_16;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, eventId = _a.eventId, date = _a.date, duration = _a.duration, description = _a.description, type = _a.type;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.updateEvent(eventId, date, duration, description, type)];
            case 2:
                _b.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Evento actualizado exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_16 = _b.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/delete_event", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var eventId, e_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventId = req.body.eventId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.deleteEvent(eventId)];
            case 2:
                _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Evento eliminado exitosamente",
                }));
                return [3 /*break*/, 4];
            case 3:
                e_17 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/get_event/:eventId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var event, e_18;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getEvent(req.params.eventId)];
            case 1:
                event = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Evento consultado exitosamente",
                    result: event,
                }));
                return [3 /*break*/, 3];
            case 2:
                e_18 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/get_events", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var events, e_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getEvents()];
            case 1:
                events = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Eventos consultados exitosamente",
                    result: events,
                }));
                return [3 /*break*/, 3];
            case 2:
                e_19 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Ocurrió un error inesperado, intente de nuevo",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
