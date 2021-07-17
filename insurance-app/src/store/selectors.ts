import { selector } from 'recoil';
import { insuranceTypeStateAtom, progressStateAtom, vehicleOwnerStateAtom, vehicleParametersStateAtom, vehicleTypeStateAtom, vehicleUtilisationStateAtom } from './atoms';

export const progressState = selector({
    key: 'progress',
    get: ({ get }) => {
        return get(progressStateAtom);
    },
});

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
        return get(vehicleParametersStateAtom).licensePlate;
    },
});

export const vehicleParametersState = selector({
    key: 'vehicleParameters',
    get: ({ get }) => {
        const vehicleParams = get(vehicleParametersStateAtom);
        return { 'cylinderVolume': vehicleParams.cylinderVolume,
            'enginePower': vehicleParams.enginePower,
            'price': vehicleParams.price,
            'dateOfMade': vehicleParams.creationDate };
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
