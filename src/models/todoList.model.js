module.exports = (sequelize, Sequelize) => {
  const TodoList = sequelize.define("TodoList", {
    task: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  // TodoList.associate = (models) => {
  //   TodoList.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return TodoList;
};
