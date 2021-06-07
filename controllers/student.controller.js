const db = require('../models');
const Student = db["Student"];
const Op = db.Sequelize.Op;

// Add Student information
exports.addOne = (req, res) => {
    const jsonData = req.body;

    Student.create(jsonData)
        .then(data => {
            res.send(JSON.parse(JSON.stringify(`"auto-generated ID":${data.id}`)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error adding new Student information"
            });
        });
};

// Retrieve all Students information
exports.findAll = (req, res) => {
    Student.findAll()
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Students information"
            });
        });
};

// Retrieve a Student information with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    var condition = {
        id: {
            [Op.eq]: id
        }
    }

    Student.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data.length == 1 ? data[0] : '{}')));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id
            });
        });
};

// Update a Student information with an id
exports.updateOne = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student information was updated successfully."
                });
            } else {
                res.send({
                    message: `Student update information with id=${id}. Maybe Student was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Student with id=" + id
            });
        });
};

// Delete a Student information with an id
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    Student.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};