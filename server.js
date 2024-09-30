//require express
const express = require("express");
//require mongodb
const MongoClient = require("mongodb").MongoClient;
//require dotenv
require("dotenv").config();
//require cors
const cors = require("cors");

//connection string
const connectionString = process.env.MONGODB_URI;

//use express
const app = express();

//use cors
app.use(cors());

//set view engine
app.set("view engine", "ejs");

//middleware

app.use(express.static("public"));

app.use(express.json());

//extract form data and add to body property
app.use(express.urlencoded({ extended: true }));

MongoClient.connect(connectionString).then((client) => {
  console.log("Connected to Database");
  const db = client.db("onepiece-quotes");
  const quotesCollection = db.collection("quotes");
  //handlers
  app.get("/", (request, respond) => {
    db.collection("quotes")
      .find()
      .toArray()
      .then((results) => {
        respond.render("index.ejs", { quotes: results });
      })
      .catch((error) => console.error(error));
  });

  app.post("/quotes", (request, respond) => {
    quotesCollection
      .insertOne(request.body)
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);

    respond.redirect("/");
  });

  app.put("/quotes", (request, respond) => {
    quotesCollection
      .findOneAndUpdate(
        { name: "Vegapunk" },
        {
          $set: {
            name: request.body.name,
            quote: request.body.quote,
          },
        },
        {
          upsert: true,
        }
      )
      .then((result) => {
        respond.json("Success");
      })
      .catch((error) => console.error(error));
  });

  app.delete("/quotes", (request, respond) => {
    quotesCollection
      .deleteOne({ name: request.body.name })
      .then((result) => {
        if (result.deletedCount === 0) {
          return respond.json("No quote to delete");
        }
        respond.json("Shattered the Goroseis Lies");
      })
      .catch((error) => console.error(error));
  });
});

//listen on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000. Luffy will become king of the pirates");
});
