import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { Button } from 'antd';

function App() {
  return (

      <BrowserRouter>
          <div className="App">
              <Button type="primary">Primary Button</Button>
              <Routes>
                  <Route path='/' element={<Layout></Layout>}></Route>
                  <Route path='/login' element={<Login></Login>}></Route>
              </Routes>
          </div>
      </BrowserRouter>

  )
}

export default App;
