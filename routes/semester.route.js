module.exports = app => {
    const semester = require('../controllers/semester.controller');

    var router = require("express").Router();

    router.get("/", semester.findAll);

    router.get("/:id", semester.findOne);

<<<<<<< HEAD
    router.get("/fkSemesterId/:fkSemesterId", semester.findAllBasedOnFk);
=======
    router.get("/fkEducationId/:fkEducationId", semester.findAllBasedOnFk);
>>>>>>> ainal

    router.put("/:id", semester.updateOne);

    router.delete("/:id", semester.deleteOne);

    router.post("/", semester.addOne);

    app.use("/api/semesters", router);
}