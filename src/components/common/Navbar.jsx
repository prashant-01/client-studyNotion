import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/Logos/studynotion_logo.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { courseEndpoints } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io";
import { logout } from '../../services/operations/authAPI'
import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI'
import { setCategories } from '../../slices/categorySlice'

const { COURSE_CATEGORIES_API } = courseEndpoints;
function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const matchRoute = ( path ) => {
        return (path === location.pathname)
    }

    const { token } = useSelector( (state) => state.auth );
    const { user } = useSelector( (state) => state.profile );
    const { totalItems } = useSelector( (state) => state.cart );
    const [ loading , setLoading ] = useState(false);

    // const [ subLinks , setSubLinks ] = useState([]);

    const { categories } = useSelector( state => state.categories );
    const fetchSubLinks = async () => {
        setLoading(true);
        try {
            const allCategories = await fetchCourseCategories();
            // setSubLinks( allCategories );
            dispatch( setCategories( allCategories ) );
        }
        catch( error ){
            console.log('Could not fetch category list');
        }
        setLoading(false);
    }
    useEffect( () => {
        fetchSubLinks();
    } , [] );
  return ( 
    <div className='border-b-[1px] border-richblack-700 bg-richblack-800'>
        <div className='flex items-center justify-around md:w-11/12 py-2'>
            {/* logo */}
            <Link to='/'>
                <img src={ logo }/>
            </Link>

            {/* Navbar links */}
            <nav className='flex gap-x-6'>
                {
                    NavbarLinks.map( ( link , index ) => {
                        return (
                            <div key={ index }>
                                {
                                    link.title === 'Catalog' ? (
                                        <div className='relative z-10 group flex items-center gap-2'>
                                            <p className={ `flex items-center gap-1 cursor-pointer ${ matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"} `}>
                                                { link.title }
                                                <IoIosArrowDown/>
                                            </p>
                                            {/* dropDown div */}
                                            <div className='absolute invisible group-hover:visible  
                                            translate-x-[-30%] translate-y-[55%]
                                            flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-500
                                            opacity-0 transition-all duration-200 
                                            group-hover:opacity-100 min-w-max'>
                                                {/* This chotu triangle on top */}
                                                <div className='absolute left-[50%] top-0 rounded translate-x-[80%]
                                                bg-richblack-5 h-4 w-4 translate-y-[-45%] rotate-45'></div>
                                                {/* Links */}
                                                {
                                                    loading ? <div className='text-richblack-700 text-lg'>Loading...</div> 
                                                    : (
                                                        categories && categories
                                                        //?.filter( (subLink) => subLink.courses.length > 0 )
                                                        ?.map( ( subLink , index ) => (
                                                            <Link className='rounded-lg p-2 transition-all duration-200 hover:bg-richblack-25 hover:text-richblack-900'
                                                            to={`/catalog/${ subLink.name
                                                                    .split(' ')
                                                                    .join('-')
                                                                    .toLowerCase() }`} key={ index }>
                                                                { subLink.name }
                                                            </Link>
                                                        ) )
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={ link.path }>
                                            <p className={ `${ matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"} `}> 
                                                { link.title } 
                                            </p>
                                        </Link>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </nav>

            {/* login/signup/dashboard */}
            <div className='flex gap-x-6 items-center'>
                {
                    token !== null && (
                        <button onClick={ () => { dispatch( logout( navigate ) ) } }
                        className='border border-richblack-700 bg-richblack-800 text-richblack-100 
                        rounded-md px-[12px] py-[8px] hover:bg-richblack-700 hover:text-richblack-25 hover:border-richblack-500'>
                            Logout
                        </button>
                    )
                }
                {
                    token === null && (
                        <Link to={`/login`}>
                            <button className='border border-richblack-700 bg-richblack-800 text-richblack-100 
                            rounded-md px-[12px] py-[8px] hover:bg-richblack-700 hover:text-richblack-25 hover:border-richblack-500'>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to={`/signup`}>
                            <button className='border border-richblack-700 bg-richblack-800 text-richblack-100 
                            rounded-md px-[12px] py-[8px] hover:bg-richblack-700 hover:text-richblack-25 hover:border-richblack-500'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    user && user.accountType !== 'Instructor' && (
                        <Link to={'/dashboard/cart'} className='relative text-richblack-100 hover:text-yellow-50'>
                            <PiShoppingCartSimpleLight  size={'1.75rem'} className=''/>
                            {
                                totalItems >= 0 && (
                                    <span className='h-6 w-6 flex items-center justify-center absolute top-3 left-3 bg-richblack-600 text-yellow-50 text-sm rounded-[100%] p-1'>{ totalItems }</span>
                                    
                                )
                            }
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar