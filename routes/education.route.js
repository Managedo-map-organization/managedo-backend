module.exports = app => {
    const education = require('../controllers/education.controller');

    var router = require("express").Router();

    router.get("/", education.findAll);

    router.get("/:id", education.findOne);

    router.get("/fkStudentId/:fkStudentId", education.findAllBasedOnFk);

    router.put("/:id", education.updateOne);

    router.delete("/:id", education.deleteOne);

    router.post("/", education.addOne);

    app.use("/api/educations", router);
}