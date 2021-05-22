import React from 'react';
import { Route, Switch } from "react-router-dom";

import Header from './components/Common/Header';
import Footer from './components/Common/Footer';

import Home from './pages/HomePage';
import Introduce from './pages/IntroductionPage';
import ListJournal from './pages/ListJournalPage';
import SignIn from './pages/SignInPage';
import Regulation from './pages/RegulationPage';
import Instruction from './pages/InstructionPage';
import Dashboard from './pages/Dashboard';
import Contact from './pages/ContactPage';
import SignUp from './pages/SignUpPage';
// import articleApi from './api/articleApi';

function App() {
    // const [articlList, setArticlList] = useState([]);

    // useEffect(() => {
    //     const fetchArticleList = async () => {

    // const params = {
    //     page: 1,
    //     limit: 10
    // }
    //         try {
    //             const response = await articleApi.getAll(params);
    //             console.log(response);
    //         } catch (error) {
    //             console.log('Failed: ', error);
    //         }
    //     }
    //     fetchArticleList();
    // }, []);

    return (
        <>
            <Switch>
                <Route path='/tac-gia'></Route>
                <Route path='/phan-bien'></Route>
                <Route path='/thong-tin-ca-nhan'></Route>
                <Route path="*" ><Header /></Route>
            </Switch>
            <div style={{ minHeight: '100vh' }}>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/gioi-thieu">
                        <Introduce />
                    </Route>
                    <Route path="/so-tap-chi">
                        <ListJournal />
                    </Route>
                    <Route path="/quy-dinh-the-le">
                        <Regulation />
                    </Route>
                    <Route path="/huong-dan">
                        <Instruction />
                    </Route>
                    <Route exact path="/lien-he">
                        <Contact />
                    </Route>
                    <Route path="/dang-nhap">
                        <SignIn />
                    </Route>
                    <Route path="/dang-ky">
                        <SignUp />
                    </Route>
                    <Route path="/bai-bao-noi-bat">
                        {/* ... */}
                    </Route>
                    <Route path="/bai-bao-moi-nhat">
                        {/* ... */}
                    </Route>

                    <Route path="/tac-gia">
                        <Dashboard />
                    </Route>
                    
                    <Route path="/phan-bien">
                        <Dashboard />
                    </Route>
                    <Route path="*">
                        <div>404</div>
                    </Route>
                </Switch>
            </div>
            <Footer />
        </>
    );
}

export default App;
