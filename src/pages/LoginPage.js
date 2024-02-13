import React from 'react'
import Template from '../components/core/Auth/Login-Signup-Template'
import loginImage from '../assets/Images/login.png'
function Login( ) {
  return (
    <div>
    <Template 
        title="Welcome Back" 
        image={loginImage} 
        formType="login" 
        // setisLoggedin={props.setisLoggedin}
    />
    </div>
  )
}

export default Login