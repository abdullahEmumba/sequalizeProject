const db = require("../models");
const TodoLists = db.todoLists;
const Op = db.Sequelize.Op;

//Add a task
exports.addTask = (req, res) => {
  if (!req.body.id || !req.body.task) {
    res.status(400).send("Invalid request");
    return;
  }

  let userTask = {
    UserId: req.body.id,
    task: req.body.task,
  };

  console.log(userTask);

  TodoLists.create(userTask)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

//get all user tasks
exports.getTasks = (req, res) => {
  if (!req.body.id) {
    res.status(400).send("Invalid request");
    return;
  }

  db.users
    .findAll({
      where: {
        id: req.body.id,
      },
      include: ["todoLists"],
    })
    .then((data) => {
      res.send(data);
    })
    .error((error) => {
      res.send(error);
    });
};

//Update Task
exports.updateTask = (req, res) => {
  if (!req.body.id) {
    res.status(400).send("Invalid request");
    return;
  }
  TodoLists.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then((data) => {
      // console.log(data)
      TodoLists.findByPk(req.body.id)
        .then((data2) => {
          res.send(data2);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

//Count Tasks
exports.countTotal = (req, res) => {
  if (!req.body.id) {
    res.status(400).send("Invalid request");
    return;
  }
    db.users
      .findAll({
        attributes: {
          include: [
            [
              db.Sequelize.fn("COUNT", db.Sequelize.col("todoLists.id")),
              "tasksPending",
            ],
          ],
        },
        where: {
          id: req.body.id,
        }
      })
//   TodoLists.findAll({
//     where: {
//       UserId: req.body.id,
//     },
//     include: ["users"],
//   })
    .then((data) => {
      // console.log(data)
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
