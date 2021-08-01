const express = require("express");
const routes = express.Router();

//connect to the database
const dbo = require("../db/conn");
// "SCHEMA"
// users : {"email" : "email", "password" : "password", "stocks" : [{company: company, ticker: ticker}]}}

// Add new user
routes.route("/adduser").post(async function (req, res) {
    console.log('adding user', req.body)
    let db_connect = dbo.getDb("Stock-Tracker");
    let filter = {email : req.body.email};

    let user = await db_connect
                .collection("users")
                .findOne(filter);
    console.log("register found: ", user)
    if (user) {
        res.send("User already exists")
    } else {
        let document = {
        email: req.body.email,
        password: req.body.password,
        stocks: [],
        };
        db_connect.collection("users").insertOne(document, function (err, res) {
        if (err) throw err;
        });
        res.send("Success, user added!");
    }
  });

// Authenticate user
routes.route("/authenticate").post(async function (req, res) {
    let db_connect = dbo.getDb("Stock-Tracker");
    let filter = {email : req.body.email};
    let user = await db_connect
                    .collection("users")
                    .findOne(filter)
    console.log("login found: ", user)
    if (user == null) {
        res.send("Invalid Login: User doesn't exist")
    } else {
        if (user["password"] == req.body.password) {
            res.send("Authenticated")

        } else {
            res.send("Invalid password")
        }
            }
        });

// Helper function to get user stocks
async function get_user_stocks(email) {
    let db_connect = dbo.getDb("Stock-Tracker");
    let query = { email : email };
    const result = await db_connect
                  .collection("users")
                  .findOne(query);
    if (result) {
        return result.stocks ? result.stocks : [];
    }
    else {
        return "Error: User not Found"
    }
}
  // Add new stock to user
routes.route("/add").post(async function (req, res) {
    console.log('add body', req.body)
    let db_connect = dbo.getDb("Stock-Tracker");
    let user_email = req.body.email;
    let filter = {email : user_email}
    let stock = req.body.stock;
    let old_stocks = await get_user_stocks(user_email);
    console.log("OLD: ", old_stocks);
    if (old_stocks.some(it => it.company == stock.company)) {
        res.send("Company already added");
        return;
    }
    let new_stocks = old_stocks;
    new_stocks.push(stock);
    let update = {
        $set: {
            stocks : new_stocks
            }
        };
    db_connect
    .collection("users")
    .updateOne(filter, update, function (err, result) {
        if (err) throw err;
        console.log("added", new_stocks);
        res.send("New stock added")
        });
    });
    
    
    
  
  // Remove stock from user
  routes.route("/remove").post(async function(req, res) {
    console.log("To remove: ", req.body)

    let db_connect = dbo.getDb("Stock-Tracker");
    let user_email = req.body.email;
    let filter = {email : user_email}
    let ticker = req.body.stock.ticker
    let old_stocks = await get_user_stocks(user_email);
    console.log("OLD: ", old_stocks);
    let new_stocks = old_stocks;
    for (var i=0; i< new_stocks.length; i++) {
        console.log(new_stocks[i].ticker)
        if (new_stocks[i].ticker == ticker) {
            new_stocks.pop(i);
            break;
        }

    }
    console.log("Removed", new_stocks);
    
    let update = {
        $set: {
            stocks : new_stocks
            }
        };
    db_connect
    .collection("users")
    .updateOne(filter, update, function (err, result) {
        if (err) throw err;
        res.send("Stock removed")
        });
    });


// Get user's stocks route
routes.route("/allstocks:email").get(async function (req, res) {
    let email = req.params.email;
    let result = await get_user_stocks(email);
    res.send(result);
});





module.exports = routes;
