let usersArray = [{}];

const express = require("express");
const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  res.send(users);
});

//add user by id
app.post("/users", (req, res) => {
  console.log(req.body.user);
  //more testing and error handling
  if (usersArray.includes(Number(req.body.user.id))) {
    console.log("ayyy user exists!! user id exists!!");
    res.status(400);
    return res.send("ayyy number exists!! user id exists!!");
  } else {
    usersArray.push(Number(req.body.user));
    res.status(200).send(array);
  }
});

//Depositing cash to user

//Update credit
