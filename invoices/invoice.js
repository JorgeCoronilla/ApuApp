
const invoice = {
	client: {
		user_name: 'Mario',
		surname_1: 'Martin',
		surname_2: 'Martin',
		address: 'calle manzana 12',
		nif: '11111111f',
		id: 1,
	},
	items: [
		{
			item: 'TC 100',
		},
		{
			item: 'USB_EXT',
		},
	],
	total: 8000,
	invoice_nr: 1234,
};

function generateCustomerInformation(doc, bills) {
	
	doc.text(`Numero de factura: ${bills.id_bill}`, 50, 200)
		.text(`Fecha: ${bills.bill_date}`, 50, 215)
		.text(`Total: ${bills.total}`, 50, 130)
		.text(bills.user_name, 300, 200)
		.text(bills.surname_1, 300, 200)
		.text(bills.surname_2, 300, 200)
		.text(bills.address, 300, 215)
		.text(bills.nif)
		.moveDown();
}


const fs = require('fs');
const PDFDocument = require('pdfkit');

function createInvoice(invoice, path) {
	let doc = new PDFDocument({ margin: 50 });

	generateHeader(doc); // Invoke `generateHeader` function.
	generateFooter(doc); // Invoke `generateFooter` function.

	doc.end();
	doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
	doc.image('../public/logo.png', 50, 45, { width: 50 })
		.fillColor('#444444')
		.fontSize(20)
		.text('ApuApp', 110, 57)
		.fontSize(10)
		.text('123 Main Street', 200, 65, { align: 'right' })
		.text('Springfield, 10025', 200, 80, { align: 'right' })
		.moveDown();
}

function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Muchas gracias por confiar en Apu!',
		50,
		780,
		{ align: 'center', width: 500 },
	);
}


function generateTableRow(doc, y, c1) {
	doc.fontSize(10)
		.text(c1, 280, y, { width: 90, align: 'center' })

}

function generateInvoiceTable(doc, bills) {
	let items = bills.items.split('#');
	let i,
		invoiceTableTop = 330;

	for (i = 0; i < items.length; i++) {
		const item = items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item,
		);
	}
}

module.exports = {
	createInvoice,
};

