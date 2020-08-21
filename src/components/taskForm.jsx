import React from 'react';

let moment = require('moment');
moment.locale('es');

export default function TaskForm(props){

  const handleInputChangeDate = (event) =>{
    
    let date = moment(event.target.value);
    console.log("Using moment : "+date);

    props.setData(date);
  }
  const handleInputChangeTask = (event) =>{
    // console.log(event.target.value);
    props.setTaskBody(event.target.value);
  }
  

    return (
        <div className="form">
           
            <form onSubmit={props.addTask} >
              
                <input name="task" type="text"  placeholder="Enter Task Here " onInput={handleInputChangeTask} required/>
                <input name="date" type="date"  onInput={handleInputChangeDate} required/>
                
                <input type="submit" value="Save"/>
            </form> 
            
        </div> 
    );
  
}


