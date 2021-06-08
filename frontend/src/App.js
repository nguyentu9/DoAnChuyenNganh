import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/HomePage';
import Introduce from './pages/IntroductionPage';
import ListJournal from './pages/ListJournalPage';
import SignIn from './pages/SignInPage';
import Regulation from './pages/RegulationPage';
import Instruction from './pages/InstructionPage';
import Dashboard from './pages/Dashboard';
import Contact from './pages/ContactPage';
import SignUp from './pages/SignUpPage';

function App() {
    return (
        <>
            <Switch>
                {/* If url match tac-gia,.. then hidden Header component  */}
                <Route path='/tac-gia' />
                <Route path='/phan-bien' />
                <Route path='/thong-tin-ca-nhan' />
                <Route path='*' component={Header} />
            </Switch>
            <div style={{ minHeight: '100vh' }}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/gioi-thieu' component={Introduce} />
                    <Route path='/so-tap-chi' component={ListJournal} />
                    <Route path='/quy-dinh-the-le' component={Regulation} />
                    <Route exact path='/huong-dan' component={Instruction} />
                    <Route exact path='/lien-he' component={Contact} />
                    <Route path='/dang-nhap' component={SignIn} />
                    <Route path='/dang-ky' component={SignUp} />
                    <Route
                        path='/bai-bao-noi-bat'
                        component={<div>example</div>}
                    />
                    <Route
                        path='/bai-bao-moi-nhat'
                        component={<div>example</div>}
                    />
                    <Route path='/tac-gia' component={Dashboard} />
                    <Route path='/phan-bien' component={Dashboard} />

                    <Route path='*' component={<div>404</div>} />
                </Switch>
            </div>
            <Footer />
        </>
    );
}

export default App;
