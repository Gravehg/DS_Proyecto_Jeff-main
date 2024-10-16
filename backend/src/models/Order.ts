class Order {
  private orderId: string;
  private clientRef: string;
  private orderDate: Date;
  private deliveryDate: any;
  private address: string;
  private price: number;
  private photoOfPayment: string;
  private lineProducts: ProductLine[];
  private state: number;

  constructor(
    clientRef: string,
    orderDate: Date,
    address: string,
    price: number,
    photoOfPayment: string,
    lineProducts: ProductLine[],
    state: number,
    orderId?: string,
    deliveryDate?: Date
  ) {
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

  getID(): string {
    return this.orderId;
  }

  getClientRef(): string {
    return this.clientRef;
  }

  getOrderDate(): Date {
    return this.orderDate;
  }

  getDeliveryDate(): any {
    return this.deliveryDate;
  }

  getAddress(): string {
    return this.address;
  }

  getPrice(): number {
    return this.price;
  }

  getPhoto(): string {
    return this.photoOfPayment;
  }

  getLineProducts(): ProductLine[] {
    return this.lineProducts;
  }

  getState(): number {
    return this.state;
  }

  setID(newId: string) {
    this.orderId = newId;
  }

  setClient(newClient: string) {
    this.clientRef = newClient;
  }

  setOrderDate(newOrderDate: Date) {
    this.orderDate = newOrderDate;
  }

  setDeliveryDate(newDeliveryDate: any) {
    this.deliveryDate = newDeliveryDate;
  }

  setAddress(newAddress: string) {
    this.address = newAddress;
  }

  setPrice(newPrice: number) {
    this.price = newPrice;
  }

  setPhoto(newPhoto: string) {
    this.photoOfPayment = newPhoto;
  }

  setLineProducts(newLines: ProductLine[]) {
    this.lineProducts = newLines;
  }

  setState(newState: number) {
    this.state = newState;
  }
}
