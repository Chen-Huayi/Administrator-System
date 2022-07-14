import {BrowserRouter, unstable_HistoryRouter as HistoryRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import {AuthComponent} from 'src/components/AuthComponent'

import './App.css'
import Publish from "./pages/Publish";
import Article from "./pages/Article";
import Home from "./pages/Home";
import { history } from 'src/utils/history'


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={
                        // <AuthComponent>
                            <Layout/>
                        //</AuthComponent>
                    }>

                        <Route index element={<Home />}></Route>
                        <Route path='article' element={<Article />}></Route>
                        <Route path='publish' element={<Publish />}></Route>

                    </Route>
                    {/*<Route path='/login' element={<Login></Login>}></Route>*/}
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
