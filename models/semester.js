const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Semester extends Model {
        static associate(models) {
            models.Education.hasMany(models.Semester, {
                foreignKey: 'fkEducationId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
            models.Semester.belongsTo(models.Education, {
                foreignKey: 'fkEducationId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
        }
    };
    Semester.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        semesterNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        durationInWeek: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        targetedGPA: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        achievedGPA: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        semesterStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscore: true,
        sequelize,
        modelName: 'Semester',
    });
    return Semester;
};