import React, { Component, useState } from 'react'
import Button from '@material-ui/core/Button';

import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import Register from './components/Register'

function App() {
  
  const [showLog, setLog] = useState(0) 

  
    return (
      
      <div  className="App">
        <Button onClick={() => setLog(showLog != 1 ? 1 : 0)}>Sign In</Button>
        <Button onClick={() => setLog(showLog != 2 ? 2 : 0)}>Register</Button>
        {showLog == 1 ? <SignIn showLog={1} showModal={showLog!=0} onClose={() => setLog(0)}/> : showLog == 2 ? <SignIn showLog={2} showModal={showLog!=0} onClose={() => setLog(0)}/> : null}
        <Dashboard/>
      </div>
    );
  
}

export default App;
