const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Parent extends Model {
        static associate(models) {}
    };
    Parent.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscore: true,
        sequelize,
        modelName: 'Parent',
    });
    return Parent;
};