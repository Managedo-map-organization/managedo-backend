const db = require('../models');
const User = db["User"];
const Op = db.Sequelize.Op;

// Add User information
exports.addOne = (req, res) => {
    const jsonData = req.body;

    User.create(jsonData)
        .then(data => {
            res.status(201).send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error adding new User information"
            });
        });
};

// Retrieve all Users information
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Users information"
            });
        });
};

// Retrieve all Users information based on the userType
exports.findAllBasedOnUserType = (req, res) => {
    const userType = req.params.userType.toLowerCase();

    var condition = {
        userType: {
            [Op.eq]: userType
        }
    }

    User.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Users information with userType ${userType}`
            });
        });
};

// Retrieve all Users information based on the fkStudentId
exports.findAllBasedOnFkStudentId = (req, res) => {
    const fkStudentId = req.params.fkStudentId;

    var condition = {
        fkStudentId: {
            [Op.eq]: fkStudentId
        }
    }

    User.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Users information with fkStudentId ${fkStudentId}`
            });
        });
};

// Retrieve all Users information based on the fkParentId
exports.findAllBasedOnFkParentId = (req, res) => {
    const fkParentId = req.params.fkParentId;

    var condition = {
        fkParentId: {
            [Op.eq]: fkParentId
        }
    }

    User.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Users information with fkParentId ${fkParentId}`
            });
        });
};

// Retrieve a User information with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    var condition = {
        id: {
            [Op.eq]: id
        }
    }

    User.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data.length == 1 ? data[0] : '{}')));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User information with an id
exports.updateOne = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User information was updated successfully."
                });
            } else {
                res.send({
                    message: `User update information with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User information with an id
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    User.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
