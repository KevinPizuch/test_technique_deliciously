const Restaurant = require("../models/restaurant.model.js");
const url = require('url');

exports.findAll = (req, res) => {
  Restaurant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    else res.send(data);
  });
};

exports.findAllNames = (req, res) => {
  Restaurant.getAllNames((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurend while retrieving restaurants names."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Restaurant.getName(url.parse(req.url,true).query.name , (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurend while retrieving restaurants names."
      });
    else res.send(data);
  });
};

exports.updateRestaurant = (req, res) => {
  Restaurant.updateRestaurantContent(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurend while retrieving restaurants names."
      });
    else res.send(data);
  });
};

