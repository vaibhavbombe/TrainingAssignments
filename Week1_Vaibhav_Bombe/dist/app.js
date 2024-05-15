"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//1. ------Install dependencies (Express for TypeScript)
const express_1 = __importDefault(require("express"));
const secretHandShake_1 = require("./secretHandShake");
//2.-------Initiate dependency (Instance of Express -- app)
const app = (0, express_1.default)();
const port = 8000; //
//4.-------Add Functionality using Express instance i.e app
// eg call http://localhost:8000/getDataType/Hello
// output : {"message":"Hello","source":"string"}
app.get('getDataType/:datatype', (req, res) => {
    var variable = req.params.datatype;
    res.json({
        message: variable,
        source: typeof (variable)
    });
});
// eg call http://localhost:8000/split/CentraLogic_Employee
// output : {"revisedString":"CentraLogic Employee"}
app.get('/split/:userInputString', (req, res) => {
    var variable = req.params.userInputString;
    var revisedString = variable.split('_').join(' ');
    res.json({
        revisedString: revisedString
    });
});
// eg call http://localhost:8000/concatenate/Hello?param2=World
// output : {"revisedString":"HelloWorld"}
app.get('/concatenate/:param1', (req, res) => {
    const param1 = req.params.param1; // param
    const param2 = req.query.param2; // queryParameter
    const concatenatedString = param1 + param2;
    res.json({
        revisedString: concatenatedString
    });
});
// eg call http://localhost:8000/isLeapYear/2000
// output : {"year":2000,"isLeapYear":true}
app.get('/isLeapYear/:year', (req, res) => {
    const year = parseInt(req.params.year);
    let isLeapYear = false;
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                isLeapYear = true;
            }
        }
        else {
            isLeapYear = true;
        }
    }
    res.json({
        year: year,
        isLeapYear: isLeapYear
    });
});
// eg call http://localhost:8000/secretHandShake
// output : {"message":"Secret handshake successful!"}
app.get('/secretHandShake/:number', (req, res) => {
    try {
        const message = (0, secretHandShake_1.secretHandshake)(parseInt(req.params.number));
        res.json({
            message: message
        });
    }
    catch (error) {
        res.json({
            error: error.message
        });
    }
});
//3.------Listen to the required port using Express instance i.e app
app.listen(port, () => {
    console.log(` Hii we are comfortable in NodeJS `);
});
//# sourceMappingURL=app.js.map