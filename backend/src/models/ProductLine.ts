class ProductLine {
  private productId: string;
  private name: string;
  private units: number;
  private price: number;

  constructor(productId: string, name: string, units: number, price: number) {
    this.productId = productId;
    this.name = name;
    this.units = units;
    this.price = price;
  }

  getName(): string {
    return this.name;
  }

  getUnits(): number {
    return this.units;
  }

  getPrice(): number {
    return this.price;
  }

  getProductId(): string {
    return this.productId;
  }

  setName(newName: string) {
    this.name = newName;
  }

  setUnits(newUnits: number) {
    this.units = newUnits;
  }

  setPrice(newPrice: number) {
    this.price = newPrice;
  }
}
