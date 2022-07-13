import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import {AuthComponent} from 'src/components/AuthComponent'
import './App.css'

function App() {
  return (

      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path='/' element={
                    <AuthComponent>
                        <Layout/>
                    </AuthComponent>
                  }></Route>
                  <Route path='/login' element={<Login></Login>}></Route>
              </Routes>
          </div>
      </BrowserRouter>
  )
}

export default App;
