const moduleCreateTemplatePdf = require('./createPdf/createTemplate');
const moduleCreatePdf = require('./createPdf/createPdf');
const moduleSendEmail = require('./sendRaport/sendRaport')

module.exports = (server) => {
    const io = require('../config/socket.io')(server);
    io.on('connection', function (socket) {
        console.log('connection');
        socket.on('SEND_RAPORT',async (dataRaport, callback) => {
            let templatePdf = await moduleCreateTemplatePdf(dataRaport);
            await moduleCreatePdf(templatePdf,dataRaport);
            await moduleSendEmail();
            callback('Dzięki!');
        })
    });
}