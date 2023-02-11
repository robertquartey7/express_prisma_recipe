import createRecipes from "./createRecipes.js";


const server = await createRecipes()


server.listen(3000,()=>{

    console.log('running on port 3000')

    
})