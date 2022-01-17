const nodemailer = require("nodemailer");

module.exports = async (fileName, addressEmail, dateWork, worker) => {
  console.log(fileName + ' ' + addressEmail + ' ' + dateWork + ' ' + worker);
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
    from: '"RAPORT DZIENNY"', // sender address
    to: addressEmail, // list of receivers
    subject: `[RAPORT DZIENNY ${dateWork}] ${worker}`, // Subject line
    attachments: [{
      filename: fileName,
      path : `${__dirname}/../createPdf/${fileName}`
    }]
  });  

  console.log("Message sent: %s", info.messageId);



}