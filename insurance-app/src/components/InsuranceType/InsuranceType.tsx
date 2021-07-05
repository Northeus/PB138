import React from 'react';
import BEMHelper from 'react-bem-helper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useRecoilState } from 'recoil';
import { insuranceTypeStateAtom, progressStateAtom } from '../../store/atoms';
import './InsuranceType.css';
import '../Form/Form.css';
import EInsuranceType from '../../utils/eInsuranceType';
import { useHistory } from 'react-router-dom';
import RoutingPaths from '../../utils/routingPaths';

const classes = new BEMHelper('form');

const validationSchema = Yup.object().shape({
    type: Yup.number()
        .oneOf([EInsuranceType.MCI, EInsuranceType.AccidentInsurance])
        .required('*Je nutné zadať hodnotu'),
    windowInsurance: Yup.boolean().required('*Je nutné zadať hodnotu')
});

const InsuranceType = () => {
    const history = useHistory();
    const [insuranceType, setInsuranceType] = useRecoilState(insuranceTypeStateAtom);
    const [ _, setProgress ] = useRecoilState(progressStateAtom);
    const formik = useFormik({
        initialValues: insuranceType,
        validationSchema,
        onSubmit: async (values) => {
            setInsuranceType({type: +values.type, windowInsurance: values.windowInsurance});
            setProgress(5);
            history.push(RoutingPaths.Summary);
        }
    });
    return (
        <form {...classes({modifier: 'insurance'})} onSubmit={formik.handleSubmit}>
            <label {...classes('label')}>
                Druh poistenia:
                <select {...classes('select')} onChange={formik.handleChange} value={formik.values.type} name="type" id="type">
                    <option value={EInsuranceType.MCI}>PZP</option>
                    <option value={EInsuranceType.AccidentInsurance}>Havarijné</option>
                </select>
            </label>
            {formik.errors.type && <span {...classes('error')}>{formik.errors.type}</span>}
            <label {...classes('label')}>
                Pripoistenie skla:
                <input {...classes('checkbox')} onChange={formik.handleChange} value={formik.values.windowInsurance.toString()} checked={formik.values.windowInsurance} type="checkbox" name="windowInsurance" id="windowInsurance" />
            </label>
            {formik.errors.windowInsurance && <span {...classes('error')}>{formik.errors.windowInsurance}</span>}
            <button {...classes('submit')} type="submit">Submit</button>
        </form>
    );
};

export default InsuranceType;
