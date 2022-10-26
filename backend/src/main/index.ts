import { setupRoutes } from "./config";
import { makeApp } from "./factory/app";
import * as express from 'express'
import * as cors from 'cors'

async function main(){
  const app = makeApp()
  app.use(express.json())  
  app.use(cors({ origin: "*" }))
  await setupRoutes(app)
  app.listen(5000, () => {
    console.log('listening on localhost:5000')
  })
}

main()