import EInsuranceType from './utils/eInsuranceType';
import EVehicleType from './utils/eVehicleType';
import EVehicleUtilisation from './utils/eVehicleUtilisation';

export const includeInsuranceType = (req: { body: { insuranceType: EInsuranceType, glassInsurance: boolean; }; }) : number => {
    const { insuranceType, glassInsurance } = req.body;
    return insuranceType !== EInsuranceType.PZP ? 700 : ( 100 + ( glassInsurance ? 10 : 0 ) );
};

export const includeVehicleTypeUtilisation = (req: { body: { vehicleType: EVehicleType; vehicleUtilisation: EVehicleUtilisation; }; }) : number => {
    const { vehicleType, vehicleUtilisation } = req.body;
    let result = 1;

    switch (vehicleType) {
    case EVehicleType.Motorcycle:
        result *= 1.02;
        break;
    case EVehicleType.FourWheeler:
        result *= 1.01;
        break;
    default:  // 'Car' || 'UpTo35Ton'
        result *= 1;
        break;
    }
    switch (vehicleUtilisation) {
    case EVehicleUtilisation.Taxi:
        result *= 1.05;
        break;
    case EVehicleUtilisation.Rent:
        result *= 1.2;
        break;
    case EVehicleUtilisation.Vip:
        result *= 1.07;
        break;
    case EVehicleUtilisation.Dangerous:
        result *= 1.2;
        break;
    default:  // 'Car'
        result *= 1;
        break;
    }

    return result;
};

export const includeEngineSpecs = (req: { body: { displacement: number; maxPower: number; }; }) : number => {
    const { displacement, maxPower } = req.body;
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

export const evaluateVehicle = (req: { body: { productionDate: string; vehiclePrice: number; }; }) : number => {
    const { productionDate, vehiclePrice } = req.body;
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

export const includeAge = (req: { body: { birthDate: string; }; }) : number => {
    const { birthDate } = req.body;
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

export const includeDriversLicense = (req: { body: { drivingLicenseDate: string; }; }) : number => {
    const { drivingLicenseDate } = req.body;
    const driversLicenseYears = computeNumOfYears(drivingLicenseDate);
    let result : number;

    result = driversLicenseYears < 5 ? 1.2 : 1;
    result = 5 <= driversLicenseYears && driversLicenseYears < 15 ? 1.15 : 1;

    return result;
};

export const includeAccident = (req: { body: { accident: boolean; }; }) : number => req.body.accident ? 1.2 : 1;
