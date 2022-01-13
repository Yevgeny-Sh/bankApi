const fs = require("fs");

const readUsersFromFile = () => {
  try {
    const dataBuffer = fs.readFileSync("./DB/users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const addUser = (body) => {
  const users = loadUsers();
  let foundUser = users.find((user) => {
    if (user.id === body.id) {
      throw Error("The user is allready exist");
      //? and return
    }
  });
  users.push(body);
  saveUsers(users);
  return stringToJson("new-client", body);
};

const stringToJson = (message, string) => {
  return JSON.stringify({ [message]: string });
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("./DB/users.json", dataJSON);
};

const removeUser = (userId) => {
  const users = readUsersFromFile();
  const user2remove = users.find((obj) => {
    return obj.id === Number(userId);
  });
  const indexToRemove = users.indexOf(user2remove);
  if (indexToRemove > -1) {
    users.splice(indexToRemove, 1);
    saveUsers(users);
    return users;
  } else {
    throw Error("no user to remove");
  }
};

//Depositing
const deposition = (userId, ammount) => {
  const users = readUsersFromFile();
  const user = users.find((obj) => {
    return obj.id === Number(userId);
  });
  const userIndex = users.indexOf(user);
  if (userIndex > -1) {
    user.cash += ammount;
    saveUsers(users);
    return users;
  } else {
    throw Error("no user found");
  }
};
//UpdateCredit
const UpdateCredit = (userId, newCredit) => {
  const users = readUsersFromFile();
  if (newCredit < 0) {
    throw Error("negetive credit entered- pls enter positive number");
  } else {
    const user = users.find((obj) => {
      return obj.id === Number(userId);
    });
    const userIndex = users.indexOf(user);
    if (userIndex > -1) {
      user.credit = newCredit;
      saveUsers(users);
      return users;
    } else {
      throw Error("no user found");
    }
  }
};
const WithdrawMoney = (userId, sumToWithdraw) => {
  const users = readUsersFromFile();
  if (sumToWithdraw < 0) {
    throw Error("negetive sum  entered- pls enter positive number");
  } else {
    const user = users.find((obj) => {
      return obj.id === Number(userId);
    });
    const userIndex = users.indexOf(user);
    if (userIndex > -1) {
      //if user found
      //   if (sumToWithdraw <= user.cash) {
      //     user.cash = user.cash - sumToWithdraw;
      //     //sum bigger then cash- check credit
      //   } else
      if (sumToWithdraw <= user.cash + user.credit) {
        user.cash = user.cash - sumToWithdraw;
      } else {
        throw Error("ammount to big to withdraw");
      }
      saveUsers(users);
      return users;
    } else {
      throw Error("no user found (to withdraw)");
    }
  }
};
//TransferMoneyBwtweenUsers
const TransferMoneyBetweenUsers = (
  userFromWhom2transferId,
  userToWhich2transferId,
  sumTotransfer
) => {
  const users = readUsersFromFile();
  if (sumTotransfer < 0) {
    throw Error("negetive sum  entered- pls enter positive number");
  } else {
    const userFromWhom2transfer = users.find((obj) => {
      return obj.id === Number(userFromWhom2transferId);
    });
    const userToWhich2transfer = users.find((obj) => {
      return obj.id === Number(userToWhich2transferId);
    });
    if (userFromWhom2transfer && userToWhich2transfer) {
      // if both users found
      if (
        sumTotransfer <=
        userFromWhom2transfer.cash + userFromWhom2transfer.credit
      ) {
        //do
        console.log("users exists");
        console.log("valid ammount to transfer");
        userFromWhom2transfer.cash = userFromWhom2transfer.cash - sumTotransfer;
        // WithdrawMoney(userFromWhom2transferId, sumTotransfer);

        console.log(userFromWhom2transfer.cash);
        userToWhich2transfer.cash = userToWhich2transfer.cash + sumTotransfer;
      } else {
        throw Error(sumTotransfer + "is a ammount to big to transfer. ");
      }
      saveUsers(users);
      return users;
    } else if (userFromWhom2transfer) {
      throw Error("userTo Which to transfer not found");
    } else throw Error("user From Whom to transfer not found");
  }
};
module.exports = {
  readUsersFromFile,
  addUser,
  removeUser,
  deposition,
  UpdateCredit,
  WithdrawMoney,
  TransferMoneyBetweenUsers,
};
