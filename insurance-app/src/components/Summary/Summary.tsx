import React from 'react';
import { useRecoilValue } from 'recoil';
import { insuranceTypeState, vehicleOwnerState, vehicleParametersState, vehicleTypeState, vehicleUtilisationState } from '../../store/selectors';
import EInsuranceType, { insuranceTypeString } from '../../utils/eInsuranceType';
import { vehicleTypeString } from '../../utils/eVehicleType';
import { vehicleUtilisationString } from '../../utils/eVehicleUtilisation';
import '../Informations/Information.css';


const Summary = (): JSX.Element => {
    // TODO: Calculate result sum based on user values
    const vehicleType = useRecoilValue(vehicleTypeState);
    const vehicleUtilisation = useRecoilValue(vehicleUtilisationState);
    if (vehicleType == undefined || vehicleUtilisation == undefined) {
        return <div></div>;
    }

    const vehicleParams = useRecoilValue(vehicleParametersState);
    const vehicleOwner = useRecoilValue(vehicleOwnerState);
    const insuranceType = useRecoilValue(insuranceTypeState);

    return (
        <div className="information-block">
            <h1 className="information-block__title">Naša ponuka pre Vás</h1>
            <p>
                <span className="information-block__item-title">Typ vozidla: </span>
                <span className="information-block__item-body">{vehicleTypeString[vehicleType]}</span>
            </p>
            <p>
                <span className="information-block__item-title">Využitie vozidla: </span>
                <span className="information-block__item-body">{vehicleUtilisationString[vehicleUtilisation]}</span>
            </p>
            <p>
                <span className="information-block__item-title">Objem valcov: </span>
                <span className="information-block__item-body">{vehicleParams.cylinderVolume.toString()} cm³</span>
            </p>
            <p>
                <span className="information-block__item-title">Maximálny výkon: </span>
                <span className="information-block__item-body">{vehicleParams.enginePower.toString()} kW</span>
            </p>
            <p>
                <span className="information-block__item-title">Kúpna cena: </span>
                <span className="information-block__item-body">{vehicleParams.price.toString()} €</span>
            </p>
            <p>
                <span className="information-block__item-title">Dátum výroby: </span>
                <span className="information-block__item-body">{vehicleParams.dateOfMade.toString()}</span>
            </p>
            <p>
                <span className="information-block__item-title">Dátum narodenia: </span>
                <span className="information-block__item-body">{vehicleOwner.birthDate.toString()}</span>
            </p>
            <p>
                <span className="information-block__item-title">Dátum získanie VO/VP: </span>
                <span className="information-block__item-body">{vehicleOwner.drivingLicenseDate.toString()}</span>
            </p>
            <p>
                <span className="information-block__item-title">Mali ste nehodu za posledné 3 roky? </span>
                <span className="information-block__item-body">{vehicleOwner.accidentIn3Years ? 'Áno' : 'Nie'}</span>

            </p>
            <p>
                <span className="information-block__item-title">Typ poistenia: </span>
                <span className="information-block__item-body">{insuranceTypeString[insuranceType.type]}
                    {insuranceType.type == EInsuranceType.PZP && (insuranceType.windowInsurance ? ' (s pripoistením skla)' : ' (bez pripoistenia skla)')}</span>
            </p>
            <p className="information-block__price">
                <span className="information-block__item-title">ROČNÁ CENA: </span>
                <span className="information-block__item-body">{'333€'}</span>
            </p>
            <p>Pokiaľ si prajete uzavrieť s nami dané poistenie, kontaktujte nás prosím cez nižšie uvedené odkazy.</p>
        </div>
    );
};

export default Summary;