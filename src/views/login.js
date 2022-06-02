import React, { useState } from "react";
import { Link } from 'react-router-dom';
import validation from "../helper/form-validation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");


  const submit = (e) => {
    e.preventDefault();
    
    const {valid, errors} = validation(email, password);
    if(!valid) {
        if(errors.email) {
            setemailError(errors.email);
        }else{
            setemailError("")
        }
        if(errors.password) {
            setpasswordError(errors.password);
        }else{
            setpasswordError("")
        }
        return;
    }
    // sure valid so submit
    // @todo submit 
  };

  return (
    <div className="login-page">
        <div className="login-form">
            <h2 className="form-title">User Login</h2>
            <form>
                <div className="email">
                    <FontAwesomeIcon icon={faUser} />
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <p className="error">
                        {emailError}
                    </p>
                </div>
                <div className="passowrd">
                    <FontAwesomeIcon icon={faLock} />
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <p className="error">
                        {passwordError}
                    </p>
                </div>
                <div className="action">
                    <button onClick={submit} type="submit">Login</button>
                </div>
            </form>
            <div className="register-container">
                <Link to={""} className="register">Don't Have an Account?</Link>
            </div>
        </div>
    </div>
  );
}
export default Login;
