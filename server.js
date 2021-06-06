const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());


const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models/index.js");
// Drop existing table and re-sync database
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

// db.sequelize.sync().then(() => {
//     console.log("sync db status: done");
// });

app.get(['/', '/api'], function(req, res) {
    res.json({ message: "Managedo application database" });
});

app.use(express.json());

app.post('/add-dummy', function(req, res) {
    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('./seeders/dummy.json');
    let dummy = JSON.parse(rawdata);

    const loginCredentialsDummy = dummy.loginCredentials;
    const usersDummy = dummy.users;

    let message = "Successfully add dummy data";
    addDummy(usersDummy, "User");
    addDummy(loginCredentialsDummy, "LoginCredential");

    res.send({ message: message });
});

function addDummy(dummyJsons, tables) {
    if (Array.isArray(dummyJsons) && dummyJsons.length > 0) {
        Promise.all(dummyJsons.map(async(dummyJson) => {
            try {
                const [addedData, created] = await db[tables].findOrCreate({
                    where: dummyJson
                }).catch(() => {});

                console.log(addedData._options.isNewRecord ? {
                    created: created,
                    isNew: addedData._options.isNewRecord,
                    addedData: addedData
                } : {
                    created: created,
                    isNew: addedData._options.isNewRecord,
                    message: `Error happen when adding data into ${tables}`,
                    failedAddedData: dummyJson
                });
            } catch {

            }
        }));
    }
}

// api route
require("./routes/loginCredential.route")(app);
require("./routes/user.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});