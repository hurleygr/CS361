import React, { Component, useState } from 'react'
import Button from '@material-ui/core/Button';

import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'

import Register from './components/Register'

function App() {
  
  const [showLog, setLog] = useState(0) 
  const [user, setUser] = useState(null)

  
    return (
      
      <div  className="App">
        {user == null ? <Button onClick={() => setLog(showLog != 1 ? 1 : 0)}>Sign In</Button> : null}
        {user == null ? <Button onClick={() => setLog(showLog != 2 ? 2 : 0)}>Register</Button> : null}
        {showLog == 1 ? <SignIn showLog={1} showModal={showLog!=0} onClose={() => setLog(0)} fun={setUser}/> : showLog == 2 ? <SignIn showLog={2} showModal={showLog!=0} onClose={() => setLog(0)} fun={setUser}/> : null}
        {user == null ? null : <div>Logged in as: {user}  <SignOut fun={setUser}/> </div>}
        <Dashboard user={user}/>
      </div>
    );
  
}

export default App;
