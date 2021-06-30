import React from 'react';
import Cards from '../Cards/Cards';

const VehicleUtilisation = () => {
    const cards = [
        { 
            image: undefined,
            name: 'Bežné použitie',
            picked: true,
            action: undefined
        },
        { 
            image: undefined,
            name: 'Taxi',
            picked: false,
            action: undefined
        },
        { 
            image: undefined,
            name: 'Vozidlo pre požičovňu',
            picked: false,
            action: undefined
        },
        { 
            image: undefined,
            name: 'Vozidlo s právom prednostnej jazdy',
            picked: false,
            action: undefined
        },
        { 
            image: undefined,
            name: 'Vozidlo na prepravu nebezpečných vecí',
            picked: false,
            action: undefined
        }
    ];
    return (
        <Cards {...{cards}} />
    );
};

export default VehicleUtilisation;