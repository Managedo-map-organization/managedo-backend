const Promise = require('bluebird');
const db = require('../models');

// const rejectedData = [];
// const acceptedData = [];

async function addDummy(dummyJsons, tables) {
    try {
        await Promise.each(tables, function(table, index) {
            return table.bulkCreate(dummyJsons[index])
                .then((data) => {
                    console.log({ success: data });
                }).catch(err => {
                    console.log({
                        error: {
                            status: "failed",
                            table: err,
                            message: err
                        }
                    });
                });
        });
    } catch {

    }
}

module.exports = app => {

    var router = require("express").Router();

    router.post("/", function(req, res) {
        'use strict';
        const fs = require('fs');

        let rawdata = fs.readFileSync("./seeders/dummy.json");
        let dummy = JSON.parse(rawdata);

        const dummies = [
            dummy.students,
            dummy.parents,
            dummy.users,
            dummy.loginCredentials,
            dummy.relations,
            dummy.educations,
            dummy.semesters,
            dummy.courses
        ];

        const tables = [
            db["Student"],
            db["Parent"],
            db["User"],
            db["LoginCredential"],
            db["Relation"],
            db["Education"],
            db["Semester"],
            db["Course"]
        ];

        // let message = "Successfully add dummy data";

        addDummy(dummies, tables);

        res.send({
            // summary: {
            //     totalAddedData: acceptedData.length,
            //     totalRejectedData: rejectedData.length
            // }
            done: true
        });
    });

    app.use("/add-dummy", router);
}