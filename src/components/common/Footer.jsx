import React from 'react'
import '../../App.css'
import FooterLink2 from '../../data/footer-links'
import logo from '../../assets/Logos/studynotion_logo.png'
import { Link } from 'react-router-dom';
import { FaFacebook , FaGoogle , FaTwitter , FaYoutube } from 'react-icons/fa';

const Plans = [
  'Paid memberships',
  'For students',
  'Business solutions'
];

const Community = [
  'Forums',
  'Chapters',
  'Events'
];

const Company = [
  'About',
  'Careers',
  'Affiliates'
];

const Resources = [
  'Articles' ,
  'Blog' ,
  'Chart Sheet' ,
  'Code challenges',
  'Docs',
  'Projects',
  'Videos',
  'Workspaces',
];


function Footer() {
  return (
    <div className='bg-richblack-800 w-screen mx-auto py-12 flex flex-col gap-4 items-center justify-between font-inter'>
      <div className='flex lg:flex-row flex-col justify-between border-b border-richblack-700 pb-16' >
        <div className='flex gap-6 border-r border-richblack-700 px-20'>
          <div className='flex flex-col gap-2'>
            <img src={ logo } />
            <div className='text-richblack-100 font-semibold text-base mt-6 mb-1'>
              Company
            </div>
            {
              Company.map(( element , index ) => {
                return (
                  <Link to={ element.split(' ').join('-').toLocaleLowerCase() } key={ index } 
                  className='text-richblack-400 hover:text-richblack-50 transition-all duration-200'>
                    { element }
                  </Link>
                )
              })
            }
            <div className='text-richblack-100 font-semibold text-base mt-8 mb-1'>
              Support
            </div>
            <div className='text-richblack-400 hover:text-richblack-50 transition-all duration-200'>
              Help Center
            </div>
            <div className='flex gap-3 mt-4' >
              <Link to={`/facebook`} className='fb'>
                <FaFacebook />
              </Link>
              <Link to={`/google`} className='go'>
                <FaGoogle />
              </Link>
              <Link to={`/twitter`} className='tw'>
                <FaTwitter />
              </Link>
              <Link to={`/youtube`} className='yt'>
                <FaYoutube />
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-richblack-100 font-semibold text-base mb-1'>
              Resources
            </div>
            {
              Resources.map(( element , index ) => {
                return (
                  <Link to={ element.split(' ').join('-').toLocaleLowerCase() } key={ index } 
                  className='text-richblack-400 hover:text-richblack-50 transition-all duration-200'>
                    { element }
                  </Link>
                )
              })
            }
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-richblack-100 font-semibold text-base mb-1'>
              Plans
            </div>
              {
                Plans.map(( element , index ) => {
                  return (
                    <Link to={ element.split(' ').join('-').toLocaleLowerCase() } key={ index } 
                    className='text-richblack-400 hover:text-richblack-50 transition-all duration-200'>
                    { element }
                  </Link>
                  )
                })
              }
              <div className='text-richblack-100 font-semibold text-base mt-8 mb-1'>
                Community
              </div>
              {
                Community.map(( element , index ) => {
                  return (
                    <Link to={ element.split(' ').join('-').toLocaleLowerCase() } key={ index } 
                    className='text-richblack-400 hover:text-richblack-50 transition-all duration-200'>
                    { element }
                  </Link>
                  )
                })
              }
          </div>
        </div>
        <div className='flex gap-6 px-20 lg:mt-0 mt-10'>
          {
            FooterLink2.map( ( element , index ) => {
              return(
                <div key={ index } className='flex flex-col gap-2'>
                  <div className='text-richblack-100 font-semibold text-base mb-1'>
                    { element.title }
                  </div>
                  <div className= 'text-richblack-400 flex flex-col gap-2'>
                    {
                      element.links.map( (link , i) => {
                        return (
                          <div  key={ i } className='hover:text-richblack-50 transition-all duration-200'>
                            <Link to={ link.link }>
                              { link.title }
                            </Link>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='flex lg:flex-row flex-col lg:gap-[400px] gap-6 items-center justify-between lg:mt-10 mt-5 text-richblack-400  text-sm font-semibold'>
        <div className='flex gap-2'>
          <div className='border-r pr-2'>Privacy Policy</div>
          <div className='border-r px-2'>Cookie Policy</div>
          <div className='pl-2'>Terms</div>
        </div>
        <div className=''>Made with ❤️ by Prashant © 2023 Studynotion</div>
      </div>
    </div>
  )
}

export default Footer