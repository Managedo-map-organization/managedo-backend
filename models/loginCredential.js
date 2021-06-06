const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoginCredential extends Model {
        static associate(models) {}
    };
    LoginCredential.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscore: true,
        sequelize,
        modelName: 'LoginCredential',
    });
    return LoginCredential;
};