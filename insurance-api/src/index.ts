import express from 'express';
import cors from 'cors';
import { getCar } from './database';
import createResponse from './utils/response';
import { carNotFound } from './utils/errorMessages';
import { getNYearsBefore } from './utils/dateManipulation';
import pdf from 'html-pdf';
import pug from 'pug';
// import { validate } from 'json-schema';

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

const validate = require('express-jsonschema').validate;

app.get('/vehicle/:spz', async (req, res) => {
    const vehicle = await getCar(req.params.spz);

    if (!vehicle) {
        res.status(404)
            .send(createResponse({}, carNotFound));

        return;
    }

    res.send(createResponse(vehicle));
});

// Json schema
const OfferInputSchema = {
    type: 'object',
    properties: {
        vehicleType: {
            type: 'string',
            required: true,
            enum: ['Car', 'UpTo35Ton', 'Motorcycle', 'FourWheeler']
        },
        vehicleUtilisation: {
            type: 'string',
            required: true,
            enum: ['Normal', 'Taxi', 'Rent', 'Vip', 'Dangerous']
        },
        engineDisplacement: {
            type: 'number',
            required: true
        },
        engineMaxPower: {
            type: 'number',
            required: true
        },
        price: {
            type: 'number',
            required: true
        },
        productionDate: {
            type: 'string',
            required: true
        },
        birthDate: {
            type: 'string',
            required: true
        },
        drivingLicenseDate: {
            type: 'string',
            required: true
        },
        accident: {
            type: 'boolean',
            required: true
        },
        insuranceType: {
            type: 'string',
            required: true,
            enum: ['PZP', 'AccidentInsurance']
        },
        glassInsurance: {
            type: 'boolean',
            required: true
        },
    }
};

const validateEngineSpecs = (req: any) : string => {
    
    const {
        engineDisplacement,
        engineMaxPower,
    } = req.body;

    if (!Number.isInteger(engineDisplacement) || engineDisplacement < 0) {
        return 'Engine Displacement has to be a non-negative integer.';
    }
    if (!Number.isInteger(engineMaxPower) || engineMaxPower < 0) {
        return 'Engine Max power has to be a non-negative integer.';
    }
    return '';
};

const validatePrice = (req: any) : string => {
    
    const { price } = req.body;
    
    if (price < 0) {
        return 'Vehicle price has to be a non-negative number.';
    }
    return '';
};

const validateDates = (req: any) : string => {

    const {
        productionDate,
        birthDate,
        drivingLicenseDate
    } = req.body;

    if (isNaN(Date.parse(productionDate))) {
        return 'Production date has to be a valid date.';
    }
    if (isNaN(Date.parse(birthDate))) {
        return 'Birth date has to be a valid date.';
    }
    if (isNaN(Date.parse(drivingLicenseDate))) {
        return 'Driving licence date has to be a valid date.';
    }
    return '';
};

const validateBirthDrivingLicenseDates = (req: any) : string => {

    const {
        birthDate,
        drivingLicenseDate
    } = req.body;

    if (new Date(birthDate) > getNYearsBefore(new Date(), 18)) {
        return 'User must be at least 18 years old to use this app.';
    }
    if (new Date(birthDate) > getNYearsBefore(new Date(drivingLicenseDate), 17)) {
        return 'User must be at least 17 years old to have a Driving license.';
    }
    return '';
};

const validateBasedOnType = (req: any) : string => {

    const {
        vehicleType,
        vehicleUtilisation,
        glassInsurance
    } = req.body;

    if ( (vehicleType === 'Motorcycle' || vehicleType === 'FourWheeler')
        && (vehicleUtilisation === 'Taxi' || vehicleUtilisation === 'Dangerous' || glassInsurance) ) {
        return 'Some attributes are wrong because of vehicle type.';
    }
    return '';
};

const validateBasedOnInsurance = (req: any) : string => {
    
    const {
        insuranceType,
        glassInsurance
    } = req.body;
    
    if (glassInsurance && insuranceType === 'AccidentInsurance') {
        return 'Glass insurance cant be set with Accident insurance.';
    }
    return '';
};

const validateInput = (req: any, res: any, next: any) => {
    const errors : string[] = [];
    const validationFunctions = [
        validateEngineSpecs,
        validatePrice,
        validateDates,
        validateBirthDrivingLicenseDates,
        validateBasedOnType,
        validateBasedOnInsurance
    ];

    validationFunctions.map(f => {
        const errorMessage = f(req);
        if (errorMessage !== '') {
            errors.push(errorMessage);
        }
    });

    if (errors.length !== 0) {
        return res.status(400).json(createResponse({errors: errors}, 'Found error(s). See included array of errors.'));
    }

    next();
};

const includeInsuranceType = (insuranceType: string, glassInsurance: string) : number => {
    return insuranceType !== 'PZP' ? 700 : ( 100 + ( glassInsurance ? 10 : 0 ) );
};

