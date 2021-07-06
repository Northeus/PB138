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

const classes = new BEMHelper('container');
const classLogo = new BEMHelper('logo');

const Container = () => {
    const progress = useRecoilValue(progressState);
    return (
        <div {...classes()}>
            <header {...classes('header')}>
                <img {...classLogo()} src={logo} alt="logo"/>
                <Checkpoints />
            </header>
            <main {...classes('main')}>
                <Router>
                    <Switch>
                        <Route path={RoutingPaths.VehicleType}>
                            {progress == 0 ? <VehicleType /> : <Redirect to={order[progress]} />}
                        </Route>
                        <Route path={RoutingPaths.VehicleUtilisation}>
                            {progress == 1 ? <VehicleUtilisation /> : <Redirect to={order[progress]} />}
                        </Route>
                        <Route path={RoutingPaths.VehicleParameters}>
                            {progress == 2 ? <VehicleParameters /> : <Redirect to={order[progress]} />}
                        </Route>
                        <Route path={RoutingPaths.VehicleOwner}>
                            {progress == 3 ? <VehicleOwner /> : <Redirect to={order[progress]} />}
                        </Route>
                        <Route path={RoutingPaths.InsuranceType}>
                            {progress == 4 ? <InsuranceType /> : <Redirect to={order[progress]} />}
                        </Route>
                        <Route path={RoutingPaths.Summary}>
                            {progress == 5 ? <Summary /> : <Redirect to={order[progress]} />}
                        </Route>
                        <Route path={RoutingPaths.Root}>
                            <Redirect to={order[progress]} />
                        </Route>
                    </Switch>
                </Router>
            </main>
            <footer {...classes('footer')}>
                <Informations />
            </footer>
        </div>
    );
};

export default Container;