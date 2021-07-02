import React from 'react';
import BEMHelper from 'react-bem-helper';
import { useRecoilState } from 'recoil';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './VehicleOwner.css';
import '../Form/Form.css';
import { vehicleOwnerStateAtom } from '../../store/atoms';
import { Redirect } from 'react-router-dom';

const classes = new BEMHelper('form');

const validationSchema = Yup.object().shape({
    drivingLicenseDate: Yup.date() //maybe also .max(new Date())
        .required('*Je nutné zadať hodnotu')
});

const VehicleOwner = () => {
    const [vehicleOwner, setVehicleOwner] = useRecoilState(vehicleOwnerStateAtom);
    const initialValues = {
        drivingLicenseDate: vehicleOwner.drivingLicenseDate.toISOString().split('T')[0],
        accidentIn3Years: vehicleOwner.accidentIn3Years,
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setVehicleOwner({
                drivingLicenseDate: new Date(values.drivingLicenseDate),
                accidentIn3Years: values.accidentIn3Years
            });
        }
    });
    return (
        <form {...classes({modifier: 'owner'})} onSubmit={formik.handleSubmit}>
            <label {...classes('label')}>
                Vydanie VO / VOP:
                <input {...classes('input')} onChange={formik.handleChange} value={formik.values.drivingLicenseDate} type="date" name="drivingLicenseDate" id="drivingLicenseDate" />
            </label>
            {formik.errors.drivingLicenseDate && <span {...classes('error')}>{formik.errors.drivingLicenseDate}</span>}
            <label {...classes('label', 'small')}>
                Zaškrtnite v prípade, že ste spôsobili dopravnú nehodu za posledné 3 roky.
                <input {...classes('checkbox')} onChange={formik.handleChange} value={formik.values.accidentIn3Years.toString()} type="checkbox" name="accidentIn3Years" id="accidentIn3Years" />
            </label>
            <button {...classes('submit')} type="submit">Submit</button>
        </form>
    );
};

export default VehicleOwner;
