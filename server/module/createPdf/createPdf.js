const fonts = {
	Roboto: {
		normal: `${__dirname}/fonts/Roboto-Regular.ttf`,
        bold: `${__dirname}/fonts/Roboto-Medium.ttf`,		
		italics: `${__dirname}/fonts/Roboto-Italic.ttf`,
		bolditalics: `${__dirname}/fonts/Roboto-MediumItalic.ttf`
	}
};

const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts);
const fs = require('fs');

module.exports = (templatePdf, dataRaport) => {
    let splitSelectedWorker = dataRaport.data.workerInfo.selectedWorker.split(' ');
    let fileName = `Raport_Dzienny_${splitSelectedWorker[0]}_${splitSelectedWorker[1]}_${dataRaport.data.workerInfo.timeDateWork.dateWork}.pdf`;
    let pdfDoc = printer.createPdfKitDocument(templatePdf);
    pdfDoc.pipe(fs.createWriteStream(`${__dirname}/` + fileName));
	pdfDoc.end();
	return fileName;
}