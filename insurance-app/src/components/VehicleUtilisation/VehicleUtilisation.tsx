import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { progressStateAtom, vehicleUtilisationStateAtom } from '../../store/atoms';
import { vehicleTypeState } from '../../store/selectors';
import EVehicleUtilisation, { vehicleUtilisationString } from '../../utils/eVehicleUtilisation';
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
            name: vehicleUtilisationString[EVehicleUtilisation.Normal],
            picked: vehicleUtilisation == EVehicleUtilisation.Normal,
            action: getAction(EVehicleUtilisation.Normal)
        }
    ];

    const vehicleType = useRecoilValue(vehicleTypeState);
    const allOptions = vehicleType == EVehicleType.Car || vehicleType == EVehicleType.UpTo35Ton;
    if (allOptions) {
        cards.push({
            image: undefined,
            name: vehicleUtilisationString[EVehicleUtilisation.Taxi],
            picked: vehicleUtilisation == EVehicleUtilisation.Taxi,
            action: getAction(EVehicleUtilisation.Taxi)
        });
    }

    cards.push({
        image: undefined,
        name: vehicleUtilisationString[EVehicleUtilisation.Rent],
        picked: vehicleUtilisation == EVehicleUtilisation.Rent,
        action: getAction(EVehicleUtilisation.Rent)
    },
    {
        image: undefined,
        name: vehicleUtilisationString[EVehicleUtilisation.Vip],
        picked: vehicleUtilisation == EVehicleUtilisation.Vip,
        action: getAction(EVehicleUtilisation.Vip)
    });

    if (allOptions) {
        cards.push({
            image: undefined,
            name: vehicleUtilisationString[EVehicleUtilisation.Dangerous],
            picked: vehicleUtilisation == EVehicleUtilisation.Dangerous,
            action: getAction(EVehicleUtilisation.Dangerous)
        });
    }

    return (
        <Cards {...{cards}} />
    );
};

export default VehicleUtilisation;