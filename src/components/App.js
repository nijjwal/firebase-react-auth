import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import {Container} from 'react-bootstrap';
import {AuthContextProvider} from '../contexts/AuthContext'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (     
      
        <Container className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{maxWidth: "400px"}}>
            
            <Router>

              <AuthContextProvider>
                <Routes>
                  <Route exact path = "/"  element={<Dashboard/>}></Route>
                  <Route path="/signup" element={<Signup/>}></Route>
                  <Route path="/login" element={<Login/>}></Route>
                </Routes>
              </AuthContextProvider>

            </Router>
            
          </div>

        </Container>
  );
}

export default App;
