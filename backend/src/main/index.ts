import * as express from 'express'
import cors from 'cors'

import { setupRoutes } from "./config";
import { makeApp } from "./factory/app";

async function main(){
  const app = makeApp()
  app.use(express.json())  
  app.use(cors({ origin: "*" }))
  await setupRoutes(app)
  app.listen(60, () => {
    console.log('listening on localhost:5000')
  })
}

main()