const router = require("express").Router();
const multer = require("multer");
import { Request, Response } from "express";
import { Controller } from "../controllers/Controller";
import {
  ProductDoesNotExists,
  ProductNotInStock,
} from "../exceptions/exceptions";
const productUpload = multer({ dest: "photos/products" });
const publicationUpload = multer({ dest: "photos/publications" });
const controller = Controller.getInstance();

// Rutas de productos --------------------------------------------------------------------
router.post(
  "/register_product",
  productUpload.single("photo"),
  async (req: Request, res: Response) => {
    const { name, description, units, price } = req.body;
    const photoPath = req.file ? req.file.path : "";
    try {
      await controller.registerProduct(
        name,
        description,
        units,
        price,
        photoPath
      );
      res.send(
        JSON.stringify({
          error: false,
          message: "Producto registrado exitosamente",
        })
      );
    } catch (e) {
      res.send(
        JSON.stringify({
          error: true,
          message: "Ocurrió un error inesperado, intente de nuevo",
        })
      );
    }
  }
);

router.post("/delete_product/:id", async (req: Request, res: Response) => {
  try {
    await controller.deleteProduct(req.params.id);
    res.send(
      JSON.stringify({
        error: false,
        message: "Producto eliminado exitosamente",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.post(
  "/update_product",
  productUpload.single("photo"),
  async (req: Request, res: Response) => {
    const { productId, name, description, units, price } = req.body;
    const photoPath = req.file ? req.file.path : "";
    try {
      await controller.updateProduct(
        productId,
        name,
        description,
        units,
        price,
        photoPath
      );
      res.send(
        JSON.stringify({
          error: false,
          message: "Producto actualizado exitosamente",
        })
      );
    } catch (e) {
      res.send(
        JSON.stringify({
          error: true,
          message: "Ocurrió un error inesperado, intente de nuevo",
        })
      );
    }
  }
);

// Rutas de categorías -------------------------------------------------------------------

router.post("/register_category", async (req: Request, res: Response) => {
  const name = req.body.name;
  try {
    await controller.registerCategory(name);
    res.send({ error: false, message: "Categoría registrada exitosamente" });
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.post("/register_subcategory", async (req: Request, res: Response) => {
  const { name, fatherCategory } = req.body;
  try {
    await controller.registerSubcategory(name, fatherCategory);
    res.send({ error: false, message: "Subcategoría registrada exitosamente" });
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.post("/edit_category", async (req: Request, res: Response) => {
  try {
    const { name, categoryId } = req.body;
    await controller.updateCategory(categoryId, name);
    res.send({ error: false, message: "Categoría actualizada exitosamente" });
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.post("/delete_category", async (req: Request, res: Response) => {
  try {
    await controller.deleteCategory(req.body.categoryId);
    res.send(
      JSON.stringify({
        error: false,
        message: "Categoría eliminada exitosamente",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

// Rutas de publicaciones ----------------------------------------------------------------

router.post(
  "/register_publication",
  publicationUpload.single("photo"),
  async (req: Request, res: Response) => {
    try {
      const { description, keywords, categoryId } = req.body;
      const photoPath = req.file ? req.file.path : "";
      await controller.registerPublication(
        description,
        keywords,
        categoryId,
        photoPath
      );
      res.send(
        JSON.stringify({
          error: false,
          message: "Publicación registrada exitosamente",
        })
      );
    } catch (e) {
      res.send(
        JSON.stringify({
          error: true,
          message: "Ocurrió un error inesperado, intente de nuevo",
        })
      );
    }
  }
);

router.post(
  "/update_publication",
  publicationUpload.single("photo"),
  async (req: Request, res: Response) => {
    const { publicationId, description, tags, categoryId } = req.body;
    const photoPath = req.file ? req.file.path : "";
    try {
      await controller.updatePublication(
        publicationId,
        description,
        tags,
        categoryId,
        photoPath
      );
      res.send(
        JSON.stringify({
          error: false,
          message: "Publicación actualizada exitosamente",
        })
      );
    } catch (e) {
      res.send(
        JSON.stringify({
          error: true,
          message: "Ocurrió un error inesperado, intente de nuevo",
        })
      );
    }
  }
);

router.post("/delete_publication/:id", async (req: Request, res: Response) => {
  const publicationId = req.params.id;
  try {
    await controller.deletePublication(publicationId);
    res.send(
      JSON.stringify({
        error: false,
        message: "Publicación eliminada exitosamente",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

// Rutas de pedidos ----------------------------------------------------------------------

router.get("/get_ordes", async (req: Request, res: Response) => {
  try {
    const orders = await controller.getOrders();
    res.send(
      JSON.stringify({
        error: false,
        message: "Pedidos consultado exitosamente",
        result: orders,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.post("/set_order_state", async (req: Request, res: Response) => {
  const { orderId, newState } = req.body;
  try {
    await controller.setOrderState(orderId, newState);
    res.send(
      JSON.stringify({
        error: false,
        message: "Estado de pedido actualizado exitosamente",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.post("/confirm_order", async (req: Request, res: Response) => {
  const { orderId } = req.body;
  try {
    await controller.confirmOrder(orderId);
    res.send(
      JSON.stringify({
        error: false,
        message: "Pedido confirmado exitosamente",
      })
    );
  } catch (e) {
    let message = "Ocurrió un error inesperado, intente de nuevo";
    if (e instanceof ProductDoesNotExists) {
      message = e.message;
    }
    if (e instanceof ProductNotInStock) {
      message = e.message;
    }
    res.send(
      JSON.stringify({
        error: true,
        message: message,
      })
    );
  }
});

// Rutas de agenda -----------------------------------------------------------------------

router.post("/register_event", async (req: Request, res: Response) => {
  const { date, duration, description, type } = req.body;
  try {
    await controller.registerEvent(date, duration, description, type);
    res.send(
      JSON.stringify({
        error: false,
        message: "Evento registrado exitosamente",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.post("/event_overlaps", async (req: Request, res: Response) => {
  const { date, duration, description, type, eventId } = req.body;
  try {
    const result = await controller.overlaps(
      date,
      duration,
      description,
      type,
      eventId
    );
    res.send(
      JSON.stringify({
        error: false,
        message: "Traslape consultado exitosamente",
        result: result,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.post("/update_event", async (req: Request, res: Response) => {
  const { eventId, date, duration, description, type } = req.body;
  try {
    await controller.updateEvent(eventId, date, duration, description, type);
    res.send(
      JSON.stringify({
        error: false,
        message: "Evento actualizado exitosamente",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.post("/delete_event", async (req: Request, res: Response) => {
  const { eventId } = req.body;
  try {
    await controller.deleteEvent(eventId);
    res.send(
      JSON.stringify({
        error: false,
        message: "Evento eliminado exitosamente",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.get("/get_event/:eventId", async (req: Request, res: Response) => {
  try {
    const event = await controller.getEvent(req.params.eventId);
    res.send(
      JSON.stringify({
        error: false,
        message: "Evento consultado exitosamente",
        result: event,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.get("/get_events", async (req: Request, res: Response) => {
  try {
    const events = await controller.getEvents();
    res.send(
      JSON.stringify({
        error: false,
        message: "Eventos consultados exitosamente",
        result: events,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

module.exports = router;
