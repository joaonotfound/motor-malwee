import { setupRoutes } from "./config/setup-routes";
import { makeApp } from "./factory/app";

const app = makeApp()
setupRoutes(app)
app.listen(5000, () => {
  console.log('listening on localhost:5000')
})