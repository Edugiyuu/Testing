// Import dependencies
const fs = require("fs");
const XLSX = require("xlsx");
const jsontoxml = require("jsontoxml");

const workbook = XLSX.readFile("Pasta1.xlsx")
const worksheet = workbook.Sheets['Planilha1']

const arr = XLSX.utils.sheet_to_json(worksheet)
console.log(arr);
