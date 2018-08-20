var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("*****************************INVENTORY********************************")
        for (i = 0; i < res.length; i++) {
            console.log('____________________________________________________')
            console.log('Product ID : ' + res[i].item_id);
            console.log('Product : ' + res[i].product_name);
            console.log('Department : ' + res[i].department_name);
            console.log('Price : ' + res[i].price);
            console.log('Stock Quantity : ' + res[i].stock_quantity);
            console.log('____________________________________________________')
        }
        orderItem();
    })
}

function validation(value) {
    if (isNaN(value) === false) {
        return true;
    } else {
        return 'Enter a number';
    }
}

function orderItem() {
    inquirer.prompt([
        {
            name: 'purchase',
            type: 'input',
            message: 'Input ID of the product you wish to purchase (Enter a number)',
            validate: validation
        },
        {
            name: 'amount',
            type: 'input',
            message: 'Input the amount you wish to purchase (Enter a number)',
            validate: validation
        }
    ])
        .then(function (answers) {
            console.log('____________________________________________________')
            let queryOne = "SELECT * FROM products WHERE ? ";
            connection.query(queryOne, {item_id:answers.purchase}, function (err, res) {
                if (err) throw err;
                if (answers.amount > res[0].stock_quantity) {
                    console.log('Sorry! We do not have enough stock to fulfill your request.');
                    console.log('____________________________________________________')
                } else {
                    let stock = res[0].stock_quantity - answers.amount;
                    let totalCost = res[0].price * answers.amount;
                    let query = "UPDATE products SET stock_quantity = " + stock + " WHERE item_id = " + answers.purchase;

                    connection.query(query, function (err, res) {
                        if (err) throw err;
                    })
                    console.log("Your order: " + res[0].product_name + " | $" + res[0].price);
                    console.log("Your Order has been fulfilled! The total cost is $" + parseFloat(totalCost).toFixed(2));
                    console.log('____________________________________________________')
                }
                connection.end();
            })
        })
}
