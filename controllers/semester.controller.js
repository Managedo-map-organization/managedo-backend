const db = require('../models');
const Semester = db["Semester"];
const Op = db.Sequelize.Op;

// Add Semester information
exports.addOne = (req, res) => {
    const jsonData = req.body;

    Semester.create(jsonData)
        .then(data => {
            res.send(JSON.parse(JSON.stringify(`"auto-generated ID":${data.id}`)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error adding new Semester information"
            });
        });
};

// Retrieve all Semesters information
exports.findAll = (req, res) => {
    Semester.findAll()
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Semesters information"
            });
        });
};

// Retrieve a Semester information with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    var condition = {
        id: {
            [Op.eq]: id
        }
    }

    Semester.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data.length == 1 ? data[0] : '{}')));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Semester with id=" + id
            });
        });
};

// Update a Semester information with an id
exports.updateOne = (req, res) => {
    const id = req.params.id;

    Semester.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Semester information was updated successfully."
                });
            } else {
                res.send({
                    message: `Semester update information with id=${id}. Maybe Semester was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Semester with id=" + id
            });
        });
};

// Delete a Semester information with an id
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    Semester.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Semester was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Semester with id=${id}. Maybe Semester was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Semester with id=" + id
            });
        });
};