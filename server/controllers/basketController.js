const { BasketDevice, Basket, Device } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
   async create(req, res, next) {
      try {
         const { basketId, deviceId } = req.body;

         if (!basketId || !deviceId) {
            return next(ApiError.badRequest("Необходимо указать id корзины и устройства"));
         }

         const device = await Device.findOne({ where: { id: deviceId } });

         if (!device) {
            return next(ApiError.badRequest("Устройство не было найдено"));
         }

         const basketDevice = await BasketDevice.create({ basketId, deviceId });
         return res.json(basketDevice);
      } catch (error) {
         return next(ApiError.badRequest("Неизвестная ошибка"));
      }
   }

   async delete(req, res, next) {
      try {
         const { basketDeviceId } = req.params;

         if (!basketDeviceId) {
            return next(ApiError.badRequest("Необходимо указать id товара в корзине"));
         }

         await BasketDevice.destroy({ where: { id: basketDeviceId } });

         return res.json(`Успешно удален товар с basketDeviceId: ${basketDeviceId}`);
      } catch (error) {
         return next(ApiError.badRequest("Неизвестная ошибка"));
      }
   }

   async getUsersBasket(req, res, next) {
      const { userId } = req.params;

      if (!userId) {
         return next(ApiError.badRequest("Необходимо указать id пользователя"));
      }

      const basket = await Basket.findOne({ where: { userId } });

      if (!basket) {
         return next(ApiError.badRequest("Корзина пользователя не была найдена"));
      }

      const { count, rows: devices } = await BasketDevice.findAndCountAll({
         where: { basketId: basket.id },
      });

      return res.json({
         count,
         devices,
      });
   }
}

module.exports = new BasketController();
