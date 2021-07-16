import React from 'react';
import BEMHelper from 'react-bem-helper';
import { useLocation } from 'react-router-dom';
import Address from '../../assets/contacts/address.svg';
import Phone from '../../assets/contacts/phone.svg';
import Mail from '../../assets/contacts/mail.svg';
import RoutingPaths from '../../utils/routingPaths';
import InfoPaths from '../../utils/infoPaths';
import './Info.css';
import './Contact.css';

const classesBlock = new BEMHelper('information-block');
const classesContacts = new BEMHelper('contacts');
const classesContact = new BEMHelper('contact');

const getPicked = (location: string) => {
    const regex = new RegExp(`^${RoutingPaths.Info}/(${InfoPaths.Contacts}|${InfoPaths.AboutUs}|${InfoPaths.GDPR})(/.*)?$`);
    const matches = regex.exec(location);
    if (!matches) {
        return '';
    }
    return matches[1];
};

const getFaded = (picked: string, infoPath: InfoPaths) => {
    return picked == '' || picked == infoPath ? classesBlock() : classesBlock({modifier: 'faded'});
};

const Info = (): JSX.Element => {
    const location = useLocation();
    const picked = getPicked(location.pathname);
    return (
        <>
            <div {...getFaded(picked, InfoPaths.Contacts)}>
                <span {...classesBlock('title')}>Kontakty</span>
                <ul {...classesContacts()}>
                    <li {...classesContact()}>
                        <img {...classesContact('image')} src={Address} alt="Adresa" />
                        <span {...classesContact('info', 'bottom')}>Botanická 3, 974 01, Banská Bystrica</span>
                    </li>
                    <li {...classesContact()}>
                        <img {...classesContact('image')} src={Phone} alt="Telefon" />
                        <span {...classesContact('info', 'bottom')}>+421 987 654 321 (NONSTOP)</span>
                    </li>
                    <li {...classesContact()}>
                        <img {...classesContact('image')} src={Mail} alt="Email" />
                        <span {...classesContact('info', 'bottom')}>info@carinsurance.sk</span>
                    </li>
                </ul>
            </div>
            <div {...getFaded(picked, InfoPaths.AboutUs)}>
                <span {...classesBlock('title')}>O nás</span>
                <p>Sme slovenská pobočka zahraničnej poisťovne Car insurance - poisťovňa motorových vozidiel s dlhoročnou praxou a najnižšími cenami na trhu. Svojim klientom ponúkame vysoký štandard služieb preverených dlhodobými medzinárodnými skúsenosťami s dôrazom na kvalitný poisťovací servis.</p>
            </div>
            <div {...getFaded(picked, InfoPaths.GDPR)}>
                <span {...classesBlock('title')}>GDPR</span>
                <p>Poisťovni Car insurance - Slovenská pobočka, a.s. záleží na riadnom spracúvaní osobných údajov. Ochrana osobných údajov našich klientov, ako aj všetkých dotknutých osôb, je pre nás dôležitá téma. Naše spoločnosti postupujú v oblasti ochrany osobných údajov vždy v súlade s platnými právnymi predpismi, ako aj medzinárodnými štandardami (najmä nariadenie Európskeho parlamentu a rady (EÚ) 2016/679 z 27. apríla 2016 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto údajov a zákon č. 18/2018 Z.z. o ochrane osobných údajov a o zmene a doplnení niektorých zákonov). Vaše práva môžete uplatniť jedným z nasledujúcich spôsobov:</p>
                <p>Na e-mailovej adrese gdpr@carinsurancesk.sk</p>
                <p>Písomne alebo osobne na adrese našej pobočky (Botanická 3, 974 01, Banská Bystrica).</p>
            </div>
        </>
    );
};

export default Info;