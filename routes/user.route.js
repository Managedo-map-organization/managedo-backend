module.exports = app => {
    const user = require('../controllers/user.controller');

    var router = require("express").Router();

    router.get("/", user.findAll);

    router.get("/:id", user.findOne);

    router.get("/fkStudentId/:fkStudentId", user.findAllBasedOnFkStudentId);

    router.get("/fkParentId/:fkParentId", user.findAllBasedOnFkParentId);

    router.get("/userType/:userType", user.findAllBasedOnUserType);

    router.put("/:id", user.updateOne);

    // To delete the user, you need to delete the parent/ student
    // It will automically delete the users data as well
    // router.delete("/:id", user.deleteOne);

    router.post("/", user.addOne);

    app.use("/api/users", router);
}