const includeVehicleTypeUtilisation = (vehicleType: string, vehicleUtilisation: string) : number => {
    let result = 1;

    switch (vehicleType) {
    case 'Motorcycle':
        result *= 1.02;
        break;
    case 'FourWheeler':
        result *= 1.01;
        break;
    default:  // 'Car' || 'UpTo35Ton'
        result *= 1;
        break;
    }
    switch (vehicleUtilisation) {
    case 'Taxi':
        result *= 1.05;
        break;
    case 'Rent':
        result *= 1.2;
        break;
    case 'Vip':
        result *= 1.07;
        break;
    case 'Dangerous':
        result *= 1.2;
        break;
    default:  // 'Car'
        result *= 1;
        break;
    }

    return result;
};

const includeEngineSpecs = (displacement: number, maxPower: number) : number => {
    const powerDisplacementRatio = ( 1000 * maxPower ) / displacement;
    let result : number;

    result = 25 <= powerDisplacementRatio && powerDisplacementRatio < 65 ? 1.1 : 1;
    result = 65 <= powerDisplacementRatio ? 1.2 : 1;

    return result;
};

const computeNumOfYears = (input: string) : number => {
    const today = new Date();
    const inputParsed = new Date(input);
    let result = today.getFullYear() - inputParsed.getFullYear();
    const m = today.getMonth() - inputParsed.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < inputParsed.getDate())) {
        result--;
    }
    return result;
};

const evaluateVehicle = (productionDate: string, vehiclePrice: number) : number => {
    const yearsDifference = computeNumOfYears(productionDate);
    const evaluation = Math.max(0, vehiclePrice - (vehiclePrice * yearsDifference) / 20);

    if (5000 < evaluation && evaluation <= 10000) {
        return 1.05;
    }
    if (10000 < evaluation && evaluation <= 25000) {
        return 1.1;
    }
    if (25000 < evaluation) {
        return 1.2;
    }

    return 1;
};

const includeAge = (birthDate: string) : number => {
    const age = computeNumOfYears(birthDate);

    if (age < 25) {
        return 1.2;
    }
    if (25 <= age && age < 35) {
        return 1.15;
    }
    if (60 <= age && age < 70) {
        return 1.15;
    }
    if (70 <= age && age < 75) {
        return 1.2;
    }
    if (75 <= age && age < 80) {
        return 1.25;
    }
    if (80 <= age) {
        return 1.3;
    }

    return 1;
};

const includeDriversLicense = (drivingLicenseDate: string) : number => {
    const driversLicenseYears = computeNumOfYears(drivingLicenseDate);
    let result : number;

    result = driversLicenseYears < 5 ? 1.2 : 1;
    result = 5 <= driversLicenseYears && driversLicenseYears < 15 ? 1.15 : 1;

    return result;
};

const includeAccident = (accident: boolean) : number => accident ? 1.2 : 1;

app.post('/api/offer', validate({body: OfferInputSchema}), validateInput, function(req, res) {
    let priceResult = 0;
    const {
        vehicleType,
        vehicleUtilisation,
        engineDisplacement,
        engineMaxPower,
        price,
        productionDate,
        birthDate,
        drivingLicenseDate, 
        accident,
        insuranceType,
        glassInsurance
    } = req.body;

    priceResult += includeInsuranceType(insuranceType, glassInsurance);
    priceResult *= includeVehicleTypeUtilisation(vehicleType, vehicleUtilisation);
    priceResult *= includeEngineSpecs(engineDisplacement, engineMaxPower);
    priceResult *= evaluateVehicle(productionDate, price);
    priceResult *= includeAge(birthDate);
    priceResult *= includeDriversLicense(drivingLicenseDate);
    priceResult *= includeAccident(accident);

    res.json({ price: Math.round(priceResult * 100) / 100 });
});


// ################## PDF subor ########################################

app.post('/api/test-pdf', async (req, res) => {

    const offer = req.body;
    const renderedHtml = pug.renderFile('src/views/offerPdf.pug', { offer: offer });

    res.setHeader('Content-type', 'application/pdf');

    pdf.create(renderedHtml).toStream(function(err: any, stream: any){
        console.log(err);
        stream.pipe(res);
    });
});

// ################## PDF subor ########################################


app.use(function(err: any, req: any, res: any, next: any) {
 
    if (err.name === 'JsonSchemaValidation') {
        if (req.get('Content-Type') === 'application/json') {
            res.status(400).json({ error: 'Invalid input content. JsonSchemaValidation failed.' });
        } else {
            res.status(400).json({ error: 'Invalid content-type in input. JsonSchemaValidation failed.' });
        }
    } else {
        next(err);  // pass error to next error middleware handler
    }
});

const main = () => app.listen(port, () => console.log('Api is running.'));

main();
