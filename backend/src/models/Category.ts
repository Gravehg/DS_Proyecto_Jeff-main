class Category {
  private categoryId: string | null;
  private name: string;
  private fatherCategory: string | null;
  private subCategories: Category[];

  constructor(
    name: string,
    fatherCategory?: string,
    subCategories?: Category[],
    categoryId?: string
  ) {
    this.categoryId = categoryId;
    this.name = name;
    this.fatherCategory = fatherCategory;
    this.subCategories = subCategories;
  }

  getID(): string {
    return this.categoryId;
  }

  getName(): string {
    return this.name;
  }

  getFatherCategory(): string {
    return this.fatherCategory;
  }

  getSubCategories(): Category[] {
    return this.subCategories;
  }

  setId(newId: string) {
    this.categoryId = newId;
  }

  setName(newName: string) {
    this.name = newName;
  }

  setFatherCategory(newFatherCategory: string) {
    this.fatherCategory = newFatherCategory;
  }

  setSubcategories(newSubcategories: Category[]) {
    this.subCategories = newSubcategories;
  }
}
