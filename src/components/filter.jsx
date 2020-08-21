import React, { useState } from 'react';

export default function Filter(props) {
  const [isOptions] = useState(['Today','Week','Next Week']);

    return (
      <div className="filter">
          <h2 className="c-w">Filer</h2>
          <select onChange={(e)=>props.handleFilterDay(e.target.value)}>
            <option key={0} defaultValue="All">All</option>
            {
                isOptions.map((option, i)=>{
                    return(
                        <option key={i} value={option}>{option}</option>
                    )
                })
            }
          </select>
          <i></i>
        
      </div>
    );
  
}
