const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Education extends Model {
        static associate(models) {
            models.Student.hasMany(models.Education, {
                foreignKey: 'fkStudentId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
            models.Education.belongsTo(models.Student, {
                foreignKey: 'fkStudentId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
        }
    };
    Education.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        universityName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        field: {
            type: DataTypes.STRING,
            allowNull: false
        },
        degreeLevel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        targetedCGPA: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        achievedCGPA: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscore: true,
        sequelize,
        modelName: 'Education',
    });
    return Education;
};