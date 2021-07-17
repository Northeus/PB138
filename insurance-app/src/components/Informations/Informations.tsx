import React from 'react';
import BEMHelper from 'react-bem-helper';
import InfoPaths from '../../utils/infoPaths';
import RoutingPaths from '../../utils/routingPaths';
import './Informations.css';

const classes = new BEMHelper('informations');

interface InformationsProps {
    newTab: boolean
}

const Informations: React.FC<InformationsProps> = ({newTab}) => (
    <nav {...classes()}>
        <a
            {...classes('item')}
            target={newTab ? '_blank' : undefined}
            href={`${RoutingPaths.Info}/${InfoPaths.Contacts}`}>
            <span {...classes('name')}>Kontaktujete nás</span>
        </a>
        <a
            {...classes('item')}
            target={newTab ? '_blank' : undefined}
            href={`${RoutingPaths.Info}/${InfoPaths.AboutUs}`}>
            <span {...classes('name')}>O nás</span>
        </a>
        <a
            {...classes('item')}
            target={newTab ? '_blank' : undefined}
            href={`${RoutingPaths.Info}/${InfoPaths.GDPR}`}>
            <span {...classes('name')}>GDPR</span>
        </a>
    </nav>
);

export default Informations;