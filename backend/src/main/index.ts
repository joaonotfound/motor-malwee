import { setupRoutes } from "./config";
import { makeApp } from "./factory/app";

async function main(){
  const app = makeApp()
  await setupRoutes(app)
  app.listen(5000, () => {
    console.log('listening on localhost:5000')
  })
}

main()