var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadID + "\n");
    displayProducts();
});

function displayProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(`ITEMS FOR SALE:\n-------------------------------------------------`);
        for (var i= 0; i < res.length; i++) {
            console.log(`Id: ${res[i].item_id}|| Product Name: ${res[i].product_name}|| Price: $${res[i].price}`);
        }
    });
}