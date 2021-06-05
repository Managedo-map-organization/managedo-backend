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

app.get('/', function(req, res) {
    db.Url.findAll({ order: [
                ['createdAt', 'DESC']
            ], limit: 5 })
        .then(urlObjs => {
            res.render('index', {
                urlObjs: urlObjs
            });
        });
});

app.use(express.json());

app.post('/url', function(req, res) {
    const url = req.body.url

    urlShortener.short(url, function(err, shortUrl) {
        db.Url.findOrCreate({ where: { url: url, shortUrl: shortUrl } })
            .then(([urlObj, created]) => {
                res.send(shortUrl)
            });
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});