const sql = require("./db.js");
const url = require('url');


const Restaurant = function(restaurant){
	this.name = restaurant.name;
};

Restaurant.getAll = result => {
  sql.query("SELECT * FROM Restaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("restaurants: ", res);
    result(null, res);
  });
};

Restaurant.getAllNames = result => {
  sql.query("SELECT name FROM Restaurant", (err, res) => {
    if (err){
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("restaurants names : ", res);
    result(null, res);
  });
};

Restaurant.getName = (name,result) => {
  sql.query(`SELECT * FROM Restaurant WHERE name="${name}"` , (err, res) => {
    if (err){
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("restaurants names : ", res);
    result(null, res[0]);
  });
};


Restaurant.updateRestaurantContent = (content,result) => {
  sql.query(`UPDATE Restaurant SET name="${content.name}", 
    type="${content.type}", adress="${content.adress}", town="${content.town}",
    price=${content.price}, mainPicture="${content.mainPicture}" WHERE id=${content.id}` , (err, res) => {
    if (err){
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res[0]);
  });
};

module.exports = Restaurant;
