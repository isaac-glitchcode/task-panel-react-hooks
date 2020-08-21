import React from 'react';

export default function FilterTaskContent (props) {
  
    return (
      <div>
          <h2 className="c-w">Search</h2> 
          <input type="text" 
            className="inputSearch"
            onChange={
            (event)=> props.handleFilterContent(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase())}
          />
      </div>
    );
  
}
