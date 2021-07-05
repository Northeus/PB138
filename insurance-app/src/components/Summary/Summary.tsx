import React from 'react';
import { useRecoilValue } from 'recoil';
import { insuranceTypeState, vehicleParametersState, vehicleTypeState } from '../../store/selectors';

import '../Informations/Information.css';

const Summary = () => {
    // TODO: Calculate result sum based on user values
    const x = useRecoilValue(insuranceTypeState);
    console.log(x);
    return (
        <div className="information-block">
            <p>Cena havarijneho poistenia s pripoistenim skla pre vaše vozidlo je 333€.</p>
            <p>Pokiaľ si prajete uzavrieť s nami dané poistenie, kontaktujte nás prosím cez nižšie uvedené odkazy.</p>
        </div>
    );
};

export default Summary;