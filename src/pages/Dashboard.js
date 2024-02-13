import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/core/Dashboard/SideBar'
import Spinner from '../components/common/Spinner';
function Dashboard() {
    const { loading : authLoading } = useSelector( ( state ) => state.auth );
    const { loading : profileLoading } = useSelector( ( state ) => state.profile );

    // if( authLoading || profileLoading ){
    //     return(
    //         <Spinner/>
    //     )
    // }
  return (
    <div className='relative flex w-screen h-[100%]'>
        <div className='w-[20%]'>
          <SideBar/>
        </div>
        <div className='min-h-[calc(100vh-3.79rem)] flex  w-[80%]'>
          <Outlet/>
        </div>
        {/* <div className='flex items-center justify-center'>
          { (authLoading || profileLoading) && <Spinner/> } 
        </div> */}
    </div>
  )
}

export default Dashboard