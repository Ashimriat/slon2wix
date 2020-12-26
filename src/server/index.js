const ExcelJS = require('exceljs');
const path = require('path');
const http = require('http');
const fs = require('fs');
const {
	SERVER_ROUTES, LISTS_NAMES, INFO_ROWS_START_INDEX
} = require('./constants');


const WORKBOOK_OPERATOR = new ExcelJS.Workbook();

const getPricesForm = (worksheet) => {
	const headInfoRow = worksheet.getRow(7);
	// Цена начинается в 4 колонке
	const priceCell = headInfoRow.getCell(4);

	let tmpCellIndex = 4,
		tmpCell;

	tmpCell = headInfoRow.getCell(tmpCellIndex + 1);
	// если цена занимает только одну колонку - она простая
	if (tmpCell.master !== priceCell) {
		return [];
	}
	
	let res = [];
	const pricesTypesRow = worksheet.getRow(8);
	let isPriceFinished = false;
	do {
		if (headInfoRow.getCell(tmpCellIndex).master === priceCell) {
			res.push(pricesTypesRow.getCell(tmpCellIndex).value);
			tmpCellIndex++;
		} else {
			isPriceFinished = true;
		}
	} while (!isPriceFinished);
	
	return res;
};

const getPrices = (pricesForm, itemRow) => {
	let res = {},
		tmpCellIndex = 4,
		price;
	if (pricesForm.length > 1) {
		pricesForm.forEach(form => {
			price = itemRow.getCell(tmpCellIndex).value;
			tmpCellIndex++;
			if (!price) return;
			if (typeof price === 'object') {
				price = price.result;
			}
			res[form] = price;
		});
	} else {
		res = {
			[itemRow.getCell(3).value]: itemRow.getCell(4).value
		};
	}
	return res;
};

const parseFile = async (filePath) => {
	const workbook = await WORKBOOK_OPERATOR.xlsx.readFile(filePath);
	const res = [];
	let worksheet,
		column,
		categoryIndex,
		pricesForm,
		row;
	
	LISTS_NAMES.forEach((listName) => {
		worksheet = workbook.getWorksheet(listName);
		pricesForm = getPricesForm(worksheet);
		column = worksheet.getColumn(1);
		column.values.forEach((value, rowIndex) => {
			// Если закончилась шапка
			if (rowIndex >= INFO_ROWS_START_INDEX) {
				row = worksheet.getRow(rowIndex);
				// Ячейки с названиями категорий смержены
				if (row.getCell(1).master === row.getCell(2).master) {
					res.push({
						name: value,
						itemType: listName,
						items: []
					});
				} else {
					// Берем ряд со всеми данными о конкретном товаре
					categoryIndex = res.length ? res.length - 1 : 0;
					res[categoryIndex].items.push({
						vendorCode: value,
						link: row.getCell(2).value.hyperlink,
						price: getPrices(pricesForm, row)
					});
				}
			}
		});
	});
	return res;
};

http.createServer(async (request, response) => {
	let dateData = [];
	request.on('data', chunk => {
		data.push(chunk);
	});
	request.on('end', () => {
		const { url } = request;
		if (url === SERVER_ROUTES.PARSE_INFO_FILE) {
			const filePath = path.resolve(__dirname, 'Товары.xlsx');
			fs.stat(filePath, async (e, stats) => {
				// TODO: сверка даты последнего обновления у сервака с тем, что есть в хранилище на фронте
				let data = {};
				if (stats.mtimeMs) {
					const info = await parseFile(filePath);
					data.status = 'new';
					data.info = info;
					data.timeStamp = stats.mtime;
				} else {
					data.status = 'old';
				}
				response.writeHead(200, {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				});
				response.end(JSON.stringify(data));
			});
		}
	});
}).listen(3000, e => {
	if (e) {
		return console.log('something bad happened', e)
	}
	console.log(`server is listening on port 3000`);
});
