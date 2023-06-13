const Router = require("express");

const router = new Router();

const deviceRouter = require("./deviceRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");
const basketRouter = require("./basketRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/review", reviewRouter);
router.use("/basket", basketRouter);

module.exports = router;
