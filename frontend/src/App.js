import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from "react-router-dom";
import {AuthComponent} from 'components/AuthComponent'
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Publish from "./pages/Publish";
import Article from "./pages/Article";
import {history} from 'utils/history'
import Update from './pages/Update/password'
import UserInfo from './pages/Update/userInfo'

function App() {
    return (
        <HistoryRouter history={history}>
            <div className="App">
                <Routes>
                    <Route path='/' element={
                        <AuthComponent>
                            <Layout/>
                        </AuthComponent>
                    }>
                        <Route index element={<Home />}></Route>
                        <Route path='article' element={<Article />}></Route>
                        <Route path='publish' element={<Publish />}></Route>
                        <Route path='update-profile' element={<UserInfo />}></Route>
                    </Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/reset-pwd' element={<Update />}></Route>
                </Routes>
            </div>
        </HistoryRouter>
    )
}

export default App;
