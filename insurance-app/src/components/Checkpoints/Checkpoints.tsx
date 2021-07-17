import React from 'react';
import BEMHelper from 'react-bem-helper';
import { useRecoilState } from 'recoil';
import { progressStateAtom } from '../../store/atoms';
import './Checkpoints.css';

const take = 1;

const checkpoints = [
    'Druh vozu',
    'Využitie vozu',
    'Parametre vozu',
    'Majiteľ vozu',
    'Typ poistenia',
    'Zhrnutie',
];

const classes = new BEMHelper('checkpoints');

const Checkpoints = (): JSX.Element => {
    const [progress, setProgress] = useRecoilState(progressStateAtom);
    const getClasses = (index: number) => {
        if (index < progress - take) {
            return classes('item', ['active', 'hidden']);
        }
        if (index < progress) {
            return classes('item', 'active');
        }
        if (index == progress) {
            return classes('item', 'current');
        }
        if (index <= progress + take) {
            return classes('item', 'inactive');
        }
        return classes('item', ['inactive', 'hidden']);
    };
    return (
        <nav {...classes()}>
            {checkpoints.map((c, i) => (
                <div {...getClasses(i)} onClick={(i < progress ? () => setProgress(i) : undefined)} key={i}>
                    <span {...classes('name')}>{c}</span>
                </div>
            ))}
        </nav>
    );
};

export default Checkpoints;