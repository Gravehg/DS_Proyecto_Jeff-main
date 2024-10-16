var Order = /** @class */ (function () {
    function Order(clientRef, orderDate, address, price, photoOfPayment, lineProducts, state, orderId, deliveryDate) {
        this.orderId = orderId;
        this.clientRef = clientRef;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
        this.address = address;
        this.price = price;
        this.photoOfPayment = photoOfPayment;
        this.lineProducts = lineProducts;
        this.state = state;
    }
    Order.prototype.getID = function () {
        return this.orderId;
    };
    Order.prototype.getClientRef = function () {
        return this.clientRef;
    };
    Order.prototype.getOrderDate = function () {
        return this.orderDate;
    };
    Order.prototype.getDeliveryDate = function () {
        return this.deliveryDate;
    };
    Order.prototype.getAddress = function () {
        return this.address;
    };
    Order.prototype.getPrice = function () {
        return this.price;
    };
    Order.prototype.getPhoto = function () {
        return this.photoOfPayment;
    };
    Order.prototype.getLineProducts = function () {
        return this.lineProducts;
    };
    Order.prototype.getState = function () {
        return this.state;
    };
    Order.prototype.setID = function (newId) {
        this.orderId = newId;
    };
    Order.prototype.setClient = function (newClient) {
        this.clientRef = newClient;
    };
    Order.prototype.setOrderDate = function (newOrderDate) {
        this.orderDate = newOrderDate;
    };
    Order.prototype.setDeliveryDate = function (newDeliveryDate) {
        this.deliveryDate = newDeliveryDate;
    };
    Order.prototype.setAddress = function (newAddress) {
        this.address = newAddress;
    };
    Order.prototype.setPrice = function (newPrice) {
        this.price = newPrice;
    };
    Order.prototype.setPhoto = function (newPhoto) {
        this.photoOfPayment = newPhoto;
    };
    Order.prototype.setLineProducts = function (newLines) {
        this.lineProducts = newLines;
    };
    Order.prototype.setState = function (newState) {
        this.state = newState;
    };
    return Order;
}());
