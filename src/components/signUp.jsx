import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';

export default class SignUp extends Component {

  constructor(props){
    super(props);
    this.state={
      login:false,
      formData:{},
      img:"https://image.flaticon.com/icons/png/512/306/306473.png"
    }
  }
    
  alertSuccess = (word) => {
    Swal.fire(
     word,
    'The user has been created',
    'success'
    )
  }


  register = (event) => {
    event.preventDefault();
    document.getElementById("clear").reset();
    fetch("https://academlo-todolist.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.formData)
    })
    .then(()=>{this.alertSuccess('Done')})  
    .catch(error => console.log(error)); 
  };
   
    //Guardo Temporalmente los datos
  setInputValue = event => {
    event.preventDefault();
    this.setState({ 
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value 
      }
    });
    console.log(this.state.formData)
  };

   loginFn = () =>{
    this.setState({login:true});
  }
  render() {
    return ( 
      <Route>
        <div className="form">
          <div>
            <img src={this.state.img} alt=""/>
          </div>
          <form onSubmit={this.register} onInput={this.setInputValue} id="clear">
            <input name="name"     type="text"     placeholder="Name(s)" required/>
            <input name="lastname" type="text"     placeholder="Lastname" required/>
            <input name="email"    type="email"    placeholder="Email" required/>
            <input name="password" type="password" placeholder="Password" required/>
            <input type="submit" />
          </form>
          <p className="count">Have an account? <button className="btnSignUp" onClick={this.loginFn} >Login now</button></p>
          {this.state.login? <Redirect to="/"/>:<div></div>} 
        </div> 
      </Route>
    );
  }
}
