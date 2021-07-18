import React, { useEffect, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { useRecoilValue } from 'recoil';
import { insuranceTypeState, vehicleOwnerState, vehicleParametersState, vehicleTypeState, vehicleUtilisationState } from '../../store/selectors';
import { getDateString } from '../../utils/dateUtils';
import EInsuranceType, { insuranceTypeString } from '../../utils/eInsuranceType';
import EVehicleType, { vehicleTypeString } from '../../utils/eVehicleType';
import { vehicleUtilisationString } from '../../utils/eVehicleUtilisation';
import '../Info/Info.css';

const classes = new BEMHelper('information-block');

const Summary = (): JSX.Element => {
    const vehicleType = useRecoilValue(vehicleTypeState);
    const vehicleUtilisation = useRecoilValue(vehicleUtilisationState);
    if (vehicleType == undefined || vehicleUtilisation == undefined) {
        return <div></div>;
    }

    const vehicleParams = useRecoilValue(vehicleParametersState);
    const vehicleOwner = useRecoilValue(vehicleOwnerState);
    const insuranceType = useRecoilValue(insuranceTypeState);

    const [price, setPrice] = useState(0);
    const [offerId, setOfferId] = useState('');

    useEffect(() => {
        const fetchPrice = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vehicleType: vehicleType,
                    vehicleUtilisation: vehicleUtilisation,
                    engineDisplacement: vehicleParams.cylinderVolume,
                    engineMaxPower: vehicleParams.enginePower,
                    price: vehicleParams.price,
                    productionDate: vehicleParams.dateOfMade,
                    birthDate: vehicleOwner.birthDate,
                    drivingLicenseDate: vehicleOwner.drivingLicenseDate,
                    accident: vehicleOwner.accidentIn3Years,
                    insuranceType: insuranceType.type,
                    glassInsurance: insuranceType.windowInsurance
                })
            };

            const response = await fetch('http://localhost:5000/api/offer', requestOptions)
                .catch(() => undefined);
                
            if (!response || response.status != 200) {
                setPrice(0);
            }
            else {
                const responseJson = await response.json();
                setPrice(+responseJson.data.offerPrice);
                setOfferId(responseJson.data.id);
            }
        };
        fetchPrice();
    }, []);

    if (price <= 0.0) {
        return (
            <div {...classes()}>
                ERROR: Could not connect to database
            </div>
        );
    }
    return (
        <div {...classes()}>
            <h1 {...classes('title')}>Naša ponuka pre Vás</h1>
            <p>
                <span {...classes('item-title')}>Typ vozidla: </span>
                <span {...classes('item-body')}>{vehicleTypeString[vehicleType]}</span>
            </p>
            <p>
                <span {...classes('item-title')}>Využitie vozidla: </span>
                <span {...classes('item-body')}>{vehicleUtilisationString[vehicleUtilisation]}</span>
            </p>
            <p>
                <span {...classes('item-title')}>Objem valcov: </span>
                <span {...classes('item-body')}>{vehicleParams.cylinderVolume} cm³</span>
            </p>
            <p>
                <span {...classes('item-title')}>Maximálny výkon: </span>
                <span {...classes('item-body')}>{vehicleParams.enginePower} kW</span>
            </p>
            <p>
                <span {...classes('item-title')}>Kúpna cena: </span>
                <span {...classes('item-body')}>{vehicleParams.price} €</span>
            </p>
            <p>
                <span {...classes('item-title')}>Dátum výroby: </span>
                <span {...classes('item-body')}>{getDateString(vehicleParams.dateOfMade)}</span>
            </p>
            <p>
                <span {...classes('item-title')}>Dátum narodenia: </span>
                <span {...classes('item-body')}>{getDateString(vehicleOwner.birthDate)}</span>
            </p>
            <p>
                <span {...classes('item-title')}>Dátum získania VO/VP: </span>
                <span {...classes('item-body')}>{getDateString(vehicleOwner.drivingLicenseDate)}</span>
            </p>
            <p>
                <span {...classes('item-title')}>Mali ste nehodu za posledné 3 roky? </span>
                <span {...classes('item-body')}>{vehicleOwner.accidentIn3Years ? 'Áno' : 'Nie'}</span>

            </p>
            <p>
                <span {...classes('item-title')}>Typ poistenia: </span>
                <span {...classes('item-body')}>{insuranceTypeString[insuranceType.type]}
                    {insuranceType.type == EInsuranceType.PZP
                     && (vehicleType == EVehicleType.Car
                         ||vehicleType == EVehicleType.UpTo35Ton)
                     && (insuranceType.windowInsurance ? ' (s pripoistením skla)' : ' (bez pripoistenia skla)')}
                </span>
            </p>
            <p {...classes('price')}>
                <span {...classes('item-title')}>ROČNÁ CENA: </span>
                <span {...classes('item-body')}>{price} €</span>
            </p>
            <a {...classes('pdf')} href={`http://localhost:5000/api/offer/${offerId}/pdf`} target='_blank'>PDF s ponukou</a>
            <p>Pokiaľ si prajete uzavrieť s nami dané poistenie, kontaktujte nás prosím cez nižšie uvedené odkazy.</p>
        </div>
    );
};

export default Summary;