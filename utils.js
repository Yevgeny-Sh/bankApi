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
const stringToJson = (message, string) => {
  return JSON.stringify({ [message]: string });
};
const addUser = (body) => {
  const users = readUsersFromFile();
  let foundUser = users.find((user) => {
    if (user.id === body.id) {
      throw Error("The user is allready exist");
    }
  });
  //TODO  we can check we got object correctly
  users.push(body);
  //saveUsers(users);
  return stringToJson("new-client", body);
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
    //saveUsers(users);
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
  if (user) {
    if (!user.isActive) {
      throw Error("the selected user is inactive- cant deposit!");
    } else {
      user.cash += ammount;
      saveUsers(users);
      return users;
    }
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
    if (user) {
      if (!user.isActive) {
        throw Error("the selected user is inactive- cant update credit!");
      } else {
        user.credit = newCredit;
        // saveUsers(users);
        return users;
      }
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
    if (user) {
      console.log(user.isActive);
      if (user.isActive) {
        if (sumToWithdraw <= user.cash + user.credit) {
          user.cash = user.cash - sumToWithdraw;
        } else {
          throw Error("ammount to big to withdraw");
        }
        // saveUsers(users);
        return users;
      } else {
        throw Error("user is inActive- cant withdraw");
      }
    } else {
      throw Error("no user found (to withdraw)");
    }
  }
};
//!active broke function
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
      if (!userFromWhom2transfer.isActive) {
        throw Error("user id " + userFromWhom2transferId + " is inactive. ");
      } else if (!userToWhich2transfer.isActive) {
        console.log(`if is true`);
        console.log(!userToWhich2transfer.isActive);
        throw Error("user id " + userToWhich2transferId + " is inactive. ");
      }
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
//get a user
const getUserById = (userId) => {
  const users = readUsersFromFile();
  const user = users.find((obj) => {
    return obj.id === Number(userId);
  });
  if (user) {
    return user;
  } else {
    throw Error("no user found");
  }
};
//toggle active

//
const toggleActive = (userId) => {
  const users = readUsersFromFile();
  const user = users.find((obj) => {
    return obj.id === Number(userId);
  });
  if (user) {
    user.isActive = !user.isActive;
    // saveUsers(users);
    return users;
  } else {
    throw Error("no user found");
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
  getUserById,
  toggleActive,
};
