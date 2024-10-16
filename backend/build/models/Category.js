var Category = /** @class */ (function () {
    function Category(name, fatherCategory, subCategories, categoryId) {
        this.categoryId = categoryId;
        this.name = name;
        this.fatherCategory = fatherCategory;
        this.subCategories = subCategories;
    }
    Category.prototype.getID = function () {
        return this.categoryId;
    };
    Category.prototype.getName = function () {
        return this.name;
    };
    Category.prototype.getFatherCategory = function () {
        return this.fatherCategory;
    };
    Category.prototype.getSubCategories = function () {
        return this.subCategories;
    };
    Category.prototype.setId = function (newId) {
        this.categoryId = newId;
    };
    Category.prototype.setName = function (newName) {
        this.name = newName;
    };
    Category.prototype.setFatherCategory = function (newFatherCategory) {
        this.fatherCategory = newFatherCategory;
    };
    Category.prototype.setSubcategories = function (newSubcategories) {
        this.subCategories = newSubcategories;
    };
    return Category;
}());
