import React from 'react';
// import BEMHelper from 'react-bem-helper';
import Car from '../../assets/vehicles/car.svg';
import Van from '../../assets/vehicles/van.svg';
import Bike from '../../assets/vehicles/bike.svg';
import Quad from '../../assets/vehicles/quad.svg';
import Cards from '../Cards/Cards';

// const classes = new BEMHelper('container');

const VehicleType = () => {
    const cards = [
        { 
            image: Car,
            name: 'Osobný automobil',
            picked: true,
            action: undefined
        },
        { 
            image: Van,
            name: 'Úžitkové vozidlo do 3.5t',
            picked: false,
            action: undefined
        },
        { 
            image: Bike,
            name: 'Motorka',
            picked: false,
            action: undefined
        },
        { 
            image: Quad,
            name: 'Štvorkolka',
            picked: false,
            action: undefined
        }
    ];
    return (
        <Cards {...{cards}} />
    );
};

export default VehicleType;