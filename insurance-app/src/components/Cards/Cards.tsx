import React from 'react';
import BEMHelper from 'react-bem-helper';
import Card from './Card';
import ICardProp from './CardProp';
import './Cards.css';

interface ICardsProps {
    cards: ICardProp[]
}

const classes = new BEMHelper('cards');

const Cards: React.FC<ICardsProps> = ({cards}) => (
    <div {...classes()}>
        {cards.map((c) => <Card {...c} key={c.name}/>)}
    </div>
);

export default Cards;