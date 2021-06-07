module.exports = app => {
    const relation = require('../controllers/relation.controller');

    var router = require("express").Router();

    router.get("/", relation.findAll);

    router.get("/:id", relation.findOne);

    router.put("/:id", relation.updateOne);

    router.delete("/:id", relation.deleteOne);

    router.post("/", relation.addOne);

    app.use("/api/relations", router);
}