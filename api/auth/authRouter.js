const router = require("express").Router();

const userDB = require("./authModel");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

// //* POST /register - Adds new user to database
router.post("/register", validateRegister, (req, res) => {
  const user = ({ username, password, department } = req.body);

  bcrypt
    .hash(user.password, process.env.SALT_ROUNDS)
    .then((hash) => {
      //Change password to hashed version
      user.password = hash;

      //Insert user into database
      userDB
        .insert(user)
        .then((newUser) => {
          //Send back user id
          res.status(201).json({ userId: newUser[0] });
        })
        .catch((error) => {
          if (error.errno === 19) {
            res.status(403).json({ message: "Username already exists" });
          } else {
            res.status(500).json({ message: "Error adding new user to database", error: error });
          }
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error generating hash", error: error });
    });
});

//* POST /login - Authenticates user credentials
router.post("/login", validateUser, (req, res) => {
  const { username, password } = req.body;

  userDB
    .getByUsername(username)
    .first()
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((authenticated) => {
            if (authenticated) {
              const token = signToken(user);
              res.status(200).json({ message: "Logged in", token });
            } else {
              res.status(400).json({ message: "You shall not pass!" });
            }
          })
          .catch((error) => {
            res.status(500).json({ message: "Invalid username / password combination", error: error });
          });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "You shall not pass!", error: error });
    });
});

//MIDDLEWARE
function validateUser(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    next();
  } else {
    res.status(400).json({ message: "Please provide username and password" });
  }
}

function validateRegister(req, res, next) {
  const { username, password, department } = req.body;

  if (username && password && department) {
    next();
  } else {
    res.status(400).json({ message: "Please provide username, password, and department" });
  }
}

//TOKEN
function signToken(user) {
  const payload = {
    sub: user.id,
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
