import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { progressState } from '../../store/selectors';
import RoutingPaths, { order } from '../../utils/routingPaths';
import Checkpoints from '../Checkpoints/Checkpoints';
import Informations from '../Informations/Informations';
import InsuranceType from '../InsuranceType/InsuranceType';
import Summary from '../Summary/Summary';
import VehicleOwner from '../VehicleOwner/VehicleOwner';
import VehicleParameters from '../VehicleParameters/VehicleParameters';
import VehicleType from '../VehicleType/VehicleType';
import VehicleUtilisation from '../VehicleUtilisation/VehicleUtilisation';
import './Container.css';
import './Logo.css';
import logo from '../../assets/logo.svg';
import Info from '../Info/Info';
import HeaderTitle from '../HeaderTitle/HeaderTitle';

const classes = new BEMHelper('container');
const classLogo = new BEMHelper('logo');

const subpages = [
    {
        path: RoutingPaths.VehicleType,
        component: <VehicleType />
    },
    {
        path: RoutingPaths.VehicleUtilisation,
        component: <VehicleUtilisation />
    },
    {
        path: RoutingPaths.VehicleParameters,
        component: <VehicleParameters />
    },
    {
        path: RoutingPaths.VehicleOwner,
        component: <VehicleOwner />
    },
    {
        path: RoutingPaths.InsuranceType,
        component: <InsuranceType />
    },
    {
        path: RoutingPaths.Summary,
        component: <Summary />
    }
];

const getRoute = (path: RoutingPaths, component: JSX.Element, progress: number, currentProgress: number) => {
    return (
        <Route path={path} key={progress}>
            <header {...classes('header')}>
                <img {...classLogo()} src={logo} alt="logo"/>
                <Checkpoints />
            </header>
            <main {...classes('main')}>
                {currentProgress == progress ? component : <Redirect to={order[currentProgress]} />}
            </main>
            <footer {...classes('footer')}>
                <Informations newTab={true}/>
            </footer>
        </Route>
    );
};

const Container = (): JSX.Element => {
    const currentProgress = useRecoilValue(progressState);
    return (
        <div {...classes()}>
            <Router>
                <Switch>
                    {subpages.map((sp, i) => getRoute(sp.path, sp.component, i, currentProgress))}
                    <Route path={RoutingPaths.Info}>
                        <header {...classes('header')}>
                            <img {...classLogo()} src={logo} alt="logo"/>
                            <HeaderTitle title="Informácie"/>
                        </header>
                        <main {...classes('main')}>
                            <Info />
                        </main>
                        <footer {...classes('footer')}>
                            <Informations newTab={false}/>
                        </footer>
                    </Route>
                    <Route path={RoutingPaths.Root}>
                        <Redirect to={order[currentProgress]} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default Container;