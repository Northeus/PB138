import React, { useEffect } from 'react';
import Car from '../../assets/vehicles/car.svg';
import Van from '../../assets/vehicles/van.svg';
import Bike from '../../assets/vehicles/bike.svg';
import Quad from '../../assets/vehicles/quad.svg';
import Cards from '../Cards/Cards';
import EVehicleType from '../../utils/eVehicleType';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { progressStateAtom, vehicleTypeStateAtom } from '../../store/atoms';
import RoutingPaths from '../../utils/routingPaths';

const VehicleType = () => {
    const history = useHistory();
    const [ vehicleType, setVehicleType] = useRecoilState(vehicleTypeStateAtom);
    const [ _, setProgress ] = useRecoilState(progressStateAtom);
    const getAction = (type: EVehicleType) => {
        return async () => {
            setVehicleType(type);
            await setProgress(1); // this await is very important, idk why
            history.push(RoutingPaths.VehicleUtilisation);
        };
    };
    const cards = [
        { 
            image: Car,
            name: 'Osobný automobil',
            picked: vehicleType == EVehicleType.Car,
            action: getAction(EVehicleType.Car)
        },
        { 
            image: Van,
            name: 'Úžitkové vozidlo do 3.5t',
            picked: vehicleType == EVehicleType.UpTo35Ton,
            action: getAction(EVehicleType.UpTo35Ton)
        },
        { 
            image: Bike,
            name: 'Motorka',
            picked: vehicleType == EVehicleType.Motorcycle,
            action: getAction(EVehicleType.Motorcycle)
        },
        { 
            image: Quad,
            name: 'Štvorkolka',
            picked: vehicleType == EVehicleType.FourWheeler,
            action: getAction(EVehicleType.FourWheeler)
        }
    ];
    return (
        <Cards {...{cards}} />
    );
};

export default VehicleType;