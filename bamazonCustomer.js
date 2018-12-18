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
            
            var id = parseInt(answer.productID);
            var amount = parseInt(answer.unitAmount);
            var query = "SELECT product_name, stock_quantity, price FROM products WHERE ?";
            connection.query(query, { item_id: id }, function(err, res){
                var inventory = res[0].stock_quantity;
                console.log(`Product requested: ${res[0].product_name}`);
                console.log(`Amount requested: ${answer.unitAmount}`);
                if (amount >= inventory) {
                    console.log(`Item out of stock! Try again!\n\n`);
                    displayProducts();
                } else {
                    console.log(`You have purchased ${res[0].product_name}`)
                    var cost = parseFloat(amount * res[0].price).toFixed(2);
                    console.log(`Total cost: ${cost}`);
                    var newInventory = inventory - amount
                    console.log(`New: ${newInventory}`);
                    function updateQuantity() {
                       
                        var query = connection.query("UPDATE products SET ? WHERE?",
                        [
                            {
                                stock_quantity: newInventory
                            },
                            {
                                item_id: id
                            }
                        ],
                        function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " product updated\n");
                            }
                        );
                        
                    }
                    updateQuantity();
                    console.log(`Make another purchase!`);
                    displayProducts();
                }
                
            });
        });
}

