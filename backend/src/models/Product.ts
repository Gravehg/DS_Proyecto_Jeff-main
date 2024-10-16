import { Viewable } from "./Viewable";

class Product extends Viewable {
  private productId: string | null;
  private name: string;
  private units: number;
  private price: number;

  constructor(
    description: string,
    photo: string,
    name: string,
    units: number,
    price: number,
    productId?: string
  ) {
    super(photo, description);
    this.productId = productId;
    this.name = name;
    this.units = units;
    this.price = price;
  }

  getID(): string {
    return this.productId;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getUnits(): number {
    return this.units;
  }

  getPrice(): number {
    return this.price;
  }

  getPhoto(): string {
    return this.photo;
  }

  setId(newId: string) {
    this.productId = newId;
  }

  setName(newName: string) {
    this.name = newName;
  }

  setDescription(newDescription: string) {
    this.description = newDescription;
  }

  setUnits(newUnits: number) {
    this.units = newUnits;
  }

  setPrice(newPrice: number) {
    this.price = newPrice;
  }

  setPhoto(newPhoto: string) {
    this.photo = newPhoto;
  }
}

export { Product };
