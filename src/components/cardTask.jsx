import React, { useState, useEffect} from 'react';
let moment = require('moment');
moment.locale('es');

export default function CardTask(props) {

    const [isEditable, setEditable] = useState(false);
    const [isEditedTask, setEditTask] = useState();
    
    const editAvailable =()=>{setEditable(!isEditable);}

    useEffect(()=>{
        setEditTask(props.task.content)
    },[props])

    const onChangeTask =(e)=>{
        setEditTask(e.target.value);
        console.log(e.target.value);
    }
    

    const onChangeDate =(e)=>{
        console.log(e.target.value)
        let newDate = moment(e.target.value);
        console.log("New date: " +newDate)
        props.setData(newDate);
        
    }

    const update =(task_id, editedTask, taskUser_id, taskDate)=>{
        props.handleUpdate(task_id, editedTask, taskUser_id, taskDate)
        setEditable(!isEditable);
    }

    return (

        <div className="card">
            <div className="card-body">

                <div>
                    <span className="editar" onClick={editAvailable}>
                        <img src="https://image.flaticon.com/icons/svg/579/579675.svg" alt="edit"/>
                    </span> 

                    {
                        isEditable?
                        <div>
                            <div>
                                <input 
                                className="inputUpdate" 
                                type="text" 
                                onInput={onChangeTask} 
                                defaultValue={props.task.content}

                                />
                            </div>
                            <div>
                                <input name="date" type="date" onInput={onChangeDate}/>
                            </div>
                            <div>
                                <button 
                                className="btn btn-primary"
                                onClick={()=>{update(props.task._id, isEditedTask, props.task.user_id)}}
                                >
                                    Update 

                                </button>
                            </div>
                        </div>

                        :
                        <div>
                            <h3> {props.task.content}</h3>
                            <p>{moment(props.task.date).format('YYYY - MM - DD')}</p> 
                        </div>
                    }

                    {console.log(isEditable)}

                    {/* <input type="checkbox" value="false"/> */}

                </div>

                
                {/* <p>{props.task.date}</p> */}
            </div>


            <div className="card-footer">

                <button 
                className="btn btn-danger"
                onClick={()=>props.handleDelete(props.task._id)}
                >
                    Delete
                </button>

                {/* <button 
                className="btn btn-primary"
                onClick={()=>{update(props.task._id, isEditedTask, props.task.user_id, props.task.date)}}
                >
                    Update 

                </button> */}

            </div>
        </div>                          
    );
}
