import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

function ToDoList() {
  const navigate = useNavigate();
  const auth = useAuth();

  const logout = (e) => {
    // sure valid so submit
    auth.logout().then(() => {
      navigate("/login");
    });
  };

  const renderTasks = (data) => {
    <div className="tasks-container"></div>;
  };
  return (
    <div className="to-do-list">
      <div className="to-do-list-container">
        <h2 className="title">To do list</h2>
        <div></div>
        <span onClick={logout}>Logout</span>
      </div>
    </div>
  );
}

export default ToDoList;
