const express = require("express");
const path = require('path')
const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, './views')))
app.set('view engine', 'ejs')

const redis_online = require("./routers/redis_router")

app.use("/", redis_online);

const server = express()
  .use(app)
  .listen(PORT, () => {
    console.log(`Listening Socket on http://localhost:${PORT}`)
  });