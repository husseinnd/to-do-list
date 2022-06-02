import './App.scss';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from './views/login.js';
import Register from './views/register';
import Home from './views/home.js';
import { AuthProvider } from './auth/auth';
import { ProtectRoutes } from './auth/protectRoutes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route path="/" element={<ProtectRoutes><Home/></ProtectRoutes>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route
                  path="*"
                  element={<Navigate to="/" replace />}
              />
            </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
