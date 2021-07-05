import React from 'react';
import BEMHelper from 'react-bem-helper';
import { useRecoilState } from 'recoil';
import { progressStateAtom } from '../../store/atoms';
import RoutingPaths from '../../utils/routingPaths';
import './Checkpoints.css';

const take = 1;

const checkpoints = [
    {
        name: 'Druh vozu',
        path: RoutingPaths.VehicleType,
        index: 0
    },
    {
        name: 'Využitie vozu',
        path: RoutingPaths.VehicleUtilisation,
        index: 1
    },
    {
        name: 'Parametre vozu',
        path: RoutingPaths.VehicleParameters,
        index: 2
    },
    {
        name: 'Majiteľ vozu',
        path: RoutingPaths.VehicleOwner,
        index: 3
    },
    {
        name: 'Typ poistenia',
        path: RoutingPaths.InsuranceType,
        index: 4
    },
    {
        name: 'Zhrnutie',
        path: RoutingPaths.Summary,
        index: 5
    }
];

const classes = new BEMHelper('checkpoints');

const Checkpoints = () => {
    const [progress, setProgress] = useRecoilState(progressStateAtom);
    const previous = checkpoints.slice(progress - take, progress);
    const current = checkpoints[progress];
    const next = checkpoints.slice(progress + 1, progress + take + 1);
    return (
        <nav {...classes()}>
            {previous.map(c => (
                <div {...classes('item', ['active'])} onClick={() => setProgress(c.index)} key={c.index}>
                    <span {...classes('name')}>{c.name}</span>
                </div>    
            ))}
            {<div {...classes('item', 'current')} key={current.index}>
                <span {...classes('name')}>{current.name}</span>
            </div>}
            {next.map(c => (
                <div {...classes('item', ['inactive'])} key={c.index}>
                    <span {...classes('name')}>{c.name}</span>
                </div>    
            ))}
        </nav>
    );
};

export default Checkpoints;