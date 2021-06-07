const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Relation extends Model {
        static associate(models) {
            models.Parent.hasMany(models.Relation, {
                foreignKey: 'fkParentId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
            models.Relation.belongsTo(models.Parent, {
                foreignKey: 'fkParentId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
            models.Student.hasMany(models.Relation, {
                foreignKey: 'fkStudentId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
            models.Relation.belongsTo(models.Student, {
                foreignKey: 'fkStudentId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
        }
    };
    Relation.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        relation: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscore: true,
        sequelize,
        modelName: 'Relation',
    });
    return Relation;
};