import EInsuranceType from '../utils/eInsuranceType';
import EVehicleType from '../utils/eVehicleType';
import EVehicleUtilisation from '../utils/eVehicleUtilisation';

export interface offer {
    vehicleType: EVehicleType,
    vehicleUtilisation: EVehicleUtilisation,
    engineDisplacement: number,
    engineMaxPower: number,
    price: number,
    productionDate: string,
    birthDate: string,
    drivingLicenseDate: string,
    accident: boolean,
    insuranceType: EInsuranceType,
    glassInsurance: boolean,
    offerPrice: number
}

export default offer;
