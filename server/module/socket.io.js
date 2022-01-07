const moduleCreateTemplatePdf = require('./createPdf/createTemplate');
const moduleCreatePdf = require('./createPdf/createPdf');
const moduleSendEmail = require('./sendRaport/sendRaport');
const moduleRemovePdf = require('./createPdf/removePdf');

module.exports = (server) => {
    const io = require('../config/socket.io')(server);
    io.on('connection', function (socket) {
        console.log('connection with front end (socket io)');
        socket.on('SEND_RAPORT',async (dataRaport, callback) => {
            let templatePdf = await moduleCreateTemplatePdf(dataRaport);
            let fileName = await moduleCreatePdf(templatePdf,dataRaport);
            // await moduleSendEmail(fileName);
            // await moduleRemovePdf(fileName);
            callback('Dzięki!');
        })
    });
}