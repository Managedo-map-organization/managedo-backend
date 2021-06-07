const db = require('../models');
const Relation = db["Relation"];
const Op = db.Sequelize.Op;

// Add Relation information
exports.addOne = (req, res) => {
    const jsonData = req.body;

    Relation.create(jsonData)
        .then(data => {
            res.send(JSON.parse(JSON.stringify(`"auto-generated ID":${data.id}`)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error adding new Relation information"
            });
        });
};

// Retrieve all Relations information
exports.findAll = (req, res) => {
    Relation.findAll()
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Relations information"
            });
        });
};

// Retrieve a Relation information with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    var condition = {
        id: {
            [Op.eq]: id
        }
    }

    Relation.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data.length == 1 ? data[0] : '{}')));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Relation with id=" + id
            });
        });
};

// Update a Relation information with an id
exports.updateOne = (req, res) => {
    const id = req.params.id;

    Relation.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Relation information was updated successfully."
                });
            } else {
                res.send({
                    message: `Relation update information with id=${id}. Maybe Relation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Relation with id=" + id
            });
        });
};

// Delete a Relation information with an id
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    Relation.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Relation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Relation with id=${id}. Maybe Relation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Relation with id=" + id
            });
        });
};