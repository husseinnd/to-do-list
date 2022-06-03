import { useNavigate } from "react-router-dom";
import { useEffect, useState, useReducer, useRef } from "react";
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
  const taskInputRefs = useRef([]);
  const [addTaskInput, setAddTaskInput] = useState("");
  const [editMode, setEditMode] = useReducer(
    (editMode, newEditMode) => ({ ...editMode, ...newEditMode }),
    {
      isEdit: false,
      id: "",
      text: "",
    }
  );

  //getting all the data for the tasks
  useEffect(() => {
    document.title = "To Do List";
    todo.getAll();
  }, []);

  //logout function
  const logout = (e) => {
    // sure valid so submit
    auth.logout().then(() => {
      navigate("/login");
    });
  };

  const editTask = (e, description) => {
    if (e.key === "Enter") {
      if (editMode.text === description) {
        resetEditMode();
        return;
      }
      if (!editMode.text) {
        alert("Please Enter a Task Description");
        return;
      }
      todo.update(editMode.id, { description: editMode.text });
      resetEditMode();
    }
  };

  //this function is to reset the data in the edit mode state after exiting edit mode.
  const resetEditMode = () => {
    setEditMode({
      isEdit: false,
      id: "",
      text: "",
    });
  };

  //this is to render the to do list tasks.
  const renderTasks = () => {
    return (
      <div className="tasks-container">
        {todo.list.map(({ completed, description, _id: id }, i) => {
          const isEditMode = editMode.id === id;
          return (
            <div
              key={`to-do-list-item-${i}`}
              className={`task-row ${isEditMode ? "edit-mode" : ""}`}
            >
              <span
                className={`completed-status ${completed ? "completed" : ""}`}
              >
                <FontAwesomeIcon icon={!completed ? faCircle : faCircleCheck} />
              </span>
              <input
                type="text"
                className="task-desc"
                value={isEditMode ? editMode.text : description}
                ref={(el) => (taskInputRefs.current[i] = el)}
                onKeyDown={(e) => editTask(e, description)}
                onChange={(e) => setEditMode({ text: e.target.value })}
                disabled={isEditMode ? !editMode.isEdit : true}
              />
              <div className="task-actions">
                <span>
                  <FontAwesomeIcon
                    icon={faPencil}
                    onClick={(e) => {
                      setEditMode({ id, isEdit: true, text: description });
                      setTimeout(() => {
                        taskInputRefs.current[i].focus();
                      }, 0);
                    }}
                  />
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

  //add task on keyboard enter key press
  const addOnEnter = (e) => {
    if (e.key === "Enter") {
      todo.add({ description: addTaskInput });
    }
  };

  //this is to render the input field for user input
  const renderCreateTask = () => {
    return (
      <div className="add-task">
        <FontAwesomeIcon icon={faPlusCircle} />
        <input
          type="text"
          value={addTaskInput}
          onChange={(e) => setAddTaskInput(e.target.value)}
          onKeyDown={addOnEnter}
          placeholder="Add Task"
        />
      </div>
    );
  };

  return (
    <div className="to-do-list">
      <div className="to-do-list-container">
        <div className="container-header">
          <h2 className="title">To do list</h2>
          <button onClick={logout}>Logout</button>
        </div>
        <div>
          {renderCreateTask()}
          {renderTasks()}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
