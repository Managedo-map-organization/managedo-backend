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

// add dummy
require("./seeders/addDummy")(app);

// api route
require("./routes/loginCredential.route")(app);
require("./routes/user.route")(app);
require("./routes/course.route")(app);
require("./routes/parent.route")(app);
require("./routes/student.route")(app);
require("./routes/education.route")(app);
require("./routes/semester.route")(app);
require("./routes/relation.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port $ { PORT }.`);
});