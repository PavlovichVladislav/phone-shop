const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
   async create(req, res, next) {
      let device = null;

      try {
         let { name, price, brandId, typeId, info } = req.body;
         const { img } = req.files;
         let fileName = uuid.v4() + ".jpg";
         img.mv(path.resolve(__dirname, "..", "static", fileName));

         device = await Device.create({ name, price, brandId, typeId, img: fileName });

         if (info) {
            info = JSON.parse(info);
            info.forEach((feature) =>
               DeviceInfo.create({
                  title: feature.title,
                  description: feature.description,
                  deviceId: device.id,
               })
            );
         }

         return res.json(device);
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async getAll(req, res, next) {
      try {
         let { brandId, typeId, limit, page } = req.query;

         page = page || 1;
         limit = limit || 9;
         let offset = page * limit - limit;
         let result;

         if (!brandId && !typeId) {
            result = await Device.findAndCountAll({ limit, offset, order: [["createdAt", "ASC"]] });
         }

         if (brandId && !typeId) {
            result = await Device.findAndCountAll({
               where: { brandId },
               limit,
               offset,
               order: [["createdAt", "ASC"]],
            });
         }

         if (!brandId && typeId) {
            result = await Device.findAndCountAll({
               where: { typeId },
               limit,
               offset,
               order: [["createdAt", "ASC"]],
            });
         }

         if (brandId && typeId) {
            result = await Device.findAndCountAll({
               where: { typeId, brandId },
               limit,
               offset,
               order: [["createdAt", "ASC"]],
            });
         }

         return res.json({ count: result.count, devices: result.rows });
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async getOne(req, res) {
      const { id } = req.params;
      const device = await Device.findOne({
         where: { id },
         include: [{ model: DeviceInfo, as: "info" }],
      });

      return res.json(device);
   }
}

module.exports = new DeviceController();
