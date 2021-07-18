import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './VehicleParameters.css';
import '../Form/Form.css';
import '../LicensePlate/LicensePlate.css';
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
    const formik1 = useFormik({
        initialValues: {licensePlate: vehicleParameters.licensePlate},
        validate: async (values) => {
            if (!values.licensePlate || values.licensePlate === '') {
                return { licensePlate: 'Required' };
            }
            if (!licensePlaceRegex.test(values.licensePlate.toUpperCase())) {
                return { licensePlate: 'Invalid' };
            }

            setLicenseResponse(await fetch('http://localhost:5000/vehicle/' + values.licensePlate.toUpperCase()));
            if (licenseResponse.status == 404) {
                if (licenseResponse.bodyUsed) {
                    return { licensePlate: 'Could not validate' };
                }

                const responseJson = await licenseResponse.json();
                return { licensePlate: responseJson.message };
            }

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

            console.log(responseJson.data.powerKw);
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

    const formik2 = useFormik({
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
            <form {...classes({ modifiers: ['centered', 'plate'] })} onSubmit={formik1.handleSubmit}>
                <label {...classes('label')} htmlFor='licensePlate'>Nájdenie ŠPZ:</label>
                <input
                    {...licenseClasses('number')}
                    onChange={formik1.handleChange}
                    value={formik1.values.licensePlate}
                    type="text"
                    spellCheck="false"
                    autoComplete="off"
                    maxLength={7}
                    minLength={7}
                    name="licensePlate"
                    id="licensePlate"
                />
                {formik1.errors.licensePlate && <span {...classes('error')}>{formik1.errors.licensePlate}</span>}
                <button {...classes('submit')} type="submit">Ďalej</button>
            </form>
            <form {...classes({modifier: 'parameters'})} onSubmit={formik2.handleSubmit}>
                <label {...classes('label')}>
                    Objem motora v cm³:
                    <input
                        {...classes('input')}
                        onChange={formik2.handleChange}
                        value={formik2.values.cylinderVolume}
                        type="number"
                        name="cylinderVolume"
                        id="cylinderVolume"
                    />
                </label>
                {formik2.errors.cylinderVolume && <span {...classes('error')}>{formik2.errors.cylinderVolume}</span>}
                <label {...classes('label')}>
                    Výkon motora v kW:
                    <input
                        {...classes('input')}
                        onChange={formik2.handleChange}
                        value={formik2.values.enginePower}
                        type="number"
                        name="enginePower"
                        id="enginePower"
                    />
                </label>
                {formik2.errors.enginePower && <span {...classes('error')}>{formik2.errors.enginePower}</span>}
                <label {...classes('label')}>
                    Pôvodna cena v €:
                    <input
                        {...classes('input')}
                        onChange={formik2.handleChange}
                        value={formik2.values.price}
                        type="number"
                        name="price"
                        id="price"
                    />
                </label>
                {formik2.errors.price && <span {...classes('error')}>{formik2.errors.price}</span>}
                <label {...classes('label')}>
                    Dátum výroby vozu:
                    <input
                        {...classes('input')}
                        onChange={formik2.handleChange}
                        value={formik2.values.creationDate}
                        type="date"
                        max={getDateString(new Date())}
                        name="creationDate"
                        id="creationDate"
                    />
                </label>
                {formik2.errors.creationDate && <span {...classes('error')}>{formik2.errors.creationDate}</span>}
                <button {...classes('submit')} type="submit">Ďalej</button>
            </form>
        </>
    );
};

export default VehicleParameters;