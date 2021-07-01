import React from 'react';
import BEMHelper from 'react-bem-helper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './VehicleParameters.css';
import '../Form/Form.css';
import '../LicensePlate/LicensePlate.css';
import { useRecoilState } from 'recoil';

const classes = new BEMHelper('form');
const licenseClasses = new BEMHelper('license-plate');

const licensePlaceRegex = new RegExp('[A-Z]{2,2}([0-9]{3,3}[A-Z]{2,2}|[A-NP-WYZ]([A-Z]{3,3}[A-Z0-9]|[A-Z]{2,2}[A-Z0-9][0-9]))');

const initialValues1 = {
    licensePlate: ''
};

const validationSchema2 = Yup.object().shape({
    cylinderVolume: Yup.number()
        .min(0, '*Zadaná hodnota musí byť aspoň 0.')
        .integer('*Zadaná hodnota musí byť prirodzené číslo.')
        .required('*Je nutné zadať hodnotu.'),
    power: Yup.number()
        .min(0, '*Zadaná hodnota musí byť aspoň 0.')
        .required('*Je nutné zadať hodnotu.'), //maybe .integer()
    price: Yup.number()
        .min(0, '*Zadaná hodnota musí byť aspoň 0.')
        .required('*Je nutné zadať hodnotu.'),
    creationDate: Yup.date()
        .max(new Date(), '*Zadaný dátum musí byť z minulosti.')
        .required('*Je nutné zadať dátum')
});

const initialValues2 = {
    cylinderVolume: '',
    power: '',
    price: '',
    creationDate: '',
};

const VehicleParameters = () => {
    const formik1 = useFormik({
        initialValues: initialValues1,
        validate: (values) => {
            if (!values.licensePlate || values.licensePlate === '') {
                return { licensePlate: 'Required' };
            }
            if (!licensePlaceRegex.test(values.licensePlate.toUpperCase())) {
                return { licensePlate: 'Invalid' };
            }
            // TODO validation, may not be capitalised
            return { };
        },
        onSubmit: async (values) => {
            console.log(values);
        }
    });
    const formik2 = useFormik({
        initialValues: initialValues2, 
        validationSchema: validationSchema2, 
        onSubmit: async (values) => {
            console.log(values);
            // formik2.resetForm();
        }});
    return (
        <>
            <form {...classes({ modifiers: ['centered', 'plate'] })} onSubmit={formik1.handleSubmit}>
                <label {...classes('label')} htmlFor='license-plate'>Nájdenie ŠPZ:</label>
                <input {...licenseClasses('number')} onChange={formik1.handleChange} value={formik1.values.licensePlate} type="text" spellCheck="false" maxLength={7} minLength={7} name="licensePlate" id="licensePlate" />
                {formik1.errors.licensePlate && <span {...classes('error')}>{formik1.errors.licensePlate}</span>}
                <button {...classes('submit')} type="submit">Submit</button>
            </form>
            <form {...classes({modifier: 'parameters'})} onSubmit={formik2.handleSubmit}>
                <label {...classes('label')}>
                    Objem motora v cm³:
                    <input {...classes('input')} onChange={formik2.handleChange} value={formik2.values.cylinderVolume} type="number" name="cylinderVolume" id="cylinderVolume"/>
                </label>
                {formik2.errors.cylinderVolume && <span {...classes('error')}>{formik2.errors.cylinderVolume}</span>}
                <label {...classes('label')}>
                    Výkon motora v kW:
                    <input {...classes('input')} onChange={formik2.handleChange} value={formik2.values.power} type="number" name="power" id="power" />
                </label>
                {formik2.errors.power && <span {...classes('error')}>{formik2.errors.power}</span>}
                <label {...classes('label')}>
                    Pôvodna cena v €:
                    <input {...classes('input')} onChange={formik2.handleChange} value={formik2.values.price} type="number" name="price" id="price" />
                </label>
                {formik2.errors.price && <span {...classes('error')}>{formik2.errors.price}</span>}
                <label {...classes('label')}>
                    Dátum výroby vozu:
                    <input {...classes('input')} onChange={formik2.handleChange} value={formik2.values.creationDate} type="date" max={new Date().toISOString().split('T')[0]} name="creationDate" id="creationDate" />
                </label>
                {formik2.errors.creationDate && <span {...classes('error')}>{formik2.errors.creationDate}</span>}
                <button {...classes('submit')} type="submit">Submit</button>
            </form>
        </>
    );
};

export default VehicleParameters;