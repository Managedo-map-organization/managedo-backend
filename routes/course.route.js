module.exports = app => {
    const course = require('../controllers/course.controller');

    var router = require("express").Router();

    router.get("/", course.findAll);

    router.get("/:id", course.findOne);

    router.put("/:id", course.updateOne);

    router.delete("/:id", course.deleteOne);

    router.post("/", course.addOne);

    app.use("/api/courses", router);
}