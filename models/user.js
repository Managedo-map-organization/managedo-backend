'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            models.User.belongsTo(models.Parent, {
                foreignKey: 'fkParentId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
            models.User.belongsTo(models.Student, {
                foreignKey: 'fkStudentId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
        }
    };
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePicURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.Now,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscore: true,
        sequelize,
        modelName: 'User',
    });
    return User;
};