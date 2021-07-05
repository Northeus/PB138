import { atom } from 'recoil';
import EInsuranceType from '../utils/eInsuranceType';
import EVehicleType from '../utils/eVehicleType';
import EVehicleUtilisation from '../utils/eVehicleUtilisation';

interface IVehicleParameters {
    licensePlate: string | undefined;

    cylinderVolume: number;
    enginePower: number;
    price: number;
    creationDate: Date;
}

interface IVehicleOwner {
    drivingLicenseDate: Date;
    accidentIn3Years: boolean;
}

interface IInsuranceType {
    type: EInsuranceType;
    windowInsurance: boolean;
}

export const progressStateAtom = atom<number>({
    key: 'progressAtom',
    default: 0
});

export const vehicleTypeStateAtom = atom<EVehicleType>({
    key: 'vehicleTypeAtom',
    default: EVehicleType.Car
});

export const vehicleUtilisationStateAtom = atom<EVehicleUtilisation>({
    key: 'vehicleUtilisationAtom',
    default: EVehicleUtilisation.Normal
});

export const vehicleParametersStateAtom = atom<IVehicleParameters>({
    key: 'vehicleParametersAtom',
    default: {
        licensePlate: '',
        cylinderVolume: 50,
        enginePower: 100,
        price: 10000,
        creationDate: new Date()
    }
});

export const vehicleOwnerStateAtom = atom<IVehicleOwner>({
    key: 'vehicleOwnerAtom',
    default: {
        drivingLicenseDate: new Date(),
        accidentIn3Years: false,
    }
});

export const insuranceTypeStateAtom = atom<IInsuranceType>({
    key: 'insuranceTypeAtom',
    default: {
        type: EInsuranceType.MCI,
        windowInsurance: false
    }
});
