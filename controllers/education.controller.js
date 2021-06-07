const db = require('../models');
const Education = db["Education"];
const Op = db.Sequelize.Op;

// Add Education information
exports.addOne = (req, res) => {
    const jsonData = req.body;

    Education.create(jsonData)
        .then(data => {
            res.send(JSON.parse(JSON.stringify(`"auto-generated ID":${data.id}`)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error adding new Education information"
            });
        });
};

// Retrieve all Educations information
exports.findAll = (req, res) => {
    Education.findAll()
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Educations information"
            });
        });
};

// Retrieve all Educations information based on the fkStudentId
exports.findAllBasedOnFk = (req, res) => {
    const fkStudentId = req.params.fkStudentId;

    var condition = {
        fkStudentId: {
            [Op.eq]: fkStudentId
        }
    }

    Education.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Educations information with fkStudentId ${fkStudentId}`
            });
        });
};

// Retrieve a Education information with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    var condition = {
        id: {
            [Op.eq]: id
        }
    }

    Education.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data.length == 1 ? data[0] : '{}')));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Education with id=" + id
            });
        });
};

// Update a Education information with an id
exports.updateOne = (req, res) => {
    const id = req.params.id;

    Education.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Education information was updated successfully."
                });
            } else {
                res.send({
                    message: `Education update information with id=${id}. Maybe Education was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Education with id=" + id
            });
        });
};

// Delete a Education information with an id
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    Education.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Education was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Education with id=${id}. Maybe Education was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Education with id=" + id
            });
        });
};