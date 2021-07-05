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
    const {image, name, picked, action} = props;
    if (image == undefined) {
        return (
            <button type="button" {...classes({modifier: 'flat'})} onClick={action}>
                <span {...classes('name')}>{name}</span>
            </button>
        );
    }
    return (
        <button type="button" {...classes()} onClick={action}>
            <img src={image} alt={name} {...(picked ? classes('picture', 'picked') : classes('picture'))} />
            <span {...classes('name', 'bottom')}>{name}</span>
        </button>
    );
};

export default Card;