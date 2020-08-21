import React, {useState} from 'react';
import Navbar from './components/navbar';
import Panel from './components/panel';
import { Switch, Route }from "react-router-dom";
import Login from './components/login';
import './App.css';
import './css/navbar.css';
import SignUp from './components/signUp';
import NotFound from './components/notfound';

function App (){
  const [isLogged, setLogged] = useState(true);
  
  return (
    <div className="App">
      <Switch>

        <Route exact path="/">
            <Navbar />
            <Login setLogged={setLogged} />
        </Route>

        <Route path="/signup">
            <Navbar />
            <SignUp/>
        </Route>

        <Panel path="/panel" isLogged={isLogged}/>
        
        <Route>
            <Navbar />
            <NotFound/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
