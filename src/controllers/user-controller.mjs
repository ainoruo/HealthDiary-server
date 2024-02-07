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

 //TODO: use userModel (db) insted of mock data
 //implement route handlers below for users (real data) 

const getUsers = (req, res) => {
    res.json(users);
};

const getUsersById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  };

const postUser = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username, password or email'})
    }
    const newUser = {
        id: users.length + 1,
        username,
        password,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

const putUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, password, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (username) {
      users[userIndex].username = username;
    }
    if (password) {
      users[userIndex].password = password;
    }
    if (email) {
      users[userIndex].email = email;
    }
    res.json(users[userIndex]);
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