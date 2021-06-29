import React from 'react';
import BEMHelper from 'react-bem-helper';

interface ICardProp {
    image: string | undefined,
    name: string,
    picked: boolean,
    action: any
}

const classes = new BEMHelper('card');

const Card: React.FC<ICardProp> = (props) => {
    const {image, name, picked} = props;
    if (image == undefined) {
        return (
            <button type="submit" {...classes({modifier: 'flat'})}>
                <span {...classes('name')}>{name}</span>
            </button>
        );
    }
    return (
        <button type="submit" {...classes()}>
            <img src={image} alt={name} {...(picked ? classes('picture', 'picked') : classes('picture'))} />
            <span {...classes('name', 'bottom')}>{name}</span>
        </button>
    );
};

export default Card;