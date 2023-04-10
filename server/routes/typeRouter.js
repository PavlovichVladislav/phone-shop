const Router = require("express");
const TypeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRolesMiddleware");

const router = new Router();

router.post("/", checkRole('ADMIN'), TypeController.create);
router.get("/", TypeController.getAll);
// можно ещё delete

module.exports = router;
