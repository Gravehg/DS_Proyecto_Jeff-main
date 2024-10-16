"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publication = void 0;
var Viewable_1 = require("./Viewable");
var Publication = /** @class */ (function (_super) {
    __extends(Publication, _super);
    function Publication(categoryId, date, description, photo, tags, publicationId) {
        var _this = _super.call(this, photo, description) || this;
        _this.publicationId = publicationId || null;
        _this.categoryId = categoryId;
        _this.date = date;
        _this.tags = tags;
        return _this;
    }
    Publication.prototype.getID = function () {
        return this.publicationId;
    };
    Publication.prototype.getCategoryID = function () {
        return this.categoryId;
    };
    Publication.prototype.getDate = function () {
        return this.date;
    };
    Publication.prototype.getDescription = function () {
        return this.description;
    };
    Publication.prototype.getPhoto = function () {
        return this.photo;
    };
    Publication.prototype.getTags = function () {
        return this.tags;
    };
    Publication.prototype.setID = function (newId) {
        this.publicationId = newId;
    };
    Publication.prototype.setCategoryID = function (newCategoryId) {
        this.categoryId = newCategoryId;
    };
    Publication.prototype.setDate = function (newDate) {
        this.date = newDate;
    };
    Publication.prototype.setDescription = function (newDescription) {
        this.description = newDescription;
    };
    Publication.prototype.setPhoto = function (newPhoto) {
        this.photo = newPhoto;
    };
    Publication.prototype.setTags = function (newTags) {
        this.tags = newTags;
    };
    return Publication;
}(Viewable_1.Viewable));
exports.Publication = Publication;
