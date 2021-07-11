import express from 'express';
import cors from 'cors';
import { getCar } from './database';
import createResponse from './utils/response';
import { carNotFound } from './utils/errorMessages';

const port = 3000;
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

// enum EVehicleType {
//     'Car',
//     'UpTo35Ton',
//     'Motorcycle',
//     'FourWheeler'
// }

// enum EVehicleUtilisation {
//     'Normal',
//     'Taxi',
//     'Rent',
//     'Vip',
//     'Dangerous'
// }

// enum EInsuranceType {
//     'PZP',
//     'AccidentInsurance'
// }


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

let errorMessage: string;
let dateNow: number;
let priceResult: number;

const YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1000;

const validateEngineSpecs = (engineDisplacement: number, engineMaxPower: number) : boolean => {
    if (!Number.isInteger(engineDisplacement) || engineDisplacement < 0) {
        errorMessage = 'Engine Displacement has to be a non-negative integer.';
        return true;
    }
    if (!Number.isInteger(engineMaxPower) || engineMaxPower < 0) {
        errorMessage = 'Engine Max power has to be a non-negative integer.';
        return true;
    }
    return false;
};

const validatePrice = (price: number) : boolean => {
    if (price < 0) {
        errorMessage = 'Vehicle price has to be a non-negative number.';
        return true;
    }
    return false;
};

const validateDates = (productionDate: string, birthDate: string, drivingLicenseDate: string) : boolean => {
    if (isNaN(Date.parse(productionDate))) {
        errorMessage = 'Production date has to be a valid date.';
        return true;
    }
    if (isNaN(Date.parse(birthDate))) {
        errorMessage = 'Birth date has to be a valid date.';
        return true;
    }
    if (isNaN(Date.parse(drivingLicenseDate))) {
        errorMessage = 'Driving licence date has to be a valid date.';
        return true;
    }
    return false;
};

const validateBirthDrivingLicenseDates = (birthDate: string, drivingLicenseDate: string) : boolean => {
    const usersAge = Math.floor( (dateNow - Date.parse(birthDate)) / YEAR_IN_MILLISECONDS );
    if (usersAge < 17) {
        errorMessage = 'User must be at least 17 years old to use this app.';
        return true;
    }
    const drivingLicenseAge = Math.floor( (Date.parse(drivingLicenseDate) - Date.parse(birthDate)) / YEAR_IN_MILLISECONDS );
    if (drivingLicenseAge < 17) {
        errorMessage = 'User must be at least 17 years old to have a Driving license.';
        return true;
    }
    return false;
};

const validateBasedOnType = (vehicleType: string, vehicleUtilisation: string, glassInsurance: boolean) : boolean => {
    if ( (vehicleType === 'Motorcycle' || vehicleType === 'FourWheeler')
        && (vehicleUtilisation === 'Taxi' || vehicleUtilisation === 'Dangerous' || glassInsurance) ) {
        errorMessage = 'Some attributes are wrong because of vehicle type.';
        return true;
    }
    return false;
};

const validateBasedOnInsurance = (insuranceType: string, glassInsurance: boolean) : boolean => {
    if (glassInsurance && insuranceType === 'AccidentInsurance') {
        errorMessage = 'Glass insurance cant be set with Accident insurance.';
        return true;
    }
    return false;
};

const validateInput = (req: any, res: any, next: any) => {
    dateNow = Date.now();
    const {
        vehicleType,
        vehicleUtilisation,
        engineDisplacement,
        engineMaxPower,
        price,
        productionDate,
        birthDate,
        drivingLicenseDate, 
        insuranceType,
        glassInsurance
    } = req.body;
    if ( validateEngineSpecs(engineDisplacement, engineMaxPower) || validatePrice(price) || validateDates(productionDate, birthDate, drivingLicenseDate)
        || validateBirthDrivingLicenseDates(birthDate, drivingLicenseDate) || validateBasedOnType(vehicleType, vehicleUtilisation, glassInsurance)
        || validateBasedOnInsurance(insuranceType, glassInsurance) ) {
        res.status(400).json({error: errorMessage});
        return;
    }
    next();
};

