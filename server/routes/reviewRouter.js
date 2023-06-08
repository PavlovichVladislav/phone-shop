const Router = require("express");
const ReviewController = require("../controllers/reviewController");
const checkRole = require("../middleware/checkRolesMiddleware");

const router = new Router();

router.post("/rate", ReviewController.createRate);
router.post("/comment", ReviewController.createComment);
router.get("/comment/:deviceId", ReviewController.getComments);

module.exports = router;
