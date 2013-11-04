module.exports = function () {
    if (!_user)
        InitModel();
    return _user;
}
var _user, sequelize = global.db.sequelize, Sequelize = global.db.Sequelize;


function InitModel() {
    _user = sequelize.define('User',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        args: 3,
                        msg: "Must be at least 3 characters."
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        args: [6, 128],
                        msg: "Email must be between 6 and 128 characters"
                    },
                    isEmail: {
                        msg: "Email must be valid"
                    }
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: 3
                    }
                }
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }
    );
}