const includeInsuranceType = (insuranceType: string, glassInsurance: string) : void => {
    if (insuranceType === 'PZP') {
        priceResult += 100 + ( glassInsurance ? 10 : 0 );
    }
    else {
        priceResult += 700;
    }
};

const includeVehicleTypeUtilisation = (vehicleType: string, vehicleUtilisation: string) : void => {
    switch (vehicleType) {
    case 'Motorcycle':
        priceResult *= 1.02;
        break;
    case 'FourWheeler':
        priceResult *= 1.01;
        break;
    default:  // 'Car' || 'UpTo35Ton'
        priceResult *= 1;
        break;
    }
    switch (vehicleUtilisation) {
    case 'Taxi':
        priceResult *= 1.05;
        break;
    case 'Rent':
        priceResult *= 1.2;
        break;
    case 'Vip':
        priceResult *= 1.07;
        break;
    case 'Dangerous':
        priceResult *= 1.2;
        break;
    default:  // 'Car'
        priceResult *= 1;
        break;
    }
};

const includeEngineSpecs = (displacement: number, maxPower: number) : void => {
    const mernyObjemovyVykon = ( 1000 * maxPower ) / displacement; // no clue, how is it in english
    if (25 <= mernyObjemovyVykon && mernyObjemovyVykon < 65) {
        priceResult *= 1.1;
    } else if (65 <= mernyObjemovyVykon) {
        priceResult *= 1.2;
    }
};

const evaluateVehicle = (productionDate: string, vehiclePrice: number) : void => {
    const parsedProductionDate = Date.parse(productionDate);
    const yearsDifference = Math.floor((dateNow - parsedProductionDate) / YEAR_IN_MILLISECONDS);

    const evaluation = Math.max(0, vehiclePrice - (vehiclePrice * yearsDifference) / 20);

    if (5000 < evaluation && evaluation <= 10000) {
        priceResult *= 1.05;
    }
    if (10000 < evaluation && evaluation <= 25000) {
        priceResult *= 1.1;
    }
    if (25000 < evaluation) {
        priceResult *= 1.2;
    }
};

const includeAge = (birthDate: string) : void => {
    const parsedBirthDate = Date.parse(birthDate);
    const age = Math.floor((dateNow - parsedBirthDate) / YEAR_IN_MILLISECONDS);

    if (age < 25) {
        priceResult *= 1.2;
    }
    if (25 <= age && age < 35) {
        priceResult *= 1.15;
    }
    if (60 <= age && age < 70) {
        priceResult *= 1.15;
    }
    if (70 <= age && age < 75) {
        priceResult *= 1.2;
    }
    if (75 <= age && age < 80) {
        priceResult *= 1.25;
    }
    if (80 <= age) {
        priceResult *= 1.3;
    }
};

const includeDriversLicense = (drivingLicenseDate: string) : void => {
    const parsedDrivingLicenseDate = Date.parse(drivingLicenseDate);
    const driversLicenseYears = Math.floor((dateNow - parsedDrivingLicenseDate) / YEAR_IN_MILLISECONDS);

    if (driversLicenseYears < 5) {
        priceResult *= 1.2;
    }
    if (5 <= driversLicenseYears && driversLicenseYears < 15) {
        priceResult *= 1.15;
    }
};

const includeAccident = (accident: boolean) : void => {
    if (accident) {
        priceResult *= 1.2;
    }
};

app.post('/api/offer', validate({body: OfferInputSchema}), validateInput, function(req, res) {
    priceResult = 0;
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

    includeInsuranceType(insuranceType, glassInsurance);
    includeVehicleTypeUtilisation(vehicleType, vehicleUtilisation);
    includeEngineSpecs(engineDisplacement, engineMaxPower);
    evaluateVehicle(productionDate, price);
    includeAge(birthDate);
    includeDriversLicense(drivingLicenseDate);
    includeAccident(accident);

    res.json({ price: Math.round(priceResult * 100) / 100 });
});

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
