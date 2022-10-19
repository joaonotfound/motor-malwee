import { setupRoutes } from "./config/setup-routes";
import { makeApp } from "./factory/app";

async function main(){
  const app = makeApp()
  await setupRoutes(app)
  app.listen(5000, () => {
    console.log('listening on localhost:5000')
  })
}

main()