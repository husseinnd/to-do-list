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

  const add = async (data) => {
    return await instance.post("", data).then((response) => {
      setList([...list, response.data.data]);
    });
  };

  const update = async (id, data) => {
    return await instance.put(id, data).then((response) => {
      const updatedData = response.data.data;
      const itemIndex = list.findIndex((item) => {
        return id === item.id;
      });
      //   list[itemIndex] = updatedData;
      const tempList = [...list];
      tempList[itemIndex] = updatedData;
      setList(tempList);
    });
  };

  return (
    <ToDoContext.Provider
      value={{
        list,
        getAll,
        add,
        update,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDo = () => {
  return useContext(ToDoContext);
};
