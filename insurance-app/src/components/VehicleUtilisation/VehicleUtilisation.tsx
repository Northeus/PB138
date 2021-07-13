import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { progressStateAtom, vehicleUtilisationStateAtom } from '../../store/atoms';
import { vehicleTypeState } from '../../store/selectors';
import EVehicleUtilisation from '../../utils/eVehicleUtilisation';
import Cards from '../Cards/Cards';
import EVehicleType from '../../utils/eVehicleType';

const VehicleUtilisation = (): JSX.Element => {
    const [vehicleUtilisation, setVehicleUtilisaiton] = useRecoilState(vehicleUtilisationStateAtom);
    const setProgress = useSetRecoilState(progressStateAtom);
    const getAction = (utilisation: EVehicleUtilisation) => {
        return async () => {
            setVehicleUtilisaiton(utilisation);
            setProgress(2);
        };
    };

    const cards = [
        {
            image: undefined,
            name: 'Bežné použitie',
            picked: vehicleUtilisation == EVehicleUtilisation.Normal,
            action: getAction(EVehicleUtilisation.Normal)
        }
    ];

    const vehicleType = useRecoilValue(vehicleTypeState);
    const allOptions = vehicleType == EVehicleType.Car || vehicleType == EVehicleType.UpTo35Ton;
    if (allOptions) {
        cards.push({
            image: undefined,
            name: 'Taxi',
            picked: vehicleUtilisation == EVehicleUtilisation.Taxi,
            action: getAction(EVehicleUtilisation.Taxi)
        });
    }

    cards.push({
        image: undefined,
        name: 'Vozidlo pre požičovňu',
        picked: vehicleUtilisation == EVehicleUtilisation.Rent,
        action: getAction(EVehicleUtilisation.Rent)
    },
    {
        image: undefined,
        name: 'Vozidlo s právom prednostnej jazdy',
        picked: vehicleUtilisation == EVehicleUtilisation.Vip,
        action: getAction(EVehicleUtilisation.Vip)
    });

    if (allOptions) {
        cards.push({
            image: undefined,
            name: 'Vozidlo na prepravu nebezpečných vecí',
            picked: vehicleUtilisation == EVehicleUtilisation.Dangerous,
            action: getAction(EVehicleUtilisation.Dangerous)
        });
    }

    return (
        <Cards {...{cards}} />
    );
};

export default VehicleUtilisation;