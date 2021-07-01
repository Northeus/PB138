import React from 'react';
import BEMHelper from 'react-bem-helper';
import {useFormik} from 'formik';
import './InsuranceType.css';
import '../Form/Form.css';

const classes = new BEMHelper('form');

const initialValues = {
    insuranceType: 'compulsoryInsurance',
    glassInsurance: false

};

const InsuranceType = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            console.log(values);
        }
    });
    return (
        <form {...classes({modifier: 'insurance'})} onSubmit={formik.handleSubmit}>
            <label {...classes('label')}>
                Druh poistenia:
                <select {...classes('select')} onChange={formik.handleChange} value={formik.values.insuranceType} name="insuranceType" id="insuranceType">
                    <option value="compulsoryInsurance">PZP</option>
                    <option value="accidentInsurance">Havarijné</option>
                </select>
            </label>
            <label {...classes('label')}>
                Pripoistenie skla:
                <input {...classes('checkbox')} onChange={formik.handleChange} value={formik.values.glassInsurance.toString()} type="checkbox" name="glassInsurance" id="glassInsurance" />
            </label>
            <button {...classes('submit')} type="submit">Submit</button>
        </form>
    );
};

export default InsuranceType;
