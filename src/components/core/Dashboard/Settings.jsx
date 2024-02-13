import React from 'react'
import ChangeProfilePicture from './Settings/ChangeProfilePicture';
import ProfileInfo from './Settings/ProfileInfo';
import ChangePassword from './Settings/ChangePassword';
import DeleteProfile from './Settings/DeleteProfile';

function Settings() {
  return (
    <div className='text-white flex flex-col gap-6 w-[800px] font-inter mx-auto'>
      <p className='text-3xl font-bold w-full flex items-center justify-center'>Edit Profile</p>
      {/* section 1 */}
      <ChangeProfilePicture />
      {/* section 2 */}
      <ProfileInfo/>
      {/* section 3 */}
      <ChangePassword/>
      {/* section 4 */}
      <DeleteProfile/>
    </div>
  )
}

export default Settings