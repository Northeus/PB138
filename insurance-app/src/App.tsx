import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import Informations from './components/Informations/Informations';
import RoutingPaths from './utils/routingPaths';
import VehicleType from './components/VehicleType/VehicleType';
import VehicleUtilisation from './components/VehicleUtilisation/VehicleUtilisation';
import VehicleParameters from './components/VehicleParameters/VehicleParameters';
import VehicleOwner from './components/VehicleOwner/VehicleOwner';
import InsuranceType from './components/InsuranceType/InsuranceType';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './utils/css/normalize.css';
import './main.css';
import './container.css';

import Summary from './components/Summary/Summary';

const classes = new BEMHelper('container');

const App = () : JSX.Element => {
    return (
        <RecoilRoot>
            <div {...classes()}>
                <header {...classes('header')}>
                    <nav className="checkpoints">
                        <a href="#" className="checkpoints__item checkpoints__item--current">
                            <span className="checkpoints__name">Druh vozu</span></a>
                        <a href="#" className="checkpoints__item checkpoints__item--inactive">
                            <span className="checkpoints__name">Vyuzitie vozu</span>
                        </a>
                        <a href="#" className="checkpoints__item checkpoints__item--inactive">
                            <span className="checkpoints__name">Parametre vozu</span>
                        </a>
                        <a href="#" className="checkpoints__item checkpoints__item--inactive checkpoints__item--hidden">
                            <span className="checkpoints__name">Majitel vozu</span>
                        </a>
                        <a href="#" className="checkpoints__item checkpoints__item--inactive checkpoints__item--hidden">
                            <span className="checkpoints__name">Typ poistenia</span>
                        </a>
                    </nav>
                </header>
                <main {...classes('main')}>
                    <Router>
                        <Switch>
                            <Route path={RoutingPaths.VehicleType}>
                                <VehicleType />
                            </Route>
                            <Route path={RoutingPaths.VehicleUtilisation}>
                                <VehicleUtilisation />
                            </Route>
                            <Route path={RoutingPaths.VehicleParameters}>
                                <VehicleParameters />
                            </Route>
                            <Route path={RoutingPaths.VehicleOwner}>
                                <VehicleOwner />
                            </Route>
                            <Route path={RoutingPaths.InsuranceType}>
                                <InsuranceType />
                            </Route>
                            <Route path={RoutingPaths.Summary}>
                                <Summary />
                            </Route>
                        </Switch>
                    </Router>
                </main>
                <footer {...classes('footer')}>
                    <Informations />
                </footer>
            </div>
        </RecoilRoot>
    );
};

export default App;
