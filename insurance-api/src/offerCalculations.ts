import offerReq from './models/offerReq';
import EInsuranceType from './utils/eInsuranceType';
import EVehicleType from './utils/eVehicleType';
import EVehicleUtilisation from './utils/eVehicleUtilisation';

export const includeInsuranceType = (req: offerReq) : number => {
    const { insuranceType, glassInsurance } = req.body;
    return insuranceType !== EInsuranceType.PZP
        ? 700
        : ( 100 + ( glassInsurance ? 10 : 0 ) );
};

const vehilceTypeMultiplayer = (vehicleType : EVehicleType) => {
    switch (vehicleType) {
    case EVehicleType.Motorcycle:
        return 1.02;
    case EVehicleType.FourWheeler:
        return 1.01;
    case EVehicleType.UpTo35Ton:
    case EVehicleType.Car:
        return 1;
    default:
        return 1;
    }
};

const vehicleUtilisationMultiplayer = (vehicleUtilisation : EVehicleUtilisation) => {
    switch (vehicleUtilisation) {
    case EVehicleUtilisation.Taxi:
        return 1.05;
    case EVehicleUtilisation.Rent:
        return 1.2;
    case EVehicleUtilisation.Vip:
        return 1.07;
    case EVehicleUtilisation.Dangerous:
        return 1.2;
    case EVehicleUtilisation.Normal:
        return 1;
    default:
        return 1;
    }
};

export const includeVehicleTypeUtilisation = (req: offerReq) : number =>
    vehilceTypeMultiplayer(req.body.vehicleType) * vehicleUtilisationMultiplayer(req.body.vehicleUtilisation);

export const includeEngineSpecs = (req: offerReq) : number => {
    const powerDisplacementRatio = ( 1000 * req.body.engineMaxPower ) / req.body.engineDisplacement;

    return powerDisplacementRatio && powerDisplacementRatio < 65
        ? 1.1
        : 65 <= powerDisplacementRatio
            ? 1.2
            : 1;
};

const hasCompletedFullYear = (date: Date) => {
    const today = new Date();
    const months = today.getMonth() - date.getMonth();
    
    return months < 0 || (months === 0 && today.getDate() < date.getDate());
};

const computeNumOfYears = (input: string) : number => {
    const today = new Date();
    const date = new Date(input);
    
    const years = today.getFullYear() - date.getFullYear();
    
    return hasCompletedFullYear(date)
        ? years
        : years - 1;
};

const evaluationMultiplayer = (evaluation: number) : number => {
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

export const evaluateVehicle = (req: offerReq) : number => {
    const yearsDifference = computeNumOfYears(req.body.productionDate);
    const evaluation = Math.max(0, req.body.price * (1 - yearsDifference / 20));

    return evaluationMultiplayer(evaluation);
};

const ageMultiplayer = (age: number) : number => {
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

export const includeAge = (req: offerReq) : number => {
    const { birthDate } = req.body;
    const age = computeNumOfYears(birthDate);

    return ageMultiplayer(age);
};

export const includeDriversLicense = (req: offerReq) : number => {
    const { drivingLicenseDate } = req.body;
    const driversLicenseYears = computeNumOfYears(drivingLicenseDate);

    return driversLicenseYears < 5
        ? 1.2
        : 5 <= driversLicenseYears && driversLicenseYears < 15 
            ? 1.15
            : 1;
};

export const includeAccident = (req: offerReq) : number =>
    req.body.accident
        ? 1.2
        : 1;
