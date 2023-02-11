import React, { useEffect, useState } from 'react';
import axio from 'axios';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loginAsync, logout, selectLogged } from './studentSlice';
import styles from './student.module.css';


export function Student() {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  //const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   axio.get("test").then(res => console.log(res.data))
  // }, [])


  return (
    <div>
      Login < br />
      Username : <input onChange={(e) => setusername(e.target.value)}></input>
      password: <input type={"password"} onChange={(e) => setpassword(e.target.value)}></input>
      <button onClick={() => dispatch(loginAsync({ username, password }))}>Login</button>
    </div>
  );
}
