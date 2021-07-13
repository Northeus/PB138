import React from 'react';
import BEMHelper from 'react-bem-helper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './VehicleOwner.css';
import '../Form/Form.css';
import { progressStateAtom, vehicleOwnerStateAtom } from '../../store/atoms';
import { getNYearsAfter, getNYearsBefore } from '../../utils/dateManipulation';

const classes = new BEMHelper('form');

const validationSchema = Yup.object().shape({
    birthDate: Yup.date()
        .max(getNYearsBefore(new Date(), 18), '*Musíte mať aspoň 18 rokov')
        .required('*Je nutné zadať hodnotu'),
    drivingLicenseDate: Yup.date()
        .max(new Date(), '*Zadaný dátum musí byť z minulosti.')
        .when(['birthDate'],
            (birthDate, schema) => schema.min(
                getNYearsAfter(birthDate, 17),
                '*Vodičský preukaz nie je možné získať skôr ako v sedemnástich rokoch'
            ),
        )
        .required('*Je nutné zadať hodnotu')
});

const VehicleOwner = (): JSX.Element => {
    const [vehicleOwner, setVehicleOwner] = useRecoilState(vehicleOwnerStateAtom);
    const setProgress = useSetRecoilState(progressStateAtom);
    const initialValues = {
        birthDate: vehicleOwner.birthDate.toISOString().split('T')[0],
        drivingLicenseDate: vehicleOwner.drivingLicenseDate.toISOString().split('T')[0],
        accidentIn3Years: vehicleOwner.accidentIn3Years,
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setVehicleOwner({
                drivingLicenseDate: new Date(values.drivingLicenseDate),
                birthDate: new Date(values.birthDate),
                accidentIn3Years: values.accidentIn3Years
            });
            setProgress(4);
        }
    });
    return (
        <form {...classes({modifier: 'owner'})} onSubmit={formik.handleSubmit}>
            <label {...classes('label')}>
                Dátum narodenia:
                <input
                    {...classes('input')}
                    onChange={formik.handleChange}
                    value={formik.values.birthDate}
                    max={getNYearsBefore(new Date(), 18).toISOString().split('T')[0]}
                    type="date"
                    name="birthDate"
                    id="birthDate"
                />
            </label>
            {formik.errors.birthDate && <span {...classes('error')}>{formik.errors.birthDate}</span>}
            <label {...classes('label')}>
                Vydanie VO / VOP:
                <input
                    {...classes('input')}
                    onChange={formik.handleChange}
                    value={formik.values.drivingLicenseDate}
                    min={getNYearsAfter(new Date(formik.values.birthDate), 17).toISOString().split('T')[0]}
                    max={new Date().toISOString().split('T')[0]}
                    type="date"
                    name="drivingLicenseDate"
                    id="drivingLicenseDate"
                />
            </label>
            {formik.errors.drivingLicenseDate && <span {...classes('error')}>{formik.errors.drivingLicenseDate}</span>}
            <label {...classes('label', 'small')}>
                Zaškrtnite v prípade, že ste spôsobili dopravnú nehodu za posledné 3 roky.
                <input
                    {...classes('checkbox')}
                    onChange={formik.handleChange}
                    value={formik.values.accidentIn3Years.toString()}
                    checked={formik.values.accidentIn3Years}
                    max={new Date().toISOString().split('T')[0]}
                    type="checkbox"
                    name="accidentIn3Years"
                    id="accidentIn3Years"
                />
            </label>
            <button {...classes('submit')} type="submit">Ďalej</button>
        </form>
    );
};

export default VehicleOwner;
