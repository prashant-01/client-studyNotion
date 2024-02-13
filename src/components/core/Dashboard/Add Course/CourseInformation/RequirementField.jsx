import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function RequirementField( { label , name , placeholder , register , errors , setValue }) {
    const { course } = useSelector( (state) => state.course )
    const [ requirementValue , setRequirementValue ] = useState('');
    const [ requirements , setRequirements ] = useState( course ? course.instructions : [] );
    const addRequirements = () => {
        if( requirementValue ){
            setRequirements( [...requirements , requirementValue] );
            setRequirementValue('');
        }
    }
    const removeRequirement = ( index ) => {
        if( requirements.length > 0 ){
            setRequirements( requirements.filter( ( _ , i ) => i !== index ) )
        }
    }
    useEffect( () => {
        { register( `${ name }` , { required : true } ) }
    } , [])

    useEffect( () => {
        setValue( name , requirements );
    } , [requirements])

  return (
    <div className=''>
        <div>
            <label htmlFor={ name } className='text-white'>{ label }<sup className='text-red'>*</sup></label>
            <input 
                placeholder={ placeholder }
                className='focus:outline-none w-full bg-richblack-700 rounded-md p-2 border-b border-richblack-300  text-richblack-300'
                onChange={ (e) => { setRequirementValue( e.target.value ) } }
            />
            {
                errors[name] && (
                    <span className='text-red'>Course Instructions are required</span>
                )
            }
        </div>
        <p className='text-yellow-25 font-semibold text-lg cursor-pointer'
            onClick={ addRequirements }>
            Add
        </p>
        <ul className='list-decimal flex flex-col flex-wrap w-[500px] text-white px-4 py-2 text-wrap'>
            {
                requirements.map( (requirement , index) => (
                    <li key={index} className='w-[500px]'>
                        <div>{ requirement + ' ' } 
                            <span className='text-richblack-500 text-sm cursor-pointer'
                            onClick={ () => { removeRequirement( index ) } }>
                                clear
                            </span>
                        </div>
                    </li>
                ) )
            }
        </ul>
    </div>
  )
}

export default RequirementField