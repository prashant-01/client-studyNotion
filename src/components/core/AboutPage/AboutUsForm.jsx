import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

function AboutUsForm() {
  return (
    <div className='mt-32 flex flex-col gap-2'>
        <p className='text-4xl text-white font-semibold text-center'>Get in Touch</p>
        <p className='text-richblack-300 text-center mb-8 text-sm italic'>We’d love to here for you, Please fill out this form.</p>
        <ContactUsForm/>
    </div>
  )
}

export default AboutUsForm