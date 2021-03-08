const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./src/models");
db.sequelize.sync();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const webRoutes = require('./src/routes/web');
app.use(webRoutes);

require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/restaurant.routes')(app);

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
