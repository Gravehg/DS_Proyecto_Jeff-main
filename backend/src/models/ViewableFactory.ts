import { Publication } from "./Publication";
import { Product } from "./Product";

class ViewableFactory {
  public createProduct(
    name: string,
    description: string,
    units: number,
    price: number,
    photo: string,
    productId?: string
  ) {
    const product = new Product(
      description,
      photo,
      name,
      units,
      price,
      productId
    );
    return product;
  }

  public createPublication(
    description: string,
    tags: string,
    categoryId: string,
    photoPath: string,
    publicationId?: string
  ) {
    // Tomamos el string de palabras clave y generamos una lista con las palabras
    // Nota: las palabras se separan por coma
    const keywords = tags.split(",");
    // Quitamos los espacios en blanco al inicio y al final de cada palabra
    const trimmedKeywords = keywords.map((keyword) => keyword.trim());

    const publication = new Publication(
      categoryId,
      new Date(),
      description,
      photoPath,
      trimmedKeywords,
      publicationId
    );

    return publication;
  }

  //Falta implementar ---> Falta el enum para ver que tipo es
  public getViewable() {}
}

export { ViewableFactory };
