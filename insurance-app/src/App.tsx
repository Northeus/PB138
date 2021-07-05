import React from 'react';
import { RecoilRoot } from 'recoil';
import Container from './components/Container/Container';
import './utils/css/normalize.css';
import './main.css';

const App = () : JSX.Element => {
    return (
        <RecoilRoot>
            <Container></Container>
        </RecoilRoot>
    );
};

export default App;
