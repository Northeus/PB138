import React from 'react';
import BEMHelper from 'react-bem-helper';

interface ICardProp {
    image: string | undefined;
    name: string;
    picked: boolean;
    action: () => Promise<void>;
}

const classes = new BEMHelper('card');

const Card: React.FC<ICardProp> = (props) => {
    const {image, name, picked, action} = props;
    if (image == undefined) {
        return (
            <button type="button" {...(picked ? classes({modifiers: ['flat', 'picked']}) : classes({modifier: 'flat'}))} onClick={action}>
                <span {...classes('name')}>{name}</span>
            </button>
        );
    }
    return (
        <button type="button" {...(picked ? classes({modifier: 'picked'}) : classes())} onClick={action}>
            <img src={image} alt={name} {...classes('picture')} />
            <span {...classes('name', 'bottom')}>{name}</span>
        </button>
    );
};

export default Card;