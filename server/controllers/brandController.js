const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
    async create (req, res, next) {
        const {name, query} = req.body;

        if (!name || !query) {
            return next(ApiError.badRequest("Необходимо указать все данные"));
         }

        const brand = await Brand.create({name, query});
        return res.json(brand);
    }

    async getAll (req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }
}

module.exports = new BrandController();