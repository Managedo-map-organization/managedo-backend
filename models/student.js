const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {}
    };
    Student.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        matricNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscore: true,
        sequelize,
        modelName: 'Student',
    });
    return Student;
};