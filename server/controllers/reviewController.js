const { Rating, Device, Comment } = require("../models/models");
const ApiError = require("../error/ApiError");

class ReviewController {
   async createRate(req, res, next) {
      const { rate, userId, deviceId } = req.body;

      if (!rate || rate > 5 || rate < 1) {
         return next(ApiError.badRequest("Рэйтинг должен быть числом от 1 до 5"));
      }

      if (!userId || !deviceId) {
         return next(ApiError.badRequest("Необходимо указать id пользователя и устройства"));
      }

      const device = await Device.findOne({ where: { id: deviceId } });

      if (!device) {
         return next(ApiError.badRequest("Ошибка: устройство не было найдено"));
      }

      const reviews = await Rating.findAndCountAll({ where: { deviceId } });

      const newRating = (device.rating * reviews.count + +rate) / (+reviews.count + 1);
      device.rating = newRating.toFixed(2);

      await device.save();

      const rating = await Rating.create({ rate, userId, deviceId });

      return res.json({...rating, deviceRate: device.rating});
   }

   async createComment(req, res, next) {
      const { comment, userId, deviceId } = req.body;

      if (!comment) {
         return next(ApiError.badRequest("Не указан комментарий"));
      }

      if (!userId || !deviceId) {
         return next(ApiError.badRequest("Необходимо указать id пользователя и устройства"));
      }

      const device = await Device.findOne({ where: { id: deviceId } });

      if (!device) {
         return next(ApiError.badRequest("Ошибка: устройство не было найдено"));
      }

      const newComment = await Comment.create({ comment, userId, deviceId });

      return res.json(newComment);
   }

   async getComments(req, res, next) {
      const { deviceId } = req.params;

      if (!deviceId) {
         return next(ApiError.badRequest("Не указан id устройства"));
      }

      const comments = await Comment.findAndCountAll({ where: { deviceId } });

      return res.json({
        count: comments.count,
        comments: comments.rows
      });
   }
}

module.exports = new ReviewController();
