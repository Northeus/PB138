import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import Informations from './components/Informations/Informations';
import RoutingPaths from './utils/routingPaths';
import VehicleType from './components/VehicleType/VehicleType';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import './main.css';

const classes = new BEMHelper('container');

const App = () : JSX.Element => {
    return (
        <Router>
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
                    <Switch>
                        <Route path={RoutingPaths.VehicleType}>
                            <VehicleType />
                        </Route>
                    </Switch>
                </main>
                <footer {...classes('footer')}>
                    <Informations />
                </footer>
            </div>
        </Router>
    );
};

export default App;
