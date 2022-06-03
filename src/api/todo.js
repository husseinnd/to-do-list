import axios from "axios";
import { createContext, useContext, useState } from "react";

const ToDoContext = createContext(null);

export const ToDoProvider = ({ children }) => {
  const [list, setList] = useState([]);

  //creating axios instance for api calls
  const instance = axios.create({
    baseURL: "https://api-nodejs-todolist.herokuapp.com/task",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage["access_token"]
        ? `Bearer ${localStorage["access_token"]}`
        : "",
    },
  });

  const getAll = async () => {
    return await instance.get("").then((response) => {
      setList(response.data.data);
    });
  };

  const add = async (description) => {
    return await instance.post("", { description }).then((response) => {
      setList([...list, response.data.data]);
    });
  };

  return (
    <ToDoContext.Provider
      value={{
        list,
        getAll,
        add,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDo = () => {
  return useContext(ToDoContext);
};
