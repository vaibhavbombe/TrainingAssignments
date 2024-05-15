//1. ------Install dependencies (Express for TypeScript)
import express, {Request , Response} from 'express';
import { secretHandshake } from './logic';
//2.-------Initiate dependency (Instance of Express -- app)
const app = express();
const port = 8000; //
//4.-------Add Functionality using Express instance i.e app

// eg call http://localhost:8000/getDataType/Hello
// output : {"message":"Hello","source":"string"}
app.get('getDataType/:datatype',(req: Request,res: Response)=>{
    var variable: any = req.params.datatype;
    res.json({
        message: variable,
        source : typeof(variable)
    })
})


// eg call http://localhost:8000/split/CentraLogic_Employee
// output : {"revisedString":"CentraLogic Employee"}
app.get('/split/:userInputString', (req: Request, res: Response) => {
    var variable: any = req.params.userInputString;
    var revisedString: string = variable.split('_').join(' ');
    res.json({
        revisedString: revisedString
    });
});

// eg call http://localhost:8000/concatenate/Hello?param2=World
// output : {"revisedString":"HelloWorld"}
app.get('/concatenate/:param1', (req: Request, res: Response) => {
    const param1: string = req.params.param1; // param
    const param2: string = req.query.param2 as string; // queryParameter
    const concatenatedString: string = param1 + param2;
    res.json({
        revisedString: concatenatedString
    });
});

// eg call http://localhost:8000/isLeapYear/2000
// output : {"year":2000,"isLeapYear":true}
app.get('/isLeapYear/:year', (req: Request, res: Response) => {
    const year: number = parseInt(req.params.year);
    let isLeapYear: boolean = false;

    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                isLeapYear = true;
            }
        } else {
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
app.get('/secretHandShake/:number', (req: Request, res: Response) => {
    try {
        const message: string[] = secretHandshake(parseInt(req.params.number));
        res.json({
            message: message
        });
    } catch (error: any) {
        res.json({
            error: error.message
        });
    }
});


//3.------Listen to the required port using Express instance i.e app
app.listen(port, ()=> {
    console.log(` Hii we are comfortable in NodeJS `);
})