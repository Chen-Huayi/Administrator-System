import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from "react-router-dom";
import {AuthComponent} from 'components/AuthComponent'
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Layout from "./pages/layout";
import Publish from "./pages/publish";
import Article from "./pages/article";
import ResetPw from './pages/reset-password'
import UpdateProfile from './pages/update-profile'
import {history} from 'utils/history'
import './App.css'

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
                        <Route path='update-profile' element={<UpdateProfile />}></Route>
                    </Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/reset-pwd' element={<ResetPw />}></Route>
                </Routes>
            </div>
        </HistoryRouter>
    )
}

export default App;
