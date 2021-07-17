import React from 'react';
import BEMHelper from 'react-bem-helper';
import '../Checkpoints/Checkpoints.css';

const classes = new BEMHelper('checkpoints');

interface HeaderTitleProps {
    title: string
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({title}) => {
    return (
        <nav {...classes()}>
            <div {...classes('item', 'current')}>
                <span {...classes('name', 'big')}>{title}</span>
            </div>
        </nav>
    );
};

export default HeaderTitle;