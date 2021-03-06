module.exports = app => {
    const semester = require('../controllers/semester.controller');

    var router = require("express").Router();

    router.get("/", semester.findAll);

    router.get("/:id", semester.findOne);

    router.get("/fkEducationId/:fkEducationId", semester.findAllBasedOnFk);

    router.put("/:id", semester.updateOne);

    router.delete("/:id", semester.deleteOne);

    router.post("/", semester.addOne);

    app.use("/api/semesters", router);
}