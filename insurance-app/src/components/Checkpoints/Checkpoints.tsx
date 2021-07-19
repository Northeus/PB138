import React from 'react';
import BEMHelper from 'react-bem-helper';
import { useRecoilState } from 'recoil';
import { progressStateAtom } from '../../store/atoms';
import './Checkpoints.css';

const mobileTake = 1;

const checkpoints = [
    'Druh vozu',
    'Využitie vozu',
    'Parametre vozu',
    'Majiteľ vozu',
    'Typ poistenia',
    'Zhrnutie',
];

const classes = new BEMHelper('checkpoints');

const getItemModifier = (index: number, progress: number) => {
    if (index < progress - mobileTake) {
        return ['active', 'hidden'];
    }
    if (index < progress) {
        return ['active'];
    }
    if (index == progress) {
        return ['current'];
    }
    if (index <= progress + mobileTake) {
        return ['inactive'];
    }
    return ['inactive', 'hidden'];
};

const Checkpoints = (): JSX.Element => {
    const [progress, setProgress] = useRecoilState(progressStateAtom);
    return (
        <nav {...classes()}>
            {checkpoints.map((c, i) => (
                <div 
                    {...classes('item', getItemModifier(i, progress))}
                    onClick={(i < progress ? () => setProgress(i) : undefined)}
                    key={i}
                >
                    <span {...classes('name')}>{c}</span>
                </div>
            ))}
        </nav>
    );
};

export default Checkpoints;