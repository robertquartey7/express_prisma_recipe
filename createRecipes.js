import express from "express";
import createRecipesRoutes from "./controllers/recipeRoutes.js";
import userRouter from "./controllers/user.js";

export default async function createRecipes() {
  const app = express();
  app.use(express.json());

  app.use("/recipe", createRecipesRoutes());
  app.use("/user", userRouter());

  return app;
}
