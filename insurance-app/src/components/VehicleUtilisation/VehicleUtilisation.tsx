import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { progressStateAtom, vehicleUtilisationStateAtom } from '../../store/atoms';
import EVehicleUtilisation from '../../utils/eVehicleUtilisation';
import Cards from '../Cards/Cards';

const VehicleUtilisation = () => {
    const [vehicleUtilisation, setVehicleUtilisaiton] = useRecoilState(vehicleUtilisationStateAtom);
    const [ _, setProgress ] = useRecoilState(progressStateAtom);
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
        },
        { 
            image: undefined,
            name: 'Taxi',
            picked: vehicleUtilisation == EVehicleUtilisation.Taxi,
            action: getAction(EVehicleUtilisation.Taxi)
        },
        { 
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
        },
        { 
            image: undefined,
            name: 'Vozidlo na prepravu nebezpečných vecí',
            picked: vehicleUtilisation == EVehicleUtilisation.Dangerous,
            action: getAction(EVehicleUtilisation.Dangerous)
        }
    ];
    return (
        <Cards {...{cards}} />
    );
};

export default VehicleUtilisation;