const db = require('../models');
const Parent = db["Parent"];
const Op = db.Sequelize.Op;

// Add Parent information
exports.addOne = (req, res) => {
    const jsonData = req.body;

    Parent.create(jsonData)
        .then(data => {
            res.status(201).send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error adding new Parent information"
            });
        });
};

// Retrieve all Parents information
exports.findAll = (req, res) => {
    Parent.findAll()
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Parents information"
            });
        });
};

// Retrieve a Parent information with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    var condition = {
        id: {
            [Op.eq]: id
        }
    }

    Parent.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data.length == 1 ? data[0] : '{}')));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Parent with id=" + id
            });
        });
};

// Update a Parent information with an id
exports.updateOne = (req, res) => {
    const id = req.params.id;

    Parent.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Parent information was updated successfully."
                });
            } else {
                res.send({
                    message: `Parent update information with id=${id}. Maybe Parent was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Parent with id=" + id
            });
        });
};

// Delete a Parent information with an id
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    Parent.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Parent was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Parent with id=${id}. Maybe Parent was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Parent with id=" + id
            });
        });
};
