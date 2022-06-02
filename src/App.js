import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/login.js';
import Register from './views/register';
import Home from './views/home.js';
import { AuthProvider } from './api/auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
            </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
