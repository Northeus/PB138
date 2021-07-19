import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './VehicleParameters.css';
import '../../utils/css/Form.css';
import './LicensePlate.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { progressStateAtom, vehicleParametersStateAtom } from '../../store/atoms';
import { getDateString } from '../../utils/dateUtils';

const classes = new BEMHelper('form');
const licenseClasses = new BEMHelper('license-plate');

const licensePlaceRegex = new RegExp('[A-Z]{2,2}([0-9]{3,3}[A-Z]{2,2}|[A-NP-WYZ]([A-Z]{3,3}[A-Z0-9]|[A-Z]{2,2}[A-Z0-9][0-9]))');

const validationSchema = Yup.object().shape({
    cylinderVolume: Yup.number()
        .min(0, '*Zadaná hodnota musí byť aspoň 0.')
        .integer('*Zadaná hodnota musí byť prirodzené číslo.')
        .required('*Je nutné zadať hodnotu.'),
    enginePower: Yup.number()
        .min(0, '*Zadaná hodnota musí byť aspoň 0.')
        .integer('*Zadaná hodnota musí byť prirodzené číslo.')
        .required('*Je nutné zadať hodnotu.'),
    price: Yup.number()
        .min(0, '*Zadaná hodnota musí byť aspoň 0.')
        .required('*Je nutné zadať hodnotu.'),
    creationDate: Yup.date()
        .max(new Date(), '*Zadaný dátum musí byť z minulosti.')
        .required('*Je nutné zadať dátum')
});

const VehicleParameters = (): JSX.Element => {
    const [vehicleParameters, setVehicleParameters] = useRecoilState(vehicleParametersStateAtom);
    const setProgress = useSetRecoilState(progressStateAtom);
    const [licenseResponse, setLicenseResponse] = useState(new Response());
    const formikLicense = useFormik({
        initialValues: {licensePlate: vehicleParameters.licensePlate},
        validate: async (values) => {
            if (!values.licensePlate || values.licensePlate === '') {
                return { licensePlate: '*Je nutné zadať hodnotu.' };
            }
            if (!licensePlaceRegex.test(values.licensePlate.toUpperCase())) {
                return { licensePlate: '*Nevalidná ŠPZ' };
            }
            const response = await fetch(`http://localhost:5000/vehicle/${values.licensePlate.toUpperCase()}`)
                .catch(() => {
                    return undefined;
                });
            if (!response) {
                return {licensePlate: '*Problém s pripojením k databáze'};
            }
            if (response.status == 404) {
                if (response.bodyUsed) {
                    return { licensePlate: '*Problém s validáciou' };
                }
                const responseJson = await response.json();
                return { licensePlate: `*${responseJson.message}` };
            }
            setLicenseResponse(response);
            return { };
        },
        onSubmit: async (values) => {
            const responseJson = await licenseResponse.json();
            if (licenseResponse.status == 404) {
                if (licenseResponse.bodyUsed) {
                    return;
                }

                return;
            }

            setVehicleParameters({
                licensePlate: values.licensePlate,
                cylinderVolume: responseJson.data.engineDisplcementMl,
                enginePower: responseJson.data.powerKw,
                price: responseJson.data.marketPriceEur,
                creationDate: new Date(responseJson.data.madeAt),
            });
            setProgress(3);
        }
    });

    const formikParameters = useFormik({
        initialValues: {
            cylinderVolume: vehicleParameters.cylinderVolume,
            enginePower: vehicleParameters.enginePower,
            price: vehicleParameters.price,
            creationDate: getDateString(vehicleParameters.creationDate)
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setVehicleParameters({
                licensePlate: vehicleParameters.licensePlate,
                cylinderVolume: values.cylinderVolume,
                enginePower: values.enginePower,
                price: values.price,
                creationDate: new Date(values.creationDate)
            });
            setProgress(3);
        }
    });
    return (
        <>
            <form {...classes({ modifiers: ['centered', 'plate'] })} onSubmit={formikLicense.handleSubmit}>
                <label {...classes('label')} htmlFor='licensePlate'>Nájdenie ŠPZ:</label>
                <input
                    {...licenseClasses('number')}
                    onChange={formikLicense.handleChange}
                    value={formikLicense.values.licensePlate}
                    type="text"
                    spellCheck="false"
                    autoComplete="off"
                    maxLength={7}
                    minLength={7}
                    name="licensePlate"
                    id="licensePlate"
                />
                {formikLicense.errors.licensePlate && <span {...classes('error')}>{formikLicense.errors.licensePlate}</span>}
                <button {...classes('submit')} type="submit">Ďalej</button>
            </form>
            <form {...classes({modifier: 'parameters'})} onSubmit={formikParameters.handleSubmit}>
                <label {...classes('label')}>
                    Objem motora v cm³:
                    <input
                        {...classes('input')}
                        onChange={formikParameters.handleChange}
                        value={formikParameters.values.cylinderVolume}
                        type="number"
                        name="cylinderVolume"
                        id="cylinderVolume"
                    />
                </label>
                {formikParameters.errors.cylinderVolume && <span {...classes('error')}>{formikParameters.errors.cylinderVolume}</span>}
                <label {...classes('label')}>
                    Výkon motora v kW:
                    <input
                        {...classes('input')}
                        onChange={formikParameters.handleChange}
                        value={formikParameters.values.enginePower}
                        type="number"
                        name="enginePower"
                        id="enginePower"
                    />
                </label>
                {formikParameters.errors.enginePower && <span {...classes('error')}>{formikParameters.errors.enginePower}</span>}
                <label {...classes('label')}>
                    Pôvodna cena v €:
                    <input
                        {...classes('input')}
                        onChange={formikParameters.handleChange}
                        value={formikParameters.values.price}
                        type="number"
                        name="price"
                        id="price"
                    />
                </label>
                {formikParameters.errors.price && <span {...classes('error')}>{formikParameters.errors.price}</span>}
                <label {...classes('label')}>
                    Dátum výroby vozu:
                    <input
                        {...classes('input')}
                        onChange={formikParameters.handleChange}
                        value={formikParameters.values.creationDate}
                        type="date"
                        max={getDateString(new Date())}
                        name="creationDate"
                        id="creationDate"
                    />
                </label>
                {formikParameters.errors.creationDate && <span {...classes('error')}>{formikParameters.errors.creationDate}</span>}
                <button {...classes('submit')} type="submit">Ďalej</button>
            </form>
        </>
    );
};

export default VehicleParameters;