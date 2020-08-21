import React, { useState, useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom';
import TaskForm from './taskForm';
import CardTask from './cardTask';
import Loading from './loader';
import Swal from 'sweetalert2';
import Filter from './filter';
import FilterTaskContent from './filterTaskContent';

let moment = require('moment');
moment.locale('es');

export default function PanelTasks(props){

  const [isFetch, setFetch] = useState(false);
  const [isTasks, setTasks] = useState([]);
  const [isData, setData] = useState([]);
  const [isTaskBody, setTaskBody] = useState([]);
  const [isFilterOptionSelected, setFilterOptionSelected] = useState([]);
  const [isDateOptionSelected] = useState([]);
  const [isTaskContent, setTaskContent]  = useState([]);
  const [isLogout, setLogout] = useState();
  

  /**ALERTS */
  const alertSuccess = (word) => {
    Swal.fire(
     word,
    'The user has been '+ word +'.',
    'success'
    )
  }
  /**ALERT DELETE */
  const alertDelete = id =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      background: '#fff',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.value){
       deleteTask(id);
       alertSuccess('Done');
      }
    })
  }
  

  useEffect(() => { getTasks() },[]);


  /**GET TASKS */
  const getTasks=async() =>{
    const response = await fetch("/tasks");
    const json = await response.json();

    console.log(response);
    response.ok?setFetch(true):setFetch(false);
    setTasks(json.results);
    
  }


  /**ADD TASK */
  const addTask=(event)=>{

    event.preventDefault();

    const task={
      content:isTaskBody,
      date: isData,
      userId:4
    }

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    };

    fetch("/tasks",options)
      .then((response)=>{ 
        response.json()
        getTasks();
        alertSuccess('Added');
      }
    )
  }

  /**UPDATE TASK*/
  const updateTask=(id, newTask, userId)=>{
  
    const task={
      content:newTask,
      date: isData,
      userId:userId
    }

    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    };

    fetch(`/tasks/${id}`,options)
    .then((response)=> response.json())
    .then(()=>{
      
        getTasks() 
        alertSuccess('Updated');
      
    })           
  }


  /**DELETE TASK */
  const deleteTask = (id) => {
    fetch(`/tasks/${id}`,{
      method:'DELETE'
    })
      .then(()=>{getTasks()})
      .catch(error => console.error(error));
  }
   
  /**FILTERS */
  const filterOption = (_date) => {
    console.log("Date Save: "+_date);
    setFilterOptionSelected(_date);
  }

  const filterDateOption = (task) => {
    let currentDay = moment();
    let initOfWeek = moment().startOf("week");
    let endOfWeek = moment().endOf("week");
    let initNextWeek = moment(endOfWeek).add(1,"seconds");
    let endNextWeek = moment(endOfWeek).add(7,"days")

    console.log(currentDay)
    switch(isFilterOptionSelected){

      case 'Today':
        if(moment(task.date).isSame(currentDay, "day")){
          return true;
        }else{
          return false;
        }
      
      
      case 'Week':
        if(moment(task.date).isBetween(initOfWeek, endOfWeek)){
          return true;
        }else{
          return false;
        }
        
      
      case 'Next Week':
        if(moment(task.date).isBetween(initNextWeek, endNextWeek)){
          return true;
        }else{
          return false;
        }
        
      
      default :
        return true;

    }
    
  }

  const filterTaskContent = (taskContent) => {
     console.log(taskContent);
      setTaskContent(taskContent);
  } 


  /**LOGOUT */
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will leave this session!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      background: '#fff',
      confirmButtonText: 'Yes, leave it!'
    }).then((result) => {
      setLogout(result.value);
      
    })
  }

  return (
    
    <Route {...props}>

      {props.isLogged ? (

        <div className="panel">
          <div>

            <h1 className="c-w">Tasks Borad</h1>
            <button className="btn btn-primary" onClick={logout}>Logout</button>

            {isLogout? <Redirect to="/"/>:<div></div>}

            <TaskForm addTask={addTask} setData={setData} setTaskBody={setTaskBody}/>
            <FilterTaskContent handleFilterContent={filterTaskContent}/>
            <Filter handleFilterDay={filterOption}/>
            {console.log(isTasks)}
            {console.log(isData)}

            {console.log("Date Save: "+isDateOptionSelected)}
                  <div className=" card-container">  

                    {isFetch?
                      isTasks.filter(task =>{
                        return task.content===""? true :
                          task.content.includes(isTaskContent)

                      }).filter(task => 

                        filterDateOption(task)
                        
                      ).map((task)=>{

                        return(

                          <CardTask 
                            key={task._id} 
                            task={task} 
                            handleDelete={alertDelete}
                            handleUpdate={updateTask}
                            setData={setData}
                          />     
                        )
                      }):<Loading />
                    }
                  </div>
          </div>
              
        </div>

      ) : (

        <Redirect to="/" />

      )}

    </Route>
  );
}

