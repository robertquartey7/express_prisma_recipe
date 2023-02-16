import express from "express";
import { prisma } from "../db/index.js";

export default function createRecipesRoutes() {
  const router = express.Router();

  router.get("/", async (_req, res) => {
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
          name: req.body.name,
          description: req.body.description,
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

  router.get("/:userId/:recipeId", async function(req, res){
    try {
        const getRecipe = await prisma.recipe.findMany({
            where:{
                id:parseInt(req.params.recipeId),
                user:{
                    id:{
                        equals:parseInt(req.params.userId)
                    }
                }
                
            }
        })
        res.status(200).json({
            sucess: true,
            data: getRecipe
            
        })
    } catch (error) {
        console.log(error)
    }
   
})

  return router;
}
