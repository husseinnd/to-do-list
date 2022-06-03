import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage["access_token"] ? true : false
  );

  //creating axios instance for api calls
  const instance = axios.create({
    baseURL: "https://api-nodejs-todolist.herokuapp.com/user/",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage["access_token"]
        ? `Bearer ${localStorage["access_token"]}`
        : "",
    },
  });

  function setToken(value) {
    localStorage["access_token"] = value;
    setIsAuthenticated(value ? true : false);
  }

  const login = async (data) => {
    return await new Promise((resolve, reject) => {
      instance.post(`login`, data).then(
        (response) => {
          alert("loggedin Successfully");
          setToken(response.data.token);
          resolve(response);
        },
        (errorRes) => {
          alert(errorRes.response.data);
          reject(errorRes);
        }
      );
    });
  };

  const register = async (data) => {
    return await new Promise((resolve, reject) => {
      instance.post(`register`, data).then(
        (response) => {
          alert("Registered Successfully");
          setToken(response.data.token);
          resolve(response);
        },
        (errorRes) => {
          alert(errorRes.response.data);
          reject(errorRes);
        }
      );
    });
  };

  const logout = async () => {
    return await instance.post(`logout`).then((response) => {
      alert("loggedout successfully");
      setToken("");
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
