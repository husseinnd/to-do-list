import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/login.js';
import Register from './views/register';
import Home from './views/home.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
