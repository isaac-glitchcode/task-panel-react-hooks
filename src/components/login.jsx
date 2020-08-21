import React, { useState } from 'react';
import Icon from "../images/icon.png";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';


export default function Login (props) {
  const [login, setLogin] = useState({email:"", password:""});
  const history = useHistory();

  const alertError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Try again!',
      text: 'Invalid username or password'
    })
  }

  const loginFn = async (event) => {
      event.preventDefault();
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
      };

      let response = await fetch("https://academlo-todolist.herokuapp.com/login",options);
      let results = await response.json();
      if (response.ok) {
        props.setLogged(true);
        history.push("/panel");
      } else {
        alertError()
        props.setLogged(false);
      }

      console.log(results);
  };

  return (
      <div className="form">
          <div>
              <img src={Icon} alt=""/>
          </div>
          <form onSubmit={loginFn} onInput={(event) =>
              setLogin({ ...login, [event.target.name]: event.target.value })
              }>
              <span></span> <input name="email"    type="email"    placeholder="Email" />
              <span></span> <input name="password" type="password" placeholder="Password" />
              <input type="submit" value="Iniciar Sesión"/>
          </form> 
          <p className="count">Don't have an account? <a href="/signup">Sign up now</a></p>
      </div> 
  );
  
}
