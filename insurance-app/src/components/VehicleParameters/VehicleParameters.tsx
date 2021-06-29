import React from 'react';
import BEMHelper from 'react-bem-helper';
import './VehicleParameters.css';
import '../Form/Form.css';
import '../LicensePlate/LicensePlate.css';

const classes = new BEMHelper('form');
const licenseClasses = new BEMHelper('license-plate');

const VehicleParameters = () => (
    <><form {...classes({ modifiers: ['centered', 'plate'] })}>
        <label {...classes('label')} htmlFor='license-plate'>Najdenie SPZ:</label>
        <input {...licenseClasses('number')} type="text" maxLength={7} minLength={7} name="license-plate" />
        <span {...classes('error')}>*Nebolo mozne najst zadanu SPZ.</span>
        <button {...classes('submit')} type="submit">Submit</button>
    </form>
    <form {...classes({modifier: 'parameters'})}>
        <label {...classes('label')}>
          Objem motora v ml:
            <input {...classes('input')} type="number" name="cylinder-volume" />
        </label>
        <span {...classes('error')}>*Zadana hodnota musi byt cele cislo.</span>
        <label {...classes('label')}>
          Vykon motora v kw:
            <input {...classes('input')} type="number" name="power" />
        </label>
        <span {...classes('error')}>*Je nutne zadat hodnotu.</span>
        <label {...classes('label')}>
          Povodna cena v €:
            <input {...classes('input')} type="number" name="price" />
        </label>
        <span {...classes('error')}>*Zadana hodnota musi byt cele cislo.</span>
        <label {...classes('label')}>
          Datum vyroby vozu:
            <input {...classes('input')} type="date" name="creation-date" />
        </label>
        <span {...classes('error')}>*Zadane datum musi byt z minulosti.</span>
        <button {...classes('submit')} type="submit">Submit</button>
    </form></>
);

export default VehicleParameters;