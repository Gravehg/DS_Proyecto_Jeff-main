"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var notificationSchema = new mongoose_1.Schema({
    userRef: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, required: true },
});
exports.default = mongoose_2.default.model("Notification", notificationSchema);
