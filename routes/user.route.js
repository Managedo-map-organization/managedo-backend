module.exports = app => {
    const user = require('../controllers/user.controller');

    var router = require("express").Router();

    router.get("/", user.findAll);

    router.get("/:id", user.findOne);

    router.put("/:id", user.updateOne);

    router.delete("/:id", user.deleteOne);

    router.post("/", user.addOne);

    app.use("/api/users", router);
}