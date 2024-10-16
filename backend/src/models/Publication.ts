import { Viewable } from "./Viewable";

class Publication extends Viewable {
  publicationId: string | null;
  categoryId: string;
  date: Date | null;
  tags: string[];

  constructor(
    categoryId: string,
    date: Date,
    description: string,
    photo: string,
    tags: string[],
    publicationId?: string
  ) {
    super(photo, description);
    this.publicationId = publicationId || null;
    this.categoryId = categoryId;
    this.date = date;
    this.tags = tags;
  }

  getID(): string {
    return this.publicationId;
  }

  getCategoryID(): string {
    return this.categoryId;
  }

  getDate(): Date {
    return this.date;
  }

  getDescription(): string {
    return this.description;
  }

  getPhoto(): string {
    return this.photo;
  }

  getTags(): string[] {
    return this.tags;
  }

  setID(newId: string) {
    this.publicationId = newId;
  }

  setCategoryID(newCategoryId: string) {
    this.categoryId = newCategoryId;
  }

  setDate(newDate: Date) {
    this.date = newDate;
  }

  setDescription(newDescription: string) {
    this.description = newDescription;
  }

  setPhoto(newPhoto: string) {
    this.photo = newPhoto;
  }

  setTags(newTags: [string]) {
    this.tags = newTags;
  }
}

export { Publication };
