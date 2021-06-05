const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoginCredential extends Model {
        static associate(models) {
            models.User.belongsTo(models.LoginCredential, {
                foreignKey: 'fk_login_credential_id',
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