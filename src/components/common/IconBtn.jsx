import React from 'react'

function IconBtn({
    text ,
    onclick ,
    children ,
    disabled ,
    outline = false ,
    customClasses , 
    type

}) {
  return (
    <button
    disabled={ disabled }
    onClick={ onclick }
    type={ type }
    className='text-white'
    >
        {
            children ? (
                <div>
                    <span> {text} </span>
                    {children}
                </div>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn