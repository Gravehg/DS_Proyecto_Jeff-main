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
exports.PublicationAdmin = void 0;
var PublicationDAO_1 = require("../daos/PublicationDAO");
var fs = require("fs");
var PublicationAdmin = /** @class */ (function () {
    function PublicationAdmin() {
        this.publicationDAO = new PublicationDAO_1.PublicationDAO();
    }
    // Obtiene una publicación por su Id
    PublicationAdmin.prototype.getPublication = function (publicationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationDAO.getPublication(publicationId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Obtiene todas las publicaciones registradas
    PublicationAdmin.prototype.getPublications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationDAO.getPublications()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Obtiene todas las publicaciones de una categoría
    PublicationAdmin.prototype.getPublicationsByCategory = function (categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationDAO.getPublicationsByCategory(categoryId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Obtiene todas las publicaciones de un conjunto de palabras clave
    PublicationAdmin.prototype.getPublicationsByTags = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationDAO.getPublicationsByTags(tags)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Registra una publicación
    PublicationAdmin.prototype.registerPublication = function (publication) {
        return __awaiter(this, void 0, void 0, function () {
            var publicationId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicationDAO.registerPublication(publication)];
                    case 1:
                        publicationId = _a.sent();
                        // Guardamos la foto en el sistema de archivos
                        return [4 /*yield*/, fs.renameSync(publication.getPhoto(), "photos/publications/" + publicationId + ".png")];
                    case 2:
                        // Guardamos la foto en el sistema de archivos
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Actualiza una publicación
    PublicationAdmin.prototype.updatePublication = function (publication) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(publication.getPhoto() !== "")) return [3 /*break*/, 3];
                        // Eliminamos la foto anterior
                        return [4 /*yield*/, fs.unlink("photos/publications/" + publication.getID() + ".png", function () { })];
                    case 1:
                        // Eliminamos la foto anterior
                        _a.sent();
                        // Guardamos la nueva foto
                        return [4 /*yield*/, fs.renameSync(publication.getPhoto(), "photos/publications/" + publication.getID() + ".png")];
                    case 2:
                        // Guardamos la nueva foto
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.publicationDAO.updatePublication(publication)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Elimina una publicación por su Id
    PublicationAdmin.prototype.deletePublication = function (publicationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.unlink("photos/publications/" + publicationId + ".png", function () { })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.publicationDAO.deletePublication(publicationId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PublicationAdmin;
}());
exports.PublicationAdmin = PublicationAdmin;
