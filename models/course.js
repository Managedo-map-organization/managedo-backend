const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        static associate(models) {
            models.Semester.hasMany(models.Course, {
                foreignKey: 'fkSemesterId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
            models.Course.belongsTo(models.Semester, {
                foreignKey: 'fkSemesterId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
        }
    };
    Course.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        courseCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        section: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        credit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        targetedGrade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        achievedGrade: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscore: true,
        sequelize,
        modelName: 'Course',
    });
    return Course;
};