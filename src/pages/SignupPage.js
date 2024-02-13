import React from 'react'
import signupImage from '../assets/Images/signup.png'
import Template from '../components/core/Auth/Login-Signup-Template'
function Signup() {
  return (
    <div>
      <Template 
        title="Join the millions learning to code with StudyNotion for free" 
        image={signupImage} 
        formType="signup" 
      />
    </div>
  )
}

export default Signup