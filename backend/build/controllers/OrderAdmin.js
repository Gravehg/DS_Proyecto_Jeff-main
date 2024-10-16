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
exports.OrderAdmin = void 0;
var OrderDAO_1 = require("../daos/OrderDAO");
var ProductDAO_1 = require("../daos/ProductDAO");
var Notification_1 = require("../models/Notification");
var date_fns_1 = require("date-fns");
var CalendarEvent_1 = require("../models/CalendarEvent");
var DecoratedCalendarEvent_1 = require("../models/DecoratedCalendarEvent");
var CalendarAdmin_1 = require("./CalendarAdmin");
var exceptions_1 = require("../exceptions/exceptions");
var OrderAdmin = /** @class */ (function () {
    function OrderAdmin() {
        this.productDAO = new ProductDAO_1.ProductDAO();
        this.orderDAO = new OrderDAO_1.OrderDAO();
        this.suscribers = [];
        this.calendarAdmin = new CalendarAdmin_1.CalendarAdmin();
    }
    // Obtiene todos los pedidos registrados
    OrderAdmin.prototype.getOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDAO.getOrders()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Obtiene el detalle de un pedido
    OrderAdmin.prototype.getOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDAO.getDetail(orderId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Obtiene todos los pedidos de un usuario
    OrderAdmin.prototype.getUserOrders = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDAO.getOrdersUser(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Actualiza la fecha de envío de un pedido
    OrderAdmin.prototype.setDeliveryDate = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var today, deliveryDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        today = (0, date_fns_1.startOfDay)(new Date());
                        deliveryDate = (0, date_fns_1.startOfDay)(new Date());
                        // Calculamos la fecha de envía al martes, jueves o sábado más inmediado
                        switch ((0, date_fns_1.getDay)(today)) {
                            case 0: // Domingo
                                deliveryDate = (0, date_fns_1.addDays)(deliveryDate, 2);
                                break;
                            case 1: // Lunes
                                deliveryDate = (0, date_fns_1.addDays)(deliveryDate, 1);
                                break;
                            case 2: // Martes
                                deliveryDate = (0, date_fns_1.addDays)(deliveryDate, 2);
                                break;
                            case 3: // Miércoles
                                deliveryDate = (0, date_fns_1.addDays)(deliveryDate, 1);
                                break;
                            case 4: // Jueves
                                deliveryDate = (0, date_fns_1.addDays)(deliveryDate, 2);
                                break;
                            case 5: // Viernes
                                deliveryDate = (0, date_fns_1.addDays)(deliveryDate, 1);
                                break;
                            case 6: // Sábado
                                deliveryDate = (0, date_fns_1.addDays)(deliveryDate, 3);
                                break;
                        }
                        // La hora por defecto de entrega es a las 8 de la mañana
                        deliveryDate.setHours(8, 0, 0, 0);
                        return [4 /*yield*/, this.orderDAO.setDeliveryDate(orderId, deliveryDate)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Cambia el estado de un pedido
    OrderAdmin.prototype.setOrderState = function (orderId, state) {
        return __awaiter(this, void 0, void 0, function () {
            var order, notification, baseEvent, orderIdField, orderClientNameField, productsString, i, product, orderProductsField, orderAddressField, orderPriceField, order, notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDAO.changeOrderState(orderId, state)];
                    case 1:
                        _a.sent();
                        if (!(state === 2)) return [3 /*break*/, 4];
                        // Actualizamos fecha de entrega
                        return [4 /*yield*/, this.setDeliveryDate(orderId)];
                    case 2:
                        // Actualizamos fecha de entrega
                        _a.sent();
                        return [4 /*yield*/, this.getOrder(orderId)];
                    case 3:
                        order = _a.sent();
                        notification = new Notification_1.Notification(new Date(), "PEDIDO APROBADO", "Su pedido con el ID ".concat(orderId, " ha sido aprobado y ser\u00E1 enviado el d\u00EDa ").concat(order.deliveryDate.toLocaleDateString()), order.clientRef);
                        // Generar la notificación al usuario
                        this.notify(notification);
                        baseEvent = new CalendarEvent_1.CalendarEvent(order.deliveryDate, 1, "Preparar los productos y empaque del pedido", "ENTREGA PEDIDO");
                        orderIdField = new DecoratedCalendarEvent_1.DecoratedCalendarEvent(baseEvent, "ID Pedido", orderId);
                        orderClientNameField = new DecoratedCalendarEvent_1.DecoratedCalendarEvent(orderIdField, "Nombre", order.userInfo.name);
                        productsString = "";
                        for (i = 0; i < order.lineProducts.length; i++) {
                            product = order.lineProducts[i];
                            productsString += "Nombre: ".concat(product.name, " Unidades: ").concat(product.units, " Precio: ").concat(product.price, " \n");
                        }
                        orderProductsField = new DecoratedCalendarEvent_1.DecoratedCalendarEvent(orderClientNameField, "Productos", productsString);
                        orderAddressField = new DecoratedCalendarEvent_1.DecoratedCalendarEvent(orderProductsField, "Dirección", order.address);
                        orderPriceField = new DecoratedCalendarEvent_1.DecoratedCalendarEvent(orderAddressField, "Precio", "₡" + Intl.NumberFormat("en-US").format(order.price));
                        // Registramos el evento en la agenda
                        this.calendarAdmin.registerEvent(orderPriceField);
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(state === 4)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getOrder(orderId)];
                    case 5:
                        order = _a.sent();
                        notification = new Notification_1.Notification(new Date(), "PEDIDO CANCELADO", "Su pedido con el ID ".concat(orderId, " ha sido cancelado, ser\u00E1 contactado por la administradora en los siguientes d\u00EDas"), order.clientRef);
                        this.notify(notification);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Confirma un pedido
    // Valida que por cada producto del pedido hayan unidades suficientes o
    // que el producto exista en el inventario
    OrderAdmin.prototype.confirmOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var order, productLines, i, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDAO.getDetail(orderId)];
                    case 1:
                        order = _a.sent();
                        productLines = order.lineProducts;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < productLines.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.productDAO.getProduct(productLines[i].id)];
                    case 3:
                        product = _a.sent();
                        if (product == undefined) {
                            throw new exceptions_1.ProductDoesNotExists(productLines[i].name);
                        }
                        if (product.units - productLines[i].units < 0) {
                            throw new exceptions_1.ProductNotInStock(productLines[i].name);
                        }
                        // Actualizamos las unidades en stock
                        return [4 /*yield*/, this.productDAO.updateProductUnits(productLines[i].id, product.units - productLines[i].units)];
                    case 4:
                        // Actualizamos las unidades en stock
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [4 /*yield*/, this.setOrderState(orderId, 2)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderAdmin.prototype.suscribe = function (o) {
        this.suscribers.push(o);
    };
    OrderAdmin.prototype.unsuscribe = function (o) {
        var index = this.suscribers.indexOf(o);
        if (index !== -1) {
            this.suscribers.splice(index, 1);
        }
    };
    OrderAdmin.prototype.notify = function (n) {
        this.suscribers.forEach(function (suscriber) {
            suscriber.update(n);
        });
    };
    return OrderAdmin;
}());
exports.OrderAdmin = OrderAdmin;
