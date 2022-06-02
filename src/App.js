import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/login.js';
import Home from './views/home.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
