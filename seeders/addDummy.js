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
    // if (Array.isArray(dummyJsons) && dummyJsons.length > 0) {
    //     Promise.all(dummyJsons.map(async(dummyJson) => {
    //         try {
    //             const [addedData, created] = await db[tables].findOrCreate({
    //                 where: dummyJson
    //             }).then((data) => {
    //                 return data;
    //             }).catch(() => {
    //                 return [null, null];
    //             });

    //             // console.log(
    //             //     addedData != null &&
    //             //     created != null ?
    //             //     addedData._options.isNewRecord ? {
    //             //         created: created,
    //             //         isNew: addedData._options.isNewRecord,
    //             //         addedData: addedData
    //             //     } : {
    //             //         created: created,
    //             //         isNew: addedData._options.isNewRecord,
    //             //         message: `data already exist in ${tables}`,
    //             //         failedAddedData: dummyJson
    //             //     } : {
    //             //         message: `Error happen when adding data into ${tables}`,
    //             //         failedAddedData: dummyJson
    //             //     }
    //             // );

    //             let barR = rejectedData.length;
    //             let barA = acceptedData.length;

    //             let message = {};
    //             if (addedData == null || created == null) {
    //                 message = {
    //                     message: `Error happen when adding data into ${tables}`,
    //                     failedAddedData: dummyJson
    //                 };
    //                 rejectedData[barR++] = message.message;
    //             } else if (addedData._options.isNewRecord) {
    //                 message = {
    //                     created: created,
    //                     isNew: addedData._options.isNewRecord,
    //                     addedData: addedData
    //                 };
    //                 acceptedData[barA++] = message;
    //             } else {
    //                 message = {
    //                     created: created,
    //                     isNew: addedData._options.isNewRecord,
    //                     message: `data already exist in ${tables}`,
    //                     failedAddedData: dummyJson
    //                 };
    //                 rejectedData[barR++] = message.message;
    //             }

    //             console.log(message);
    //         } catch (err) {
    //             console.log({
    //                 error: err
    //             });
    //         }
    //     }));
    // }
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