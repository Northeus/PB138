import React from 'react';
import BEMHelper from 'react-bem-helper';
import './InsuranceType.css';
import '../Form/Form.css';

const classes = new BEMHelper('form');

const InsuranceType = () => (
    <form {...classes({modifier: 'insurance'})}>
        <label {...classes('label')}>
        Druh poistenia:
            <select {...classes('select')} name="insurance-type">
                <option value="copmulsory-insurace">PZP</option>
                <option value="accident-insurance">Havarijné</option>
            </select>
        </label>
        <span {...classes('error')}>*Povinná hodnota.</span>
        <label {...classes('label')}>
        Pripoistenie skla:
            <input {...classes('checkbox')} type="checkbox" name="glass-insurance" />
        </label>
        <button {...classes('submit')} type="submit">Submit</button>
    </form>
);

export default InsuranceType;
