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
exports.getSubCategories = exports.registerSubCategory = exports.deleteCategory = exports.getCategories = exports.editCategory = exports.registerCategory = void 0;
var categoryDAO_1 = require("../dao_controllers/categoryDAO");
function registerCategory(name) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, categoryDAO_1.getCategoryByName)(name)];
                case 1:
                    result = _a.sent();
                    if (!result) return [3 /*break*/, 2];
                    return [2 /*return*/, {
                            error: true,
                            message: "Ya se encuentra registrada una categoría con ese nombre",
                        }];
                case 2: return [4 /*yield*/, (0, categoryDAO_1.registerCategory)(name)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, {
                            error: false,
                            message: "Categoría creada exitosamente",
                        }];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    return [2 /*return*/, {
                            error: true,
                            message: "Ocurrió un error inesperado, intente de nuevo",
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.registerCategory = registerCategory;
function editCategory(id_category, newName) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, categoryDAO_1.getCategoryByName)(newName)];
                case 1:
                    result = _a.sent();
                    if (!result) return [3 /*break*/, 2];
                    return [2 /*return*/, {
                            error: true,
                            message: "Ya existe una categoría con el nombre elegido",
                        }];
                case 2: return [4 /*yield*/, (0, categoryDAO_1.editCategory)(id_category, newName)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, {
                            error: false,
                            message: "Se ha cambiado el nombre de la categoría con éxito",
                        }];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    return [2 /*return*/, {
                            error: true,
                            message: "Ocurrió un error inesperado, intente de nuevo",
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.editCategory = editCategory;
function getCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, categoryDAO_1.getCategories)()];
                case 1:
                    result = _a.sent();
                    if (result) {
                        return [2 /*return*/, {
                                error: false,
                                message: "Se han consultado todas las categorías exitosamente",
                                result: result,
                            }];
                    }
                    else {
                        return [2 /*return*/, {
                                error: true,
                                message: "No se han encontrado categorías",
                            }];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    return [2 /*return*/, {
                            error: true,
                            message: "Ocurrió un error inesperado, intente de nuevo",
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCategories = getCategories;
function deleteCategory(id_category) {
    return __awaiter(this, void 0, void 0, function () {
        var hasSubCategories, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, categoryDAO_1.getSubCategories)(id_category)];
                case 1:
                    hasSubCategories = _a.sent();
                    if (hasSubCategories.length > 0) {
                        return [2 /*return*/, {
                                error: true,
                                message: "No se puede eliminar la categoría ya que tiene subcategorías presentes",
                            }];
                    }
                    return [4 /*yield*/, (0, categoryDAO_1.deleteCategory)(id_category)];
                case 2:
                    result = _a.sent();
                    if (result.deletedCount == 1) {
                        return [2 /*return*/, {
                                error: false,
                                message: "Se ha eliminado exitosamente la categoría",
                            }];
                    }
                    else {
                        return [2 /*return*/, {
                                error: true,
                                message: "No se ha eliminado exitosamente la categoría",
                            }];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    return [2 /*return*/, {
                            error: true,
                            message: "Ocurrió un error inesperado, intente de nuevo",
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteCategory = deleteCategory;
function registerSubCategory(name, fatherCategory) {
    return __awaiter(this, void 0, void 0, function () {
        var existsFather, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, categoryDAO_1.getCategoryByID)(fatherCategory)];
                case 1:
                    existsFather = _a.sent();
                    if (!existsFather) {
                        return [2 /*return*/, {
                                error: true,
                                message: "No existe la categoría padre",
                            }];
                    }
                    return [4 /*yield*/, (0, categoryDAO_1.getCategoryByName)(name)];
                case 2:
                    result = _a.sent();
                    if (!result) return [3 /*break*/, 3];
                    return [2 /*return*/, {
                            error: true,
                            message: "Ya existe una categoría con ese nombre",
                        }];
                case 3: return [4 /*yield*/, (0, categoryDAO_1.registerSubCategory)(name, fatherCategory)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, {
                            error: false,
                            message: "Se ha registrado exitosamente la subcategoría",
                        }];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_5 = _a.sent();
                    return [2 /*return*/, {
                            error: true,
                            message: "Ocurrió un error inesperado, intente de nuevo",
                        }];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.registerSubCategory = registerSubCategory;
function getSubCategories(fatherCategory) {
    return __awaiter(this, void 0, void 0, function () {
        var existsFather, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, categoryDAO_1.getCategoryByID)(fatherCategory)];
                case 1:
                    existsFather = _a.sent();
                    if (!!existsFather) return [3 /*break*/, 2];
                    return [2 /*return*/, {
                            error: true,
                            message: "No existe la categoría padre seleccionada",
                        }];
                case 2: return [4 /*yield*/, (0, categoryDAO_1.getSubCategories)(fatherCategory)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, {
                            error: false,
                            message: "Se consultaron exitosamente todas las subcategorías",
                            result: result,
                        }];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_6 = _a.sent();
                    return [2 /*return*/, {
                            error: true,
                            message: "Ocurrió un error inesperado, intente de nuevo",
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getSubCategories = getSubCategories;
