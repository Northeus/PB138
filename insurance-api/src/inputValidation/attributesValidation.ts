import offerReq from '../models/offerReq';
import { getNYearsBefore } from '../utils/dateManipulation';
import EInsuranceType from '../utils/eInsuranceType';
import EVehicleType from '../utils/eVehicleType';
import EVehicleUtilisation from '../utils/eVehicleUtilisation';
import createResponse from '../utils/response';

const validateEngineSpecs = (req: offerReq) : string => {
    
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

const validatePrice = (req: offerReq) : string => req.body.price < 0 ? 'Vehicle price has to be a non-negative number.' : '';

const validateDates = (req: offerReq) : string => {

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

const validateBirthDrivingLicenseDates = (req: offerReq) : string => {

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

const validateBasedOnType = (req: offerReq) : string => {

    const {
        vehicleType,
        vehicleUtilisation,
        glassInsurance
    } = req.body;

    if ( (vehicleType === EVehicleType.Motorcycle || vehicleType === EVehicleType.FourWheeler)
        && (vehicleUtilisation === EVehicleUtilisation.Taxi || vehicleUtilisation === EVehicleUtilisation.Dangerous || glassInsurance) ) {
        return 'Some attributes are wrong because of vehicle type.';
    }
    return '';
};

const validateBasedOnInsurance = (req: offerReq) : string => {
    
    const {
        insuranceType,
        glassInsurance
    } = req.body;
    
    if (glassInsurance && insuranceType === EInsuranceType.AccidentInsurance) {
        return 'Glass insurance cant be set with Accident insurance.';
    }
    return '';
};

export const validateInputOffer = (req: offerReq, res: any, next: any) : void => {

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
