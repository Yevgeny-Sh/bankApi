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
const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("./DB/users.json", dataJSON);
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
  saveUsers(users);
  return stringToJson("new-client", body);
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
  if (user) {
    if (!user.isActive) {
      throw Error("the selected user is inactive- cant deposit!");
    } else {
      user.cash += ammount;
      saveUsers(users);
      return users;
    }
  } else {
    throw Error("no user found 1");
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
        saveUsers(users);
        return users;
      }
    } else {
      throw Error("no user found 2");
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
        saveUsers(users);
        return users;
      } else {
        throw Error("user is inActive- cant withdraw");
      }
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
        userFromWhom2transfer.cash = userFromWhom2transfer.cash - sumTotransfer;
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
    throw Error("no user found 3");
  }
};
//toggle active
const toggleActive = (userId) => {
  const users = readUsersFromFile();
  const user = users.find((obj) => {
    return obj.id === Number(userId);
  });
  if (user) {
    user.isActive = !user.isActive;
    saveUsers(users);
    return users;
  } else {
    throw Error("no user found 4");
  }
};
//get a user
const getUsersOverCashAmmount = (ammount) => {
  const users = readUsersFromFile();
  const filteredUsers = users.filter((obj) => {
    return Number(obj.cash) >= ammount;
  });
  if (filteredUsers) {
    return filteredUsers;
  } else {
    throw Error("no (rich) users found ");
  }
};
const getActiveUsersOverCashAmmount = (ammount) => {
  const users = readUsersFromFile();
  const filteredUsers = users.filter((obj) => {
    return Number(obj.cash) >= ammount && obj.isActive;
  });
  console.log(filteredUsers);
  if (filteredUsers) {
    return filteredUsers;
  } else {
    throw Error("no (rich & active) users found ");
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
  getUsersOverCashAmmount,
  getActiveUsersOverCashAmmount,
};
