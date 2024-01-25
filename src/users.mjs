const users = [
    {
      id: 1,
      username: "johndoe",
      password: "password1",
      email: "johndoe@example.com"
    },
    {
      id: 2,
      username: "janedoe",
      password: "password2",
      email: "janedoe@example.com"
    },
    {
      id: 3,
      username: "bobsmith",
      password: "password3",
      email: "bobsmith@example.com"
    }
  ];

  //TODO: implement route handlers below for users

const getUsers = (req, res) => {
    res.json(users);
};

const getUsersById = (req, res) => {
    //TODO: implement this
    res.send('not working yet')
};

const postUser = (req, res) => {
    //TODO: implement this
    res.send('not working yet')
};

const  putUser = (req, res) => {
    //TODO: implement this
    res.send('not working yet')
};

// Dummy login, returns user object if username & password match
const  postLogin = (req, res) => {
    //TODO: implement this
    const UserCreds = req.body;
    if (UserCreds.username || !UserCreds.password) {
        return res.sendStatus(400);
    }
    const userFound = users.find(user => user.username == UserCreds.username);
    // user not found
    if (!userFound) {
        return res.status(403).json({error: 'username/password invalid'});
    }

    // check if posted password matches to users found username
    if (userFound.password === UserCreds.password) {
        res.json({message: 'logged in succesfully', user: userFound});
    } else {
        return res.status(403).json({error: 'username/password invalid'});
    }
    res.send('not working yet')
};

export {getUsers, getUsersById, postUser, putUser, postLogin};