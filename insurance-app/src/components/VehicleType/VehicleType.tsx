import React from 'react';
import Car from '../../assets/vehicles/car.svg';
import Van from '../../assets/vehicles/van.svg';
import Bike from '../../assets/vehicles/bike.svg';
import Quad from '../../assets/vehicles/quad.svg';
import Cards from '../Cards/Cards';
import EVehicleType, { vehicleTypeString } from '../../utils/eVehicleType';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { progressStateAtom, vehicleTypeStateAtom } from '../../store/atoms';

const VehicleType = (): JSX.Element => {
    const [vehicleType, setVehicleType] = useRecoilState(vehicleTypeStateAtom);
    const setProgress = useSetRecoilState(progressStateAtom);
    const getAction = (type: EVehicleType) => {
        return async () => {
            setVehicleType(type);
            setProgress(1);
        };
    };
    const cards = [
        {
            image: Car,
            name: vehicleTypeString[EVehicleType.Car],
            picked: vehicleType == EVehicleType.Car,
            action: getAction(EVehicleType.Car)
        },
        {
            image: Van,
            name: vehicleTypeString[EVehicleType.UpTo35Ton],
            picked: vehicleType == EVehicleType.UpTo35Ton,
            action: getAction(EVehicleType.UpTo35Ton)
        },
        {
            image: Bike,
            name: vehicleTypeString[EVehicleType.Motorcycle],
            picked: vehicleType == EVehicleType.Motorcycle,
            action: getAction(EVehicleType.Motorcycle)
        },
        {
            image: Quad,
            name: vehicleTypeString[EVehicleType.FourWheeler],
            picked: vehicleType == EVehicleType.FourWheeler,
            action: getAction(EVehicleType.FourWheeler)
        }
    ];
    return (
        <Cards {...{cards}} />
    );
};

export default VehicleType;