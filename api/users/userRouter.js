const router = require("express").Router();

const userDB = require("./userModel");

const authenticator = require("../middleware/authenticator");

router.get("/", authenticator, (req, res) => {
  const userId = req.token.sub;

  userDB
    .get(userId)
    .first()
    .then((user) => {
      if (user) {
        userDB
          .getUsersByDepartment(user.department)
          .then((users) => {
            res.status(200).json(users);
          })
          .catch((error) => {
            res.status(500).json({ message: "Could not get users from database", error: error });
          });
      } else {
        res.status(404).json({ message: "No users found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not get user from database", error: error });
    });
});

module.exports = router;
