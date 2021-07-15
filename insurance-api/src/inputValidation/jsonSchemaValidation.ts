import EInsuranceType from '../utils/eInsuranceType';
import EVehicleType from '../utils/eVehicleType';
import EVehicleUtilisation from '../utils/eVehicleUtilisation';

const sharedInputProperties = {
    vehicleType: {
        type: 'string',
        required: true,
        enum: Object.values(EVehicleType)
    },
    vehicleUtilisation: {
        type: 'string',
        required: true,
        enum: Object.values(EVehicleUtilisation)
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
        enum: Object.values(EInsuranceType)
    },
    glassInsurance: {
        type: 'boolean',
        required: true
    }
};

export const OfferInputSchema = {
    type: 'object',
    properties: {...sharedInputProperties}
};

export const PdfInputSchema = {
    type: 'object',
    properties: {
        ...sharedInputProperties,
        offer: {
            type: 'number',
            required: true
        }
    }
};