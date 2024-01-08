import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoutes(props) {
  if (localStorage.getItem("DaySooqUser")) {
    return props.children
  }else{
    return <Navigate to={"/Authorization"}></Navigate>
  }
}
