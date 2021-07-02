import { atom } from 'recoil';

enum EVehicleType {
    Car = 0,
    UpTo35Ton,
    Motorcycle,
    FourWheeler
}

enum EVehicleUtilisation {
    Normal = 0,
    Taxi,
    Rent,
    Vip,
    Dangerous
}

interface IVehicleParameters {
    licenseNumber: string | undefined;

    cylinderVolume: number;
    enginePower: number;
    price: number;
    dateOfMade: Date;
}

interface IVehicleOwner {
    drivingLicenseDate: Date;
    accidentIn3Years: boolean;
}

enum EInsuranceType {
    MCI = 0, // PZP
    AccidentInsurance
}

interface IInsuranceType {
    type: EInsuranceType;
    windowInsurance: boolean;
}

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
        licenseNumber: undefined,
        cylinderVolume: 50,
        enginePower: 100,
        price: 10000,
        dateOfMade: new Date(0)
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
