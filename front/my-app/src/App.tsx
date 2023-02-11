import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Student } from './features/students/Student';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { logout, selectLogged ,selectuserName} from './features/students/studentSlice';
// import username from 

function App() {
  const logged = useAppSelector(selectLogged);
  const dispatch = useAppDispatch();
  const uName = useAppSelector(selectuserName);

  useEffect(() => {
  }, [logged, uName,logout])
  
  
  return (
    <div className="App">
      <header className="App-header">
      <h2>welcome {uName} </h2>
      {logged ? <div><button onClick={() => dispatch(logout())}>logout</button>
      </div> :
        <Student />}
      </header>
    </div>
  );
}
//{username}
export default App;
