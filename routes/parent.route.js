module.exports = app => {
    const parent = require('../controllers/parent.controller');

    var router = require("express").Router();

    router.get("/", parent.findAll);

    router.get("/:id", parent.findOne);

    router.put("/:id", parent.updateOne);

    router.delete("/:id", parent.deleteOne);

    router.post("/", parent.addOne);

    app.use("/api/parents", router);
}