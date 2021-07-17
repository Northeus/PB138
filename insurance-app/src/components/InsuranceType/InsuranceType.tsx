import React, { ChangeEvent, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { insuranceTypeStateAtom, progressStateAtom } from '../../store/atoms';
import './InsuranceType.css';
import '../Form/Form.css';
import EInsuranceType, { insuranceTypeString } from '../../utils/eInsuranceType';
import { vehicleTypeState } from '../../store/selectors';
import EVehicleType from '../../utils/eVehicleType';

const classes = new BEMHelper('form');

const validationSchema = Yup.object().shape({
    type: Yup.string()
        .oneOf([EInsuranceType.PZP, EInsuranceType.AccidentInsurance])
        .required('*Je nutné zadať hodnotu'),
    windowInsurance: Yup.boolean().required('*Je nutné zadať hodnotu')
});

const InsuranceType = (): JSX.Element => {
    const [insuranceType, setInsuranceType] = useRecoilState(insuranceTypeStateAtom);
    const setProgress = useSetRecoilState(progressStateAtom);
    const formik = useFormik({
        initialValues: insuranceType,
        validationSchema,
        onSubmit: async (values) => {
            setInsuranceType(values);
            setProgress(5);
        }
    });

    const vehicleType = useRecoilValue(vehicleTypeState);
    const [isWindowInsuranceEnabled, setWindowInsuranceOption] = useState(
        (vehicleType == EVehicleType.Car || vehicleType == EVehicleType.UpTo35Ton) && insuranceType.type == EInsuranceType.PZP
    );

    const onTypeChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        const type: EInsuranceType = EInsuranceType[event.target.value as keyof typeof EInsuranceType];
        if (type != EInsuranceType.PZP) {
            setWindowInsuranceOption(false);
            formik.setFieldValue('windowInsurance', false);
        }
        else {
            setWindowInsuranceOption((vehicleType == EVehicleType.Car || vehicleType == EVehicleType.UpTo35Ton));
        }

        formik.handleChange(event);
    };

    return (
        <form {...classes({modifier: 'insurance'})} onSubmit={formik.handleSubmit}>
            <label {...classes('label')}>
                Druh poistenia:
                <select {...classes('select')} onChange={onTypeChanged} value={formik.values.type} name="type" id="type">
                    <option value={EInsuranceType.PZP}>{insuranceTypeString[EInsuranceType.PZP]}</option>
                    <option value={EInsuranceType.AccidentInsurance}>{insuranceTypeString[EInsuranceType.AccidentInsurance]}</option>
                </select>
            </label>
            {formik.errors.type && <span {...classes('error')}>{formik.errors.type}</span>}
            {
                isWindowInsuranceEnabled &&
                <label {...classes('label')}>
                    Pripoistenie skla:
                    <input
                        {...classes('checkbox')}
                        onChange={formik.handleChange}
                        value={formik.values.windowInsurance.toString()}
                        checked={formik.values.windowInsurance}
                        type="checkbox"
                        name="windowInsurance"
                        id="windowInsurance"
                    />
                </label>
            }
            {isWindowInsuranceEnabled && formik.errors.windowInsurance && <span {...classes('error')}>{formik.errors.windowInsurance}</span>}
            <button {...classes('submit')} type="submit">Ďalej</button>
        </form>
    );
};

export default InsuranceType;