import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links'
import SideBarLink from './SideBarLink' 
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'
function SideBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ confirmationModal , setConfirmationModal ] = useState(null);

    const { user } = useSelector( (state) => state.profile );
    // const { user , loading : profileLoading } = useSelector( (state) => state.profile );
    // const { loading: authLoading } = useSelector( (state) => state.auth );

    // if( profileLoading || authLoading ){
    //     return(
    //         <div className='text-white'>Loading...</div>
    //     )
    // }
  return (
    <div className='relative bg-richblack-800 h-[100%] border-r-[1px] border-r-richblack-700'>
        <div className='min-w-[222px] flex flex-col py-10'>
            <div className='flex flex-col'>
                {
                    sidebarLinks.map( ( link , index ) => {
                        if( link.type && user.accountType !== link.type ){
                            return null ;
                        }
                        return(
                            <SideBarLink key={ index } 
                            link={ link } 
                            iconName={ link.icon }
                            />
                        )
                    } )
                }
            </div>
            <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'></div>
            
            <div className='flex flex-col'>
                <SideBarLink
                    link={ {name : 'Settings' , path : 'dashboard/settings'} }
                    iconName='VscSettingsGear'
                />
                <button onClick={ () => setConfirmationModal({
                    text1 : "Are you sure ?" ,
                    text2 : "You will be logged out of your content" ,
                    btn1Text : "Logout" ,
                    btn2Text : "Cancel" ,
                    btn1Handler : () => dispatch( logout(navigate) ) ,
                    btn2Handler : () => setConfirmationModal( null )
                }) }
                className='text-sm font-medium text-richblack-300 px-8 py-2'
                >
                    <div className='flex items-center gap-2'>
                        <VscSignOut className='text-lg text-richblack-50'/>
                        <span className='text-white'>Logout</span>
                    </div>
                </button>
            </div>
        </div>
        <div className='flex items-center justify-center'>
            { confirmationModal && <ConfirmationModal modalData={ confirmationModal }/> }
        </div>
    </div>
  )
}

export default SideBar