import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../api/auth";
import { useToDo } from "../api/todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPencil,
  faTrash,
  faCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

function ToDoList() {
  const navigate = useNavigate();
  const auth = useAuth();
  const todo = useToDo();
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    document.title = "To Do List";
    todo.getAll();
  }, []);

  const logout = (e) => {
    // sure valid so submit
    auth.logout().then(() => {
      navigate("/login");
    });
  };

  const renderTasks = () => {
    return (
      <div className="tasks-container">
        {todo.list.map(({ completed, description }, i) => {
          return (
            <div key={`to-do-list-item-${i}`} className="task-row">
              <span
                className={`completed-status ${completed ? "completed" : ""}`}
              >
                <FontAwesomeIcon icon={!completed ? faCircle : faCircleCheck} />
              </span>
              <span className="task-desc">{description}</span>
              <div className="task-actions">
                <span>
                  <FontAwesomeIcon icon={faPencil} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const addOnEnter = (e) => {
    if (e.key === "Enter") {
      todo.add(taskInput);
    }
  };

  const renderCreateTask = () => {
    return (
      <div>
        <FontAwesomeIcon icon={faPlusCircle} />
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={addOnEnter}
        />
      </div>
    );
  };

  return (
    <div className="to-do-list">
      <div className="to-do-list-container">
        <h2 className="title">To do list</h2>
        <span onClick={logout}>Logout</span>
        <div>
          {renderCreateTask()}
          {renderTasks()}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
