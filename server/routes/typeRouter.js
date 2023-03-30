const Router = require("express");
const TypeController = require("../controllers/typeController");

const router = new Router();

router.post("/", TypeController.create);
router.get("/", TypeController.getAll);
// можно ещё delete

module.exports = router;
