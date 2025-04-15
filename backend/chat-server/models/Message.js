module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Message", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
};
