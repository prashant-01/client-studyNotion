import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function SideBarLink({ link , iconName }) {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = ( route ) => {
        return route === location.pathname
    }
  return (
    <Link to={ link.path }
    className={ ` relative px-8 py-2 text-sm font-medium  ${ matchRoute( link.path ) ? 'bg-yellow-800' : 'bg-opacity-0' }` }>
        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 
        ${ matchRoute( link.path ) ? 'opacity-100' : 'opacity-0' }`}></span>
        <div className='flex items-center gap-2'>
            <Icon className='text-lg text-richblack-50' />
            <span className='text-white'> { link.name } </span>
        </div>
    </Link>
  )
}

export default SideBarLink