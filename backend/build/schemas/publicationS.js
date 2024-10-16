"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var publicationSchema = new mongoose_1.Schema({
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    tags: { type: [String], required: true }, //Collection
});
exports.default = mongoose_2.default.model("Publication", publicationSchema);
