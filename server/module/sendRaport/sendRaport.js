const nodemailer = require("nodemailer");

module.exports = async (fileName) => {

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
  });
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Ewa system" <foo@example.com>', // sender address
    to: "mosakamil@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });  

  console.log("Message sent: %s", info.messageId);



}