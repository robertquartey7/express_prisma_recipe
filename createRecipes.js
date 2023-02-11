import express from 'express'
import createRecipesRoutes from './controllers/recipeRoutes.js'



export default async function createRecipes(){

const app = express()
app.use(express.json())


app.use('/recipe', createRecipesRoutes())


return app
}