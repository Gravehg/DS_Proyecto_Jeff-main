import { PublicationDAO } from "../daos/PublicationDAO";
import { Publication } from "../models/Publication";
const fs = require("fs");

class PublicationAdmin {
  private publicationDAO: PublicationDAO = new PublicationDAO();
  constructor() {}

  // Obtiene una publicación por su Id
  public async getPublication(publicationId: string) {
    return await this.publicationDAO.getPublication(publicationId);
  }

  // Obtiene todas las publicaciones registradas
  public async getPublications() {
    return await this.publicationDAO.getPublications();
  }

  // Obtiene todas las publicaciones de una categoría
  public async getPublicationsByCategory(categoryId: string) {
    return await this.publicationDAO.getPublicationsByCategory(categoryId);
  }

  // Obtiene todas las publicaciones de un conjunto de palabras clave
  public async getPublicationsByTags(tags: string[]) {
    return await this.publicationDAO.getPublicationsByTags(tags);
  }

  // Registra una publicación
  public async registerPublication(publication: Publication) {
    const publicationId = await this.publicationDAO.registerPublication(
      publication
    );
    // Guardamos la foto en el sistema de archivos
    await fs.renameSync(
      publication.getPhoto(),
      "photos/publications/" + publicationId + ".png"
    );
  }

  // Actualiza una publicación
  public async updatePublication(publication: Publication) {
    // Si hay una foto nueva
    if (publication.getPhoto() !== "") {
      // Eliminamos la foto anterior
      await fs.unlink(
        "photos/publications/" + publication.getID() + ".png",
        () => {}
      );
      // Guardamos la nueva foto
      await fs.renameSync(
        publication.getPhoto(),
        "photos/publications/" + publication.getID() + ".png"
      );
    }
    await this.publicationDAO.updatePublication(publication);
  }

  // Elimina una publicación por su Id
  public async deletePublication(publicationId: string) {
    await fs.unlink("photos/publications/" + publicationId + ".png", () => {});
    return await this.publicationDAO.deletePublication(publicationId);
  }
}

export { PublicationAdmin };
