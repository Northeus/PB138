import React from 'react';
import BEMHelper from 'react-bem-helper';
import './Informations.css';

const classes = new BEMHelper('informations');

const Informations = () => (
    <nav {...classes()}>
        <a href="#" {...classes('item')}>
            <span {...classes('name')}>Contact us</span>
        </a>
        <a href="#" {...classes('item')}>
            <span {...classes('name')}>Our company</span>
        </a>
        <a href="#" {...classes('item')}>
            <span {...classes('name')}>GDPR</span>
        </a>
    </nav>
);

export default Informations;