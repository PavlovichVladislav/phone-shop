const Router = require('express');
const DeviceController = require('../controllers/deviceController');

const router = new Router();

router.post('/', DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)
// можно ещё delete

module.exports = router;