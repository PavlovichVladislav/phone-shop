const { BasketDevice, Basket, Device } = require("../models/models");
const ApiError = require("../error/ApiError");
const { where } = require("sequelize");

class BasketController {
   async create(req, res, next) {
      try {
         const { userId, deviceId } = req.body;

         if (!userId || !deviceId) {
            return next(ApiError.badRequest("Необходимо указать id пользователя и устройства"));
         }

         const device = await Device.findOne({ where: { id: deviceId } });

         if (!device) {
            return next(ApiError.badRequest("Устройство не было найдено"));
         }

         const { id: basketId } = await Basket.findOne({ where: { userId } });

         if (!basketId) {
            return next(ApiError.badRequest("Корзина пользователя не была найдена"));
         }

         let basketDevice = await BasketDevice.findOne({ where: { deviceId, basketId } });

         if (basketDevice) {
            basketDevice.count = basketDevice.count + 1;
            basketDevice.save();
         } else {
            basketDevice = await BasketDevice.create({ basketId, deviceId });
         }

         return res.json(basketDevice);
      } catch (error) {
         return next(ApiError.badRequest("Неизвестная ошибка"));
      }
   }

   async incDeviceCount(req, res, next) {
      const { basketDeviceId } = req.params;

      if (!basketDeviceId) {
         return next(ApiError.badRequest("Необходимо указать id устройства"));
      }

      const basketDevice = await BasketDevice.findOne({ where: { id: basketDeviceId } });

      if (!basketDevice) {
         return next(ApiError.badRequest("Устройство не было найдено"));
      }

      basketDevice.count = basketDevice.count + 1;
      basketDevice.save();

      return res.json(basketDevice);
   }

   async decDeviceCount(req, res, next) {
      const { basketDeviceId } = req.params;

      if (!basketDeviceId) {
         return next(ApiError.badRequest("Необходимо указать id устройства"));
      }

      const basketDevice = await BasketDevice.findOne({ where: { id: basketDeviceId } });

      if (!basketDevice) {
         return next(ApiError.badRequest("Устройство не было найдено"));
      }

      if (basketDevice.count === 1) {
         await BasketDevice.destroy({ where: { id: basketDeviceId } });
         return res.json({});
      }

      basketDevice.count = basketDevice.count - 1;
      basketDevice.save();

      return res.json(basketDevice);
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

      const { count, rows: basketDevices } = await BasketDevice.findAndCountAll({
         where: { basketId: basket.id },
      });

      const devices = [];

      for (const basketDevice of basketDevices) {
         const device = await Device.findOne({ where: { id: basketDevice.deviceId } });
         devices.push({
            ...device.toJSON(),
            basketDeviceId: basketDevice.id,
            count: basketDevice.count,
         });
      }

      return res.json({
         count,
         devices,
      });
   }
}

module.exports = new BasketController();
