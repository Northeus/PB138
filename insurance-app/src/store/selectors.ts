import { selector } from 'recoil';
import { insuranceTypeStateAtom, vehicleOwnerStateAtom, vehicleParametersStateAtom, vehicleTypeStateAtom, vehicleUtilisationStateAtom } from './atoms';

export const vehicleTypeState = selector({
    key: 'vehicleType',
    get: ({ get }) => {
        return get(vehicleTypeStateAtom);
    },
});

export const vehicleUtilisationState = selector({
    key: 'vehicleUtilisation',
    get: ({ get }) => {
        return get(vehicleUtilisationStateAtom);
    },
});

export const vehicleLicenseNumberState = selector({
    key: 'vehicleLicenseNumber',
    get: ({ get }) => {
        return get(vehicleParametersStateAtom).licenseNumber;
    },
});

export const vehicleParametersState = selector({
    key: 'vehicleParameters',
    get: ({ get }) => {
        const vehicleParams = get(vehicleParametersStateAtom);
        return { 'cylinderVolume': vehicleParams.cylinderVolume,
            'enginePower': vehicleParams.enginePower,
            'price': vehicleParams.price,
            'dateOfMade': vehicleParams.dateOfMade };
    },
});

export const vehicleOwnerState = selector({
    key: 'vehicleOwner',
    get: ({ get }) => {
        return get(vehicleOwnerStateAtom);
    },
});

export const insuranceTypeState = selector({
    key: 'insuranceType',
    get: ({ get }) => {
        return get(insuranceTypeStateAtom);
    },
});
