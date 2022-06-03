import "./App.scss";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./views/login.js";
import Register from "./views/register";
import ToDoList from "./views/to-do-list.js";
import { AuthProvider } from "./auth/auth";
import { ProtectRoutes } from "./auth/protectRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/to-do-list"
              element={
                <ProtectRoutes>
                  <ToDoList />
                </ProtectRoutes>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/to-do-list" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
