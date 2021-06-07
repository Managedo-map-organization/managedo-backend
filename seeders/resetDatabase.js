const db = require('../models');

module.exports = app => {

    var router = require("express").Router();

    router.delete("/", function(req, res) {
        const message = "Drop and re-sync db. All of the previous data is deleted";

        // Drop existing table and re-sync database
        db.sequelize.sync({ force: true }).then(() => {
            console.log(message);
        });

        res.send({
            message: "Drop and re-sync db. All of the previous data is deleted"
        });
    });

    app.use("/reset-db", router);
}