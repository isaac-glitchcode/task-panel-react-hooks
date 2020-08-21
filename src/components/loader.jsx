import React from 'react';
import { PuffLoader } from 'react-spinners';

export default function Loading (){
  
    return (
      <div className="loading">
          <PuffLoader/>
          <h1>Loading...</h1>
      </div>
    );
  
}
