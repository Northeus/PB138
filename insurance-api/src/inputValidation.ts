// // Json schema
// const OfferInputSchema = {
//     type: 'object',
//     properties: {
//         vehicleType: {
//             type: 'string',
//             required: true,
//             enum: ['Car', 'UpTo35Ton', 'Motorcycle', 'FourWheeler']
//         },
//         vehicleUtilisation: {
//             type: 'string',
//             required: true,
//             enum: ['Normal', 'Taxi', 'Rent', 'Vip', 'Dangerous']
//         },
//         engineDisplacement: {
//             type: 'number',
//             required: true
//         },
//         engineMaxPower: {
//             type: 'number',
//             required: true
//         },
//         price: {
//             type: 'number',
//             required: true
//         },
//         productionDate: {
//             type: 'string',
//             required: true
//         },
//         birthDate: {
//             type: 'string',
//             required: true
//         },
//         drivingLicenseDate: {
//             type: 'string',
//             required: true
//         },
//         accident: {
//             type: 'boolean',
//             required: true
//         },
//         insuranceType: {
//             type: 'string',
//             required: true,
//             enum: ['PZP', 'AccidentInsurance']
//         },
//         glassInsurance: {
//             type: 'boolean',
//             required: true
//         },
//     }
// };

// const YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1000;

// const validateEngineSpecs = (engineDisplacement: number, engineMaxPower: number) : boolean => {
//     if (!Number.isInteger(engineDisplacement) || engineDisplacement < 0) {
//         errorMessage = 'Engine Displacement has to be a non-negative integer.';
//         return true;
//     }
//     if (!Number.isInteger(engineMaxPower) || engineMaxPower < 0) {
//         errorMessage = 'Engine Max power has to be a non-negative integer.';
//         return true;
//     }
//     return false;
// };

// const validatePrice = (price: number) : boolean => {
//     if (price < 0) {
//         errorMessage = 'Vehicle price has to be a non-negative number.';
//         return true;
//     }
//     return false;
// };

// const validateDates = (productionDate: string, birthDate: string, drivingLicenseDate: string) : boolean => {
//     if (isNaN(Date.parse(productionDate))) {
//         errorMessage = 'Production date has to be a valid date.';
//         return true;
//     }
//     if (isNaN(Date.parse(birthDate))) {
//         errorMessage = 'Birth date has to be a valid date.';
//         return true;
//     }
//     if (isNaN(Date.parse(drivingLicenseDate))) {
//         errorMessage = 'Driving licence date has to be a valid date.';
//         return true;
//     }
//     return false;
// };

// const validateBirthDrivingLicenseDates = (birthDate: string, drivingLicenseDate: string) : boolean => {
//     const usersAge = Math.floor( (dateNow - Date.parse(birthDate)) / YEAR_IN_MILLISECONDS );
//     if (usersAge < 17) {
//         errorMessage = 'User must be at least 17 years old to use this app.';
//         return true;
//     }
//     const drivingLicenseAge = Math.floor( (Date.parse(drivingLicenseDate) - Date.parse(birthDate)) / YEAR_IN_MILLISECONDS );
//     if (drivingLicenseAge < 17) {
//         errorMessage = 'User must be at least 17 years old to have a Driving license.';
//         return true;
//     }
//     return false;
// };

// const validateBasedOnType = (vehicleType: string, vehicleUtilisation: string, glassInsurance: boolean) : boolean => {
//     if ( (vehicleType === 'Motorcycle' || vehicleType === 'FourWheeler')
//         && (vehicleUtilisation === 'Taxi' || vehicleUtilisation === 'Dangerous' || glassInsurance) ) {
//         errorMessage = 'Some attributes are wrong because of vehicle type.';
//         return true;
//     }
//     return false;
// };

// const validateBasedOnInsurance = (insuranceType: string, glassInsurance: boolean) : boolean => {
//     if (glassInsurance && insuranceType === 'AccidentInsurance') {
//         errorMessage = 'Glass insurance cant be set with Accident insurance.';
//         return true;
//     }
//     return false;
// };

// const validateInput = (req: any, res: any, next: any) => {
//     dateNow = Date.now();
//     const {
//         vehicleType,
//         vehicleUtilisation,
//         engineDisplacement,
//         engineMaxPower,
//         price,
//         productionDate,
//         birthDate,
//         drivingLicenseDate, 
//         insuranceType,
//         glassInsurance
//     } = req.body;
//     if ( validateEngineSpecs(engineDisplacement, engineMaxPower) || validatePrice(price) || validateDates(productionDate, birthDate, drivingLicenseDate)
//         || validateBirthDrivingLicenseDates(birthDate, drivingLicenseDate) || validateBasedOnType(vehicleType, vehicleUtilisation, glassInsurance)
//         || validateBasedOnInsurance(insuranceType, glassInsurance) ) {
//         res.status(400).json({error: errorMessage});
//         return;
//     }
//     next();
// };
