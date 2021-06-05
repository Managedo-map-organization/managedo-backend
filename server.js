const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./api/models/index.js");

// // Drop existing table and re-sync database
// db.sequelize.sync({ force: true }).then(() => {
//         console.log("Drop and re-sync db.");
//    });

db.sequelize.sync().then(() => {
    console.log("sync db status: done");
});

// simple route
app.get("/", (res) => {
    res.json({ message: "Managedo application database" });
});

// api routes
require("./api/routes/user.routes.js")(app);

app.use(express.json());

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});