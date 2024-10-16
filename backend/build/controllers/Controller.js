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
exports.Controller = void 0;
var CartAdmin_1 = require("./CartAdmin");
var UserAdmin_1 = require("./UserAdmin");
var PublicationAdmin_1 = require("./PublicationAdmin");
var ProductAdmin_1 = require("./ProductAdmin");
var OrderAdmin_1 = require("./OrderAdmin");
var CategoryAdmin_1 = require("./CategoryAdmin");
var Product_1 = require("../models/Product");
var ViewableFactory_1 = require("../models/ViewableFactory");
var User_1 = require("../models/User");
var CalendarAdmin_1 = require("./CalendarAdmin");
var NotificationAdmin_1 = require("./NotificationAdmin");
var CalendarEvent_1 = require("../models/CalendarEvent");
var Controller = /** @class */ (function () {
    function Controller() {
        this.viewableFactory = new ViewableFactory_1.ViewableFactory();
        this.publicationAdmin = new PublicationAdmin_1.PublicationAdmin();
        this.userAdmin = new UserAdmin_1.UserAdmin();
        this.orderAdmin = new OrderAdmin_1.OrderAdmin();
        this.categoryAdmin = new CategoryAdmin_1.CategoryAdmin();
        this.productAdmin = new ProductAdmin_1.ProductAdmin();
        this.cartAdmin = new CartAdmin_1.CartAdmin();
        this.calendarAdmin = new CalendarAdmin_1.CalendarAdmin();
        this.notificationAdmin = new NotificationAdmin_1.NotificationAdmin();
        // Susbribe el centro de notificaciones al centro de ordenes
        this.orderAdmin.suscribe(this.notificationAdmin);
    }
    Controller.getInstance = function () {
        if (!Controller.instance) {
            Controller.instance = new Controller();
        }
        return Controller.instance;
    };
    Controller.prototype.registerUser = function (name, email, phone, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new User_1.User(name, email, phone, password);
                        return [4 /*yield*/, this.userAdmin.registerUser(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Actualiza los datos de un usuario
    Controller.prototype.updateUser = function (userId, name, email, phone, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new User_1.User(name, email, phone, password);
                        user.setID(userId);
                        return [4 /*yield*/, this.userAdmin.updateUser(user)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Actualiza la contraseña de un usuario
    Controller.prototype.updatePassword = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userAdmin.updatePassword(email, password)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Actualiza el código de recuperación de contraseña de un usuario
    Controller.prototype.updateRecoverCode = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userAdmin.updateRecoverCode(email)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Verifica si existe el usuario con el email del parámetro
    Controller.prototype.userExists = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userAdmin.userExists(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Verifica si el código de recuperación ingresado por un usuario es igual al de la BD
    Controller.prototype.compareRecoverCode = function (email, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userAdmin.compareRecoverCode(email, code)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Funciones de carrito ----------------------------------------------------------------
    Controller.prototype.addProductToCart = function (userId, productId, units) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartAdmin.addProductToCart(userId, productId, units)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.deleteProductFromCart = function (userId, productId, units) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartAdmin.deleteProductFromCart(userId, productId, units)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getCart = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartAdmin.getCart(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.sendOrder = function (userId, address, totalPrice, photoPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartAdmin.sendOrder(userId, address, totalPrice, photoPath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Funciones de categorías -------------------------------------------------------------
    Controller.prototype.registerCategory = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryAdmin.registerCategory(name)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.updateCategory = function (categoryId, newName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryAdmin.editCategory(categoryId, newName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryAdmin.getCategories()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getCategory = function (categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryAdmin.getCategory(categoryId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getSubCategories = function (fatherCategory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryAdmin.getSubCategories(fatherCategory)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.deleteCategory = function (categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryAdmin.deleteCategory(categoryId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.registerSubcategory = function (name, fatherCategory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryAdmin.registerSubCategory(name, fatherCategory)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Funciones de publicaciones -----------------------------------------------------------
    Controller.prototype.getPublication = function (publicationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationAdmin.getPublication(publicationId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getPublications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationAdmin.getPublications()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getPublicationsByCategory = function (categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationAdmin.getPublicationsByCategory(categoryId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getPublicationsByTags = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationAdmin.getPublicationsByTags(tags)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.registerPublication = function (description, tags, categoryId, photoPath) {
        return __awaiter(this, void 0, void 0, function () {
            var publication;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        publication = this.viewableFactory.createPublication(description, tags, categoryId, photoPath);
                        return [4 /*yield*/, this.publicationAdmin.registerPublication(publication)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.updatePublication = function (publicationId, description, tags, categoryId, photoPath) {
        return __awaiter(this, void 0, void 0, function () {
            var publication;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        publication = this.viewableFactory.createPublication(description, tags, categoryId, photoPath, publicationId);
                        return [4 /*yield*/, this.publicationAdmin.updatePublication(publication)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.deletePublication = function (publicationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationAdmin.deletePublication(publicationId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Funciones de productos --------------------------------------------------------------
    Controller.prototype.registerProduct = function (name, description, units, price, photoPath) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = this.viewableFactory.createProduct(name, description, units, price, photoPath);
                        return [4 /*yield*/, this.productAdmin.registerProduct(product)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productAdmin.getProducts()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getProduct = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productAdmin.getProduct(productId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.deleteProduct = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productAdmin.deleteProduct(productId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.updateProduct = function (productId, name, description, units, price, photoPath) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = new Product_1.Product(description, photoPath, name, units, price, productId);
                        return [4 /*yield*/, this.productAdmin.updateProduct(product)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Funciones de pedidos ----------------------------------------------------------------
    Controller.prototype.getOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderAdmin.getOrders()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderAdmin.getOrder(orderId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getUserOrders = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderAdmin.getUserOrders(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.setOrderState = function (orderId, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderAdmin.setOrderState(orderId, state)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.confirmOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderAdmin.confirmOrder(orderId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Funciones de notificaciones ---------------------------------------------------------
    Controller.prototype.markAsRead = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationAdmin.markAsRead(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getUserNotifications = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationAdmin.getUserNotifications(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.unreadAmount = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationAdmin.unreadAmount(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Funciones de agenda -----------------------------------------------------------------
    Controller.prototype.registerEvent = function (date, duration, description, type) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event = new CalendarEvent_1.CalendarEvent(date, duration, description, type);
                        return [4 /*yield*/, this.calendarAdmin.registerEvent(event)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.updateEvent = function (eventId, date, duration, description, type) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event = new CalendarEvent_1.CalendarEvent(date, duration, description, type, eventId);
                        return [4 /*yield*/, this.calendarAdmin.updateEvent(event)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.deleteEvent = function (eventId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarAdmin.deleteEvent(eventId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getEvent = function (eventId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarAdmin.getEvent(eventId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarAdmin.getEvents()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.overlaps = function (date, duration, description, type, eventId) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event = new CalendarEvent_1.CalendarEvent(date, duration, description, type, eventId);
                        return [4 /*yield*/, this.calendarAdmin.overlaps(event)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.instance = null;
    return Controller;
}());
exports.Controller = Controller;
