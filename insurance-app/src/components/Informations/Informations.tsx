import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from 'react-router-dom';
import InfoPaths from '../../utils/infoPaths';
import RoutingPaths from '../../utils/routingPaths';
import './Informations.css';

const classes = new BEMHelper('informations');

interface InformationsProps {
    newTab: boolean
}

const Informations: React.FC<InformationsProps> = ({newTab}) => (
    <nav {...classes()}>
        <Link
            {...classes('item')}
            target={newTab ? '_blank' : undefined}
            to={`${RoutingPaths.Info}/${InfoPaths.Contacts}`}>
            <span {...classes('name')}>Kontaktujete nás</span>
        </Link>
        <Link
            {...classes('item')}
            target={newTab ? '_blank' : undefined}
            to={`${RoutingPaths.Info}/${InfoPaths.AboutUs}`}>
            <span {...classes('name')}>O nás</span>
        </Link>
        <Link
            {...classes('item')}
            target={newTab ? '_blank' : undefined}
            to={`${RoutingPaths.Info}/${InfoPaths.GDPR}`}>
            <span {...classes('name')}>GDPR</span>
        </Link>
    </nav>
);

export default Informations;