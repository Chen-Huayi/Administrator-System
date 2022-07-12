import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { Button } from 'antd';
import {AuthComponent} from 'src/components/AuthComponent'
function App() {
  return (

      <BrowserRouter>
          <div className="App">
              <Button type="primary">Primary Button</Button>
              <Routes>
                  <Route path='/' element={
                    <AuthComponent>
                        <Layout></Layout>
                    </AuthComponent>

                  }></Route>
                  <Route path='/login' element={<Login></Login>}></Route>
              </Routes>
          </div>
      </BrowserRouter>

  )
}

export default App;
