import React, { useEffect, useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import { useSelector } from 'react-redux';

function ChipInput( { label , name , placeholder , register , errors , setValue } ) {
    const { course } = useSelector( (state) => state.course )
    const [ tagValue , setTagValue ] = useState('');
    const [ tags , setTags ] = useState( course ? course.tag : [] );

    const addTag = (e) => {
        if( e.key === 'Enter' && tagValue ){
            setTags([ ...tags , tagValue ]);
        }
    }
    const removeTag = ( index ) => {
        setTags( tags.filter( (tag , i) => i !== index ) );
    }
    useEffect( () => {
        { register( `${ name }` , { required : true } ) }
    } , [])
    useEffect( () => {
        setValue( name , tags );
    } , [tags])
  return (
    <div>
        <div className='flex flex-wrap gap-2 mb-2'>
            {/* show tags here */}
            {
                tags.length > 0 && tags.map( ( tag , index ) => (
                    <span key={ index } className='flex gap-2 px-2 py-1 text-sm rounded-md bg-yellow-50 text-richblack-800 font-semibold'>
                        { tag }
                        <div className='cursor-pointer' 
                        onClick={ () => removeTag( index ) }>
                            <MdOutlineCancel size={`1.30rem`}/>
                        </div>
                    </span>
                ))
            }
        </div>
        <div>
            <label htmlFor={ name } className='text-white'>{ label }<sup className='text-red'>*</sup></label>
            <input
                name={ name }
                placeholder={ placeholder }
                onChange={ (e) => { setTagValue( e.target.value ) } }
                onKeyDown={ addTag }
                className='focus:outline-none w-full bg-richblack-700 rounded-md p-2 border-b border-richblack-300 text-richblack-300'
            />
            {
                errors[name] && (
                    <span className='text-red'>Course Tags are required</span>
                )
            }
        </div>
    </div>
  )
}

export default ChipInput