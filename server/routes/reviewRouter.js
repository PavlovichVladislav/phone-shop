const Router = require("express");
const ReviewController = require("../controllers/reviewController");
const checkRole = require("../middleware/checkRolesMiddleware");

const router = new Router();

router.post("/", ReviewController.create);
// router.get("/", ReviewController.getAll);
// можно ещё delete

module.exports = router;
