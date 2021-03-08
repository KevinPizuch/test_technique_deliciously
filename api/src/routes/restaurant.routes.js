const controller = require("../controllers/restaurant.controller");

module.exports = function(app){
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/restaurants", controller.findAll);
  app.get("/restaurants/names", controller.findAllNames);
  app.get("/restaurants/name", controller.findOne);
  app.post("/updateRestaurant", controller.updateRestaurant)
};
