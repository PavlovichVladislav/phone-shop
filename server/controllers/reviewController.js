const { Rating, Device } = require('../models/models');
const ApiError = require ('../error/ApiError');

class ReviewController {
    async create (req, res, next) {
        const {rate, userId, deviceId} = req.body;

        if (!rate || rate > 5 || rate < 1) {
            return next(ApiError.badRequest("Рэйтинг должен быть числом от 1 до 5"));
        }

        if (!userId || !deviceId) {
            return next(ApiError.badRequest("Необходимо указать id пользователя и устройства"));
        }

        const device = await Device.findOne({where: {id: deviceId}}); 
        
        if (!device) {
            return next(ApiError.badRequest("Ошибка: устройство не было найдено"));
        }

        const reviews = await Rating.findAndCountAll({where: {deviceId}})

        const newRating = (device.rating * reviews.count + +rate) / (+reviews.count + 1);
        device.rating = newRating.toFixed(2);
        
        await device.save();

        const rating = await Rating.create({rate, userId, deviceId});

        return res.json(rating);
    }

    // async getAll (req, res) {
    //     const types = await Type.findAll();
    //     return res.json(types);
    // }
}

module.exports = new ReviewController();