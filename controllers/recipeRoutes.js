import express from "express";
import { prisma } from "../db/index.js";

export default function createRecipesRoutes() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const data = await prisma.recipes.findMany({
        include: {
          user: true,
        },
      });

      data &&
        res.status(200).json({
          sucess: true,
          data,
        });
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const recipeId = parseInt(req.params.id);

      const data = await prisma.recipes.findMany({
        where: {
          id: recipeId,
        },
      });

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/", async (req, res) => {
    // creating a user with a recipe

    try {
      await prisma.recipes.create({
        data: {
          content: req.body.content,
          userId: 2,
        },
      });

      res.status(201).json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      prisma.$disconnect();
    }
  });

  return router;
}
