interface ICardProp {
    image: string | undefined;
    name: string;
    picked: boolean;
    action: () => Promise<void>;
}

export default ICardProp;