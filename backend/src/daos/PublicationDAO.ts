import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Publication from "../schemas/publicationS";
import { Publication as PublicationModel } from "../models/Publication";

class PublicationDAO {
  constructor() {}

  // Retorna una publicacion por su Id
  public async getPublication(publicationId: string) {
    const publication = await Publication.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(publicationId),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
    ]);
    return publication[0];
  }

  // Retorna todas las publicaciones registradas
  public async getPublications() {
    return await Publication.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
    ]);
  }

  // Retorna todas las publicaciones que pertenecen a una categoría
  public async getPublicationsByCategory(categoryId: string) {
    return await Publication.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: {
          $or: [
            { categoryId: new ObjectId(categoryId) },
            { "category.fatherCategory": categoryId },
          ],
        },
      },
    ]);
  }

  // Retorna todas las publicaciones que tengan al menos una palabra clave en los tags enviados
  public async getPublicationsByTags(tags: string[]) {
    return await Publication.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: {
          tags: {
            $in: tags,
          },
        },
      },
    ]).collation({ locale: "en", strength: 1 });
  }

  // Registra una publicación
  public async registerPublication(publicationToRegister: PublicationModel) {
    const publication = new Publication({
      categoryId: publicationToRegister.getCategoryID(),
      date: new Date(),
      description: publicationToRegister.getDescription(),
      photo: "TEMPORAL",
      tags: publicationToRegister.getTags(),
    });

    const result = await publication.save();

    // Actualizamos la ruta de la foto a la del sistema de archivos
    await Publication.updateOne(
      { _id: result._id },
      { photo: "/photos/publications/" + result._id + ".png" }
    );
    return result._id;
  }

  // Actualiza una publicación
  public async updatePublication(publicationToUpdate: PublicationModel) {
    return await Publication.updateOne(
      { _id: publicationToUpdate.getID() },
      {
        categoryId: publicationToUpdate.getCategoryID(),
        description: publicationToUpdate.getDescription(),
        tags: publicationToUpdate.getTags(),
      }
    );
  }

  // Elimina una publicacion por su id
  public async deletePublication(publicationId: string) {
    return await Publication.deleteOne({ _id: publicationId });
  }
}

export { PublicationDAO };
