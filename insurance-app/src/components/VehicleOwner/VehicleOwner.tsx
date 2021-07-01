import React from 'react';
import BEMHelper from 'react-bem-helper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './VehicleOwner.css';
import '../Form/Form.css';

const classes = new BEMHelper('form');

const initialValues = {
    VODate: '',
    accident: false,
};

const validationSchema = Yup.object().shape({
    VODate: Yup.date() //maybe also .max(new Date())
        .required('*Je nutné zadať hodnotu')
});

const VehicleOwner = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    });
    return (
        <form {...classes({modifier: 'owner'})} onSubmit={formik.handleSubmit}>
            <label {...classes('label')}>
                Vydanie VO / VOP:
                <input {...classes('input')} onChange={formik.handleChange} value={formik.values.VODate} type="date" name="VODate" id="VODate" />
            </label>
            {formik.errors.VODate && <span {...classes('error')}>{formik.errors.VODate}</span>}
            <label {...classes('label', 'small')}>
                Zaškrtnite v prípade, že ste spôsobili dopravnú nehodu za posledné 3 roky.
                <input {...classes('checkbox')} onChange={formik.handleChange} value={formik.values.VODate} type="checkbox" name="accident" id="accident" />
            </label>
            <button {...classes('submit')} type="submit">Submit</button>
        </form>
    );
};

export default VehicleOwner;
