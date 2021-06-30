import React from 'react';
import BEMHelper from 'react-bem-helper';
import './Informations.css';

const classes = new BEMHelper('informations');

const Informations = () => (
    <nav {...classes()}>
        <a href="#" {...classes('item')}>
            <span {...classes('name')}>Kontaktujete nás</span>
        </a>
        <a href="#" {...classes('item')}>
            <span {...classes('name')}>O nás</span>
        </a>
        <a href="#" {...classes('item')}>
            <span {...classes('name')}>GDPR</span>
        </a>
    </nav>
);

export default Informations;