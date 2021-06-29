import React from 'react';
import BEMHelper from 'react-bem-helper';
import './VehicleOwner.css';
import '../Form/Form.css';

const classes = new BEMHelper('form');

const VehicleOwner = () => (
    <form {...classes({modifier: 'owner'})}>
        <label {...classes('label')}>
          Vydanie VO / VOP:
            <input {...classes('input')} type="date" name="VO-date" />
        </label>
        <span {...classes('error')}>*Povinna hodnota.</span>
        <label {...classes('label', 'small')}>
          Zaskrtnite, ak ste sposobili nehodu v poslednych 3 rokoch.
            <input {...classes('checkbox')} type="checkbox" name="cylinder-volume" />
        </label>
        <button {...classes('submit')} type="submit">Submit</button>
    </form>
);

export default VehicleOwner;
