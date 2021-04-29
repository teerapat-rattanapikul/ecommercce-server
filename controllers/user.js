const UserModel = require("../models/user");
const UserShopModel = require("../models/user_shop");
const { Op } = require("sequelize");
module.exports = {
  login: async (req, res) => {
    try {
      const result = await UserModel.findOne({
        where: { email: req.body.email },
      });
      if (result) {
        if (req.body.password === result.password) {
          await UserModel.update(
            { email: req.body.email },
            { where: { email: req.body.email } }
          );
          return res.json({ ...result, status: true });
        }
      }
      res.json({ status: false });
    } catch (error) {
      throw error;
    }
  },
  register: async (req, res) => {
    try {
      const result = await UserModel.findOne({
        where: { email: req.body.email },
      });
      console.log(result);
      if (result === null) {
        await UserModel.create({
          email: req.body.email,
          password: req.body.password,
        });
        return res.json({ status: true });
      }
      res.json({ status: false });
    } catch (error) {
      throw error;
    }
  },
  getUsertoHire: async (req, res) => {
    try {
      const getUser = await UserModel.findAll({
        where: {
          id: { [Op.not]: req.body.id },
        },
        attributes: ["id", "email"],
      });
      const userList = { userList: getUser };
      const getUserShop = await UserShopModel.findAll({
        where: {
          [Op.and]: [
            { shopId: req.body.shopId },
            { role: { [Op.not]: "admin" } },
          ],
        },
        attributes: ["userId"],
      });
      const staffList = [];
      getUserShop.map((staff) => {
        staffList.push(staff.userId);
      });
      userList["staffList"] = staffList;
      res.json(userList);
    } catch (error) {
      throw error;
    }
  },
  hireUser: async (req, res) => {
    console.log(req.body);
    try {
      await UserShopModel.create({
        userId: req.body.userId,
        shopId: req.body.shopId,
        shop_name: req.body.shopName,
        role: "staff",
      });
      res.json(true);
    } catch (error) {
      throw error;
    }
  },
  log: async (req, res) => {
    console.log(req.body.shopId);
    try {
      // const user = await UserShopModel.findAll({
      //   include: { model: UserModel },
      // where: {
      //   [Op.and]: [
      //     { shopId: req.body.shopId },
      //     { role: { [Op.not]: "admin" } },
      //   ],
      // },
      // });
      const user = await UserModel.findAll({
        include: {
          model: UserShopModel,
          where: {
            [Op.and]: [
              { shopId: req.body.shopId },
              { role: { [Op.not]: "admin" } },
            ],
          },
        },
        order: [["updatedAt", "DESC"]],
      });
      res.json(user);
    } catch (error) {
      throw error;
    }
  },
};
