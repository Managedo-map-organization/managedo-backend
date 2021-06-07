module.exports = app => {
    const student = require('../controllers/student.controller');

    var router = require("express").Router();

    router.get("/", student.findAll);

    router.get("/:id", student.findOne);

    router.put("/:id", student.updateOne);

    router.delete("/:id", student.deleteOne);

    router.post("/", student.addOne);

    app.use("/api/students", router);
}