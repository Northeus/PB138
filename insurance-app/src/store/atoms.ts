import { atom } from 'recoil';
import { getNYearsBefore } from '../utils/dateUtils';
import EInsuranceType from '../utils/eInsuranceType';
import EVehicleType from '../utils/eVehicleType';
import EVehicleUtilisation from '../utils/eVehicleUtilisation';
import IInsuranceType from './models/InsuranceType';
import IVehicleOwner from './models/VehicleOwner';
import IVehicleParameters from './models/VehicleParameters';

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
        drivingLicenseDate: getNYearsBefore(new Date(), 1),
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
