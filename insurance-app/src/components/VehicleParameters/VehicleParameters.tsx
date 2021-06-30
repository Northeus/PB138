import React from 'react';
import BEMHelper from 'react-bem-helper';
import './VehicleParameters.css';
import '../Form/Form.css';
import '../LicensePlate/LicensePlate.css';

const classes = new BEMHelper('form');
const licenseClasses = new BEMHelper('license-plate');

const VehicleParameters = () => (
    <><form {...classes({ modifiers: ['centered', 'plate'] })}>
        <label {...classes('label')} htmlFor='license-plate'>Nájdenie ŠPZ:</label>
        <input {...licenseClasses('number')} type="text" maxLength={7} minLength={7} name="license-plate" />
        <span {...classes('error')}>*Nebolo možné nájsť zadanú ŠPZ.</span>
        <button {...classes('submit')} type="submit">Submit</button>
    </form>
    <form {...classes({modifier: 'parameters'})}>
        <label {...classes('label')}>
          Objem motora v ml:
            <input {...classes('input')} type="number" name="cylinder-volume" />
        </label>
        <span {...classes('error')}>*Zadaná hodnota musí byť celé číslo.</span>
        <label {...classes('label')}>
          Výkon motora v kW:
            <input {...classes('input')} type="number" name="power" />
        </label>
        <span {...classes('error')}>*Je nutné zadať hodnotu.</span>
        <label {...classes('label')}>
          Pôvodna cena v €:
            <input {...classes('input')} type="number" name="price" />
        </label>
        <span {...classes('error')}>*Zadaná hodnota musí byť celé číslo.</span>
        <label {...classes('label')}>
          Dátum výroby vozu:
            <input {...classes('input')} type="date" name="creation-date" />
        </label>
        <span {...classes('error')}>*Zadaný dátum musí byť z minulosti.</span>
        <button {...classes('submit')} type="submit">Submit</button>
    </form></>
);

export default VehicleParameters;