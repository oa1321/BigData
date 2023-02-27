const express = require("express");
const path = require('path')
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './views/public')))
app.set('view engine', 'ejs')

const dashboardroute = require("./routers/dashboard")
const searchroute = require("./routers/search")
const analyzeroute = require("./routers/analyze")

app.use("/", dashboardroute);
app.use("/search", searchroute);
app.use("/analyze", analyzeroute);


const server = express()
  .use(app)
  .listen(PORT, () => {
    console.log(`Listening Socket on http://localhost:3000`)
  });