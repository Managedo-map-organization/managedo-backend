const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoginCredential extends Model {
        static associate(models) {
            models.LoginCredential.belongsTo(models.User, {
                foreignKey: 'fkUserId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true,
            });
        }
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