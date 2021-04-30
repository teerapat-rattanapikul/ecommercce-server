const UserModel = require("../models/user");
const UserShopModel = require("../models/user_shop");
const genJWT = require("../services/genJWT");
const { Op } = require("sequelize");
module.exports = {
  login: async (req, res) => {
    var errorMsg = "";
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
          const token = genJWT({ id: result.id, name: result.name });
          return res.json({
            token: token,
            id: result.id,
            name: result.name,
            status: true,
          });
        } else {
          errorMsg = "รหัสผ่านไม่ถูกต้อง";
        }
      } else {
        errorMsg = "อีเมลไม่ถูกค้อง";
      }
      res.json({ status: false, error: errorMsg });
    } catch (error) {
      throw error;
    }
  },
  register: async (req, res) => {
    console.log(req.body);
    try {
      const result = await UserModel.findOne({
        where: { email: req.body.email },
      });
      console.log(result);
      if (result === null) {
        await UserModel.create({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
        });
        return res.json({ status: true });
      }
      res.json({ status: false, error: "อีเมลนี้มีผู้ใช้แล้ว" });
    } catch (error) {
      throw error;
    }
  },
  tokenCheck: async (req, res) => {
    if (req.id !== null && req.id !== undefined) {
      const returnData = {
        id: req.id,
        name: req.name,
      };
      res.json(returnData);
    }
  },
  getUsertoHire: async (req, res) => {
    try {
      const getUser = await UserModel.findAll({
        where: {
          id: { [Op.not]: req.body.id },
        },
        attributes: ["id", "email", "name"],
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
