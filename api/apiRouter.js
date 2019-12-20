const router = require("express").Router();

const authRouter = require("./auth/authRouter");
const userRouter = require("./users/userRouter");

router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
