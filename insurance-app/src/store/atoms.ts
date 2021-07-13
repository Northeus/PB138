import { atom } from 'recoil';
import { getNYearsAfter, getNYearsBefore } from '../utils/dateManipulation';
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
    birthDate: Date;
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

export const vehicleTypeStateAtom = atom<EVehicleType | undefined>({
    key: 'vehicleTypeAtom',
    default: undefined
});

export const vehicleUtilisationStateAtom = atom<EVehicleUtilisation | undefined>({
    key: 'vehicleUtilisationAtom',
    default: undefined
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
        birthDate: getNYearsBefore(new Date(), 18),
        drivingLicenseDate: getNYearsAfter(new Date(), 17 - 18),
        accidentIn3Years: false
    }
});

export const insuranceTypeStateAtom = atom<IInsuranceType>({
    key: 'insuranceTypeAtom',
    default: {
        type: EInsuranceType.PZP,
        windowInsurance: false
    }
});
