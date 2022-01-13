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

//removeUser
app.put("/users/remove/:id", (req, res) => {
  try {
    res.status(200).send(removeUser(req.params.id));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//deposition
app.put("/users/deposit", (req, res) => {
  console.log(req.body.id);
  console.log(req.body.ammount);
  try {
    res.status(200).send(deposition(req.body.id, req.body.ammount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//UpdateCredit
app.put("/users/credit", (req, res) => {
  console.log(req.body.id);
  console.log(req.body.ammount);
  try {
    res.status(200).send(UpdateCredit(req.body.id, req.body.ammount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//WithdrawMoney
app.put("/users/withdraw", (req, res) => {
  try {
    res.status(200).send(WithdrawMoney(req.body.id, req.body.ammount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//transfer
app.put("/users/transfer", (req, res) => {
  console.log(req.body.id1);
  console.log(req.body.id2);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
