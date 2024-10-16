class Viewable {
  protected photo: string;
  protected description: string;

  constructor(photo: string, description: string) {
    this.description = description;
    this.photo = photo;
  }
}

export { Viewable };
