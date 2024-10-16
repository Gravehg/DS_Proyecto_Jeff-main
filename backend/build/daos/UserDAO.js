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
exports.UserDAO = void 0;
var userS_1 = __importDefault(require("../schemas/userS"));
var cartS_1 = __importDefault(require("../schemas/cartS"));
var EmailInUse = require("../exceptions/exceptions").EmailInUse;
var bcrypt = require("bcryptjs");
var UserDAO = /** @class */ (function () {
    function UserDAO() {
    }
    // Registra un usuario
    // Por defecto lo registra como cliente, NO COMO ADMINISTRADOR
    // Se encarga de encriptar la contraseña
    // Crea un carrito vacío para el usuario
    UserDAO.prototype.registerUser = function (userToRegister) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user, userRegistered, cart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(userToRegister.getPassword(), 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        user = new userS_1.default({
                            name: userToRegister.getName(),
                            email: userToRegister.getEmail(),
                            phone: userToRegister.getPhone(),
                            password: hashedPassword,
                            role: 1,
                        });
                        return [4 /*yield*/, user.save()];
                    case 2:
                        userRegistered = _a.sent();
                        cart = new cartS_1.default({ client: userRegistered._id, products: [] });
                        return [4 /*yield*/, cart.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, userRegistered];
                }
            });
        });
    };
    // Actualiza un usuario
    // Se encarga de encriptar la contraseña del usuario
    UserDAO.prototype.updateUser = function (userToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var checkUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByEmail(userToUpdate.getEmail())];
                    case 1:
                        checkUser = _a.sent();
                        // Verificamos que otro usuario no tenga el mismo correo
                        if (checkUser && checkUser._id != userToUpdate.getID()) {
                            throw new EmailInUse();
                        }
                        // Si hay una contraseña nueva, la actualizamos
                        if (userToUpdate.getPassword() != "") {
                            this.updatePassword(userToUpdate.getEmail(), userToUpdate.getPassword());
                        }
                        return [4 /*yield*/, userS_1.default.updateOne({ _id: userToUpdate.getID() }, {
                                name: userToUpdate.getName(),
                                email: userToUpdate.getEmail(),
                                phone: userToUpdate.getPhone(),
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Actualiza la contraseña de un usuario
    // Se encarga de encriptar la contraseña
    UserDAO.prototype.updatePassword = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, userS_1.default.updateOne({ email: email }, { password: hashedPassword })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Actualiza el código de recuperación de contraseña de un usuario
    UserDAO.prototype.updateRecoverCode = function (email, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userS_1.default.updateOne({ email: email }, { recoverCode: code })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Verifica si el código de recuperación ingresado por un usuario es igual al de la BD
    UserDAO.prototype.compareRecoverCode = function (email, code) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, user.recoverCode == code];
                }
            });
        });
    };
    // Retorna un usuario por id
    UserDAO.prototype.getUserByID = function (id) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    // Retorna un usuario por email
    UserDAO.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userS_1.default.findOne({ email: email })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Retorna un usuario por id pero no retorna la contraseña del usuario
    UserDAO.prototype.getUserNoPwd = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userS_1.default.findOne({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        if (user == null) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                role: user.role,
                            }];
                }
            });
        });
    };
    return UserDAO;
}());
exports.UserDAO = UserDAO;
