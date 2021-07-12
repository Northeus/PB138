import React, { ChangeEvent, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRecoilState, useRecoilValue } from 'recoil';
import { insuranceTypeStateAtom, progressStateAtom } from '../../store/atoms';
import './InsuranceType.css';
import '../Form/Form.css';
import EInsuranceType from '../../utils/eInsuranceType';
import { vehicleTypeState } from '../../store/selectors';
import EVehicleType from '../../utils/eVehicleType';

const classes = new BEMHelper('form');

const validationSchema = Yup.object().shape({
    type: Yup.number()
        .oneOf([EInsuranceType.MCI, EInsuranceType.AccidentInsurance])
        .required('*Je nutné zadať hodnotu'),
    windowInsurance: Yup.boolean().required('*Je nutné zadať hodnotu')
});

const InsuranceType = (): JSX.Element => {
    const [insuranceType, setInsuranceType] = useRecoilState(insuranceTypeStateAtom);
    const [, setProgress] = useRecoilState(progressStateAtom);
    const formik = useFormik({
        initialValues: insuranceType,
        validationSchema,
        onSubmit: async (values) => {
            setInsuranceType(values);
            setProgress(5);
        }
    });

    const vehicleType = useRecoilValue(vehicleTypeState);
    const [isWindowInsuranceEnabled, setWindowInsuranceOption] = useState((vehicleType == EVehicleType.Car || vehicleType == EVehicleType.UpTo35Ton) && insuranceType.type == EInsuranceType.MCI);

    function onTypeChanged(event: ChangeEvent<HTMLSelectElement>) {
        const type: EInsuranceType = Number(event.target.value);
        console.log(type);
        if (type != EInsuranceType.MCI) {
            setWindowInsuranceOption(false);
            formik.values.windowInsurance = false;
        }
        else {
            setWindowInsuranceOption(true);
        }

        formik.handleChange(event);
    }

    return (
        <form {...classes({modifier: 'insurance'})} onSubmit={formik.handleSubmit}>
            <label {...classes('label')}>
                Druh poistenia:
                <select {...classes('select')} onChange={onTypeChanged} value={formik.values.type} name="type" id="type">
                    <option value={EInsuranceType.MCI}>PZP</option>
                    <option value={EInsuranceType.AccidentInsurance}>Havarijné</option>
                </select>
            </label>
            {formik.errors.type && <span {...classes('error')}>{formik.errors.type}</span>}
            {
                isWindowInsuranceEnabled &&
                <label {...classes('label')}>
                    Pripoistenie skla:
                    <input {...classes('checkbox')} onChange={formik.handleChange} value={formik.values.windowInsurance.toString()} checked={formik.values.windowInsurance} type="checkbox" name="windowInsurance" id="windowInsurance" />
                </label>
            }
            {isWindowInsuranceEnabled && formik.errors.windowInsurance && <span {...classes('error')}>{formik.errors.windowInsurance}</span>}
            <button {...classes('submit')} type="submit">Submit</button>
        </form>
    );
};

export default InsuranceType;
