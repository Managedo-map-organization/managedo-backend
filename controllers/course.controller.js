const db = require('../models');
const Course = db["Course"];
const Op = db.Sequelize.Op;

// Add Course information
exports.addOne = (req, res) => {
    const jsonData = req.body;

    Course.create(jsonData)
        .then(data => {
            res.status(201).send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error adding new Course information"
            });
        });
};

// Retrieve all Courses information
exports.findAll = (req, res) => {
    Course.findAll()
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Courses information"
            });
        });
};

// Retrieve all Courses information based on the fkSemesterId
exports.findAllBasedOnFk = (req, res) => {
    const fkSemesterId = req.params.fkSemesterId;

    var condition = {
        fkSemesterId: {
            [Op.eq]: fkSemesterId
        }
    }

    Course.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Courses information with fkSemeterId ${fkSemesterId}`
            });
        });
};

// Retrieve a Course information with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    var condition = {
        id: {
            [Op.eq]: id
        }
    }

    Course.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data.length == 1 ? data[0] : '{}')));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Course with id=" + id
            });
        });
};

// Update a Course information with an id
exports.updateOne = (req, res) => {
    const id = req.params.id;

    Course.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Course information was updated successfully."
                });
            } else {
                res.send({
                    message: `Course update information with id=${id}. Maybe Course was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Course with id=" + id
            });
        });
};

// Delete a Course information with an id
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    Course.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Course was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Course with id=" + id
            });
        });
};
