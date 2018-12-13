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
                console.log(`Id: ${res[i].item_id}|| Product Name: ${res[i].product_name}|| Department: ${res[i].department_name} || Price: $${res[i].price}\n`);
            }   
        
        purchase();
    });
}

function purchase() {
    inquirer
        .prompt([{
            name: "productID",
            type: "input",
            message: "Please enter the ID of the item you would like to purchase."
        },

        {
            name: "unitAmount",
            type: "input",
            message: "How many units would you like to buy?"
        }
    ])
        .then(function(answer) {
            console.log(`Product: ${answer.productID}`);
            console.log(`Amount: ${answer.unitAmount}`);
            var id = parseInt(answer.productID);
            var amount = answer.unitAmount;
            var query = "SELECT stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: id }, function(err, res){
                var inventory = res[0].stock_quantity;
                console.log(inventory);
                if (amount <= inventory) {
                    console.log(`You may purchase this item!`)
                } else {
                    console.log(`Item out of stock! Try again!`)
                }
                
            });
        })
}