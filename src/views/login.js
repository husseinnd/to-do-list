import React, { useReducer } from "react";
import { useAuth } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import validation from "../helper/form-validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [inputType, setInputType] = useReducer(
    (oldInputType, newInputType) => ({ ...oldInputType, ...newInputType }),
    {
      password: "",
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
    const { email, password } = inputType;
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
    auth.login({ email, password }).then((response) => {
      navigate("/");
    });
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2 className="form-title">User Login</h2>
        <form>
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
              Login
            </button>
          </div>
        </form>
        <div className="form-links">
          <Link to={"/register"} className="register">
            Don't Have an Account?
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
