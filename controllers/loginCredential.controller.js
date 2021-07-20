const db = require('../models');
const LoginCredential = db["LoginCredential"];
const Op = db.Sequelize.Op;

// Add Login Credentials information
exports.addOne = (req, res) => {
    const jsonData = req.body;

    LoginCredential.create(jsonData)
        .then(data => {
            res.status(201).send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error adding new Login Credentials information"
            });
        });
};

// Retrieve all Login Credentials information
exports.findAll = (req, res) => {
    LoginCredential.findAll()
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Login Credentials information"
            });
        });
};

// Retrieve all login Credentials information based on the fkUserId
exports.findAllBasedOnFk = (req, res) => {
    const fkUserId = req.params.fkUserId;

    var condition = {
        fkUserId: {
            [Op.eq]: fkUserId
        }
    }

    LoginCredential.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data)));
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Login Credentials information with fkUserId ${fkUserId}`
            });
        });
};

// Retrieve a Login Credential information with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    var condition = {
        id: {
            [Op.eq]: id
        }
    }

    LoginCredential.findAll({ where: condition })
        .then(data => {
            res.send(JSON.parse(JSON.stringify(data.length == 1 ? data[0] : '{}')));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Login Credential with id=" + id
            });
        });
};

// Update a Login Credential information with an id
exports.updateOne = (req, res) => {
    const id = req.params.id;

    LoginCredential.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Login Credential information was updated successfully."
                });
            } else {
                res.send({
                    message: `Login Credential update information with id=${id}. Maybe Login Credential was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Login Credential with id=" + id
            });
        });
};

// Delete a Login Credential information with an id
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    LoginCredential.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Login Credential was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Login Credential with id=${id}. Maybe Login Credential was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Login Credential with id=" + id
            });
        });
};
