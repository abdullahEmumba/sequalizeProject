const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

//Function to sync a table
exports.syncTable = (req, res) => {
  User.sync({ alter: true })
    .then(res.send("Table successfully synced"))
    .catch((error) => {
      res.status(500).send(error);
    });
};

//Function to add a new user
exports.createUser = (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.age) {
    res.status(400).send("Invalid request Check all parameters are set");
    return;
  }
  let user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
  };
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

//Function to Edit user
exports.updateUser = (req, res) => {
  if (!req.body.id) {
    res.status(400).send("Invalid request please provide Id");
    return;
  }
  let id = req.body.id;
  User.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((data) => {
      // console.log(data)
      User.findByPk(id)
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

//Function Delete User
exports.deleteUser = (req, res) => {
  if (!req.body.id) {
    res.status(400).send("Invalid request please provide Id");
    return;
  }
  let id = req.body.id;
  User.destroy({
    where: {
      id: id,
    },
  })
    .then((data) => {
      res.send("User deleted");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

//Count Total Users
exports.countTotal = async (req, res) => {
  await User.count()
    .then((c) => {
      console.log(c);
      res.send({
        Count: c,
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
