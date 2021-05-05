const nodemailer = require("nodemailer");
require("dotenv").config();
async function sendEmail(mail) {
  try {
    let transporter = nodemailer.createTransport({
      host: `${process.env.HOST}`,
      port: 465,
      secure: true,
      auth: {
        user: `${process.env.USERMAIL}`,
        pass: `${process.env.PASSWORD}`,
      },
    });

    let info = await transporter.sendMail({
      from: `${process.env.SENDEREMAIL}`,
      to: mail,
      subject: "การดำเนินการสั่งซื้อสินค้า",
      text: "การสั่งซื้อถูกต้อง ทางเรากำลังจัดส่งสินค้า ขอบคุณที่ใช้บริการ",
    });
    return info;
  } catch (error) {
    throw error;
  }
}

module.exports = sendEmail;
