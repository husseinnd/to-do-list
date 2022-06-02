import React, { useState } from "react";
import { Link } from 'react-router-dom';
import validation from "../helper/form-validation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faCalendar } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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
    <div className="register-page">
        <div className="register-form">
            <h2 className="form-title">User register</h2>
            <form>
                <div className="name">
                    <FontAwesomeIcon icon={faUser} />
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full Name" />
                </div>
                <div className="age">
                    <FontAwesomeIcon icon={faCalendar} />
                    <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Age" />
                </div>
                <div className="email">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                    <p className="error">
                        {emailError}
                    </p>
                </div>
                <div className="passowrd">
                    <FontAwesomeIcon icon={faLock} />
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                    <p className="error">
                        {passwordError}
                    </p>
                </div>
                <div className="action">
                    <button onClick={submit} type="submit">register</button>
                </div>
            </form>
            <div className="login-container">
                <Link to={"/login"} className="login">Already Have an Account?</Link>
            </div>
        </div>
    </div>
  );
}
export default Register;
