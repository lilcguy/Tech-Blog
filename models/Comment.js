//empty for now...
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    contents: {
        type: DataTypes.TEXT,
        allowNull: false,

    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,

    },
    user_id: { 
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id',
        }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
)

module.exports = Comment;