const express = require("express");
const app = express();

const {
  readUsersFromFile,
  addUser,
  removeUser,
  deposition,
  UpdateCredit,
  WithdrawMoney,
  TransferMoneyBetweenUsers,
  getUserById,
  toggleActive,
  getUsersOverCashAmmount,
  getActiveUsersOverCashAmmount,
} = require("./utils");
app.use(express.json());

//get all users
app.get("/users", (req, res) => {
  try {
    res.status(200).send(readUsersFromFile());
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//get a specific user
app.get("/users/:id", (req, res) => {
  try {
    res.status(200).send(getUserById(req.params.id));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//add user
app.post("/users", (req, res) => {
  try {
    res.status(201).send(addUser(req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//remove User
app.put("/users/remove/:id", (req, res) => {
  try {
    res.status(200).send(removeUser(req.params.id));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//deposition
app.put("/users/deposit", (req, res) => {
  try {
    res.status(200).send(deposition(req.body.id, req.body.ammount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//Update Credit
app.put("/users/credit", (req, res) => {
  try {
    res.status(200).send(UpdateCredit(req.body.id, req.body.ammount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//Withdraw
app.put("/users/withdraw", (req, res) => {
  try {
    res.status(200).send(WithdrawMoney(req.body.id, req.body.ammount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//transfer
app.put("/users/transfer", (req, res) => {
  try {
    res
      .status(200)
      .send(
        TransferMoneyBetweenUsers(req.body.id1, req.body.id2, req.body.ammount)
      );
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//toggle active
app.put("/users/active", (req, res) => {
  try {
    res.status(200).send(toggleActive(req.body.id));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
// get user over cash ammount
app.get("/rich-users", (req, res) => {
  try {
    res.status(200).send(getUsersOverCashAmmount(req.body.cash));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//get active users over cash ammount
app.get("/rich-users/active", (req, res) => {
  try {
    res.status(200).send(getActiveUsersOverCashAmmount(req.body.cash));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
