module.exports = app => {
    const loginCredential = require('../controllers/loginCredential.controller');

    var router = require("express").Router();

    router.get("/", loginCredential.findAll);

    router.get("/:id", loginCredential.findOne);

    router.get("/fkUserId/:fkUserId", loginCredential.findAllBasedOnFk);

    router.put("/:id", loginCredential.updateOne);

    router.delete("/:id", loginCredential.deleteOne);

    router.post("/", loginCredential.addOne);

    app.use("/api/loginCredentials", router);
}