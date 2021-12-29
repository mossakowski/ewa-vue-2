


module.exports = (server) => {
    const io = require('../config/socket.io')(server);
    const moduleCreateTemplatePdf = require('./createPdf/createTemplate');
    const moduleCreatePdf = require('./createPdf/createPdf');

    io.on('connection', function (socket) {
        socket.on('SEND_RAPORT',async (dataRaport, callback) => {
            let templatePdf = await moduleCreateTemplatePdf(dataRaport);
            await moduleCreatePdf(templatePdf,dataRaport);
            callback('Dzięki!');
        })
    });
}