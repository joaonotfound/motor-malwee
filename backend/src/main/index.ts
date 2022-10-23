import { setupRoutes } from "./config";
import { makeApp } from "./factory/app";
import * as express from 'express'

async function main(){
  const app = makeApp()
  app.use(express.json())  
  await setupRoutes(app)
  app.listen(5000, () => {
    console.log('listening on localhost:5000')
  })
}

main()