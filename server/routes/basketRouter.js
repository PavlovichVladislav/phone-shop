const Router = require("express");
const BasketController = require("../controllers/basketController");

const router = new Router();

router.post("/", BasketController.create);
router.get("/:userId", BasketController.getUsersBasket);
router.delete("/:basketDeviceId", BasketController.delete);

module.exports = router;
