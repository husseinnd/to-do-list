import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/auth";
import validation from "../helper/form-validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [inputType, setInputType] = useReducer(
    (oldInputType, newInputType) => ({ ...oldInputType, ...newInputType }),
    {
      password: "",
      name: "",
      age: "",
      email: "",
    }
  );

  const [errorType, setErrorType] = useReducer(
    (oldErrorType, newErrorType) => ({ ...oldErrorType, ...newErrorType }),
    {
      password: "",
      email: "",
    }
  );

  const navigate = useNavigate();
  const auth = useAuth();

  const submit = (e) => {
    e.preventDefault();
    const { name, email, password, age } = inputType;
    const { valid, errors } = validation(email, password);
    if (!valid) {
      if (errors.email) {
        setErrorType({ email: errors.email });
      } else {
        setErrorType({ email: "" });
      }
      if (errors.password) {
        setErrorType({ password: errors.password });
      } else {
        setErrorType({ password: "" });
      }
      return;
    }
    // sure valid so submit
    auth.register({ name, email, password, age }).then((response) => {
      navigate("/");
    });
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h2 className="form-title">User register</h2>
        <form>
          <div className="name form-elt">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              value={inputType.name}
              onChange={(e) => setInputType({ name: e.target.value })}
              placeholder="Full Name"
            />
          </div>
          <div className="age form-elt">
            <FontAwesomeIcon icon={faCalendar} />
            <input
              type="number"
              value={inputType.age}
              onChange={(e) => setInputType({ age: e.target.value })}
              placeholder="Age"
            />
          </div>
          <div className="email form-elt">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="email"
              value={inputType.email}
              onChange={(e) => setInputType({ email: e.target.value })}
              placeholder="Email"
            />
            <p className="error">{errorType.email}</p>
          </div>
          <div className="passowrd form-elt">
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              value={inputType.password}
              onChange={(e) => setInputType({ password: e.target.value })}
              placeholder="Password"
            />
            <p className="error">{errorType.password}</p>
          </div>
          <div className="form-action">
            <button onClick={submit} type="submit">
              register
            </button>
          </div>
        </form>
        <div className="form-links">
          <Link to={"/login"} className="login">
            Already Have an Account?
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
