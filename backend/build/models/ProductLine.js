var ProductLine = /** @class */ (function () {
    function ProductLine(productId, name, units, price) {
        this.productId = productId;
        this.name = name;
        this.units = units;
        this.price = price;
    }
    ProductLine.prototype.getName = function () {
        return this.name;
    };
    ProductLine.prototype.getUnits = function () {
        return this.units;
    };
    ProductLine.prototype.getPrice = function () {
        return this.price;
    };
    ProductLine.prototype.getProductId = function () {
        return this.productId;
    };
    ProductLine.prototype.setName = function (newName) {
        this.name = newName;
    };
    ProductLine.prototype.setUnits = function (newUnits) {
        this.units = newUnits;
    };
    ProductLine.prototype.setPrice = function (newPrice) {
        this.price = newPrice;
    };
    return ProductLine;
}());
