import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';

const ProtectedRote = () =>{
  const localToken = localStorage.getItem("session");

    let auth = {'token':localToken}
    console.log("session :: ",auth.token)
  return (
    auth.token==="true"? <Outlet/> : <Navigate to="/"/>
  )
}

export default ProtectedRote