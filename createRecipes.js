import express from "express";
import createRecipesRoutes from "./controllers/recipeRoutes.js";
import userRouter from "./controllers/user.js";
import setupJWTStrategy from "./controllers/auth/index.js";
import passport from "passport";

export default async function createRecipes() {
  const app = express();
  app.use(express.json());

  setupJWTStrategy(passport);
  app.use("/recipe", passport.authenticate('jwt', {
    session:false
  }), createRecipesRoutes());
  app.use("/auth", userRouter());

  return app;
}
