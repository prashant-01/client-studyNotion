import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI';
import { getCatalogPageDetails } from '../services/operations/catalogPageAPI';
import CourseCard from '../components/core/Catalog/CourseCard'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Loader from '../components/common/Loader';

function Catalog() {
  let { catalogName } = useParams();
  const [ catalogPageData , setCatalogPageData ]  = useState(null);
  const [ categoryId , setCategoryId ] = useState(null);
  const [ loading , setLoading ] = useState(false);
  const [ isActive , setIsActive ] = useState(true);

  const getCategoryId = async () => {
    setLoading(true);
    try{
      let allCategories = await fetchCourseCategories();
      console.log('categories....' , allCategories);
      if( allCategories ){
        const category_id = allCategories.filter( (category) => category.name.split(" ").join('-').toLowerCase() === catalogName )[0]._id;
        setCategoryId( category_id );
      }
    }catch(error){
      console.log('Error in getting categoryId');
    }
    setLoading(false);
  }

  const getCategoryDetails = async () => {
    setLoading(true);
    try{
      if( categoryId !== null ){
        const result = await getCatalogPageDetails( categoryId );
        console.log('catalog page data..' , result);
        setCatalogPageData({ ...result });
      }
    }catch(error){
      console.log('Catalog data could not fetched');
    }
    setLoading(false);
  }

  useEffect( () => {
    // whenever catalogName changes we will find it's category id so that we can fetch data corresponding to that id
    getCategoryId();
  } , [catalogName])

  useEffect(() => {
    // Corresponding to the categoryId we got , we will fetch complete details for catalogPageData;
    getCategoryDetails();
  } , [categoryId])
  
  return (
    <div className='text-richblack-300 '>
      {
        loading ? <Loader/> 
        : catalogPageData && (
          <div>
            <div className='flex flex-col gap-1 bg-richblack-800 py-16 px-32 '>
              <p>{ `Home / Catalog / ` }<span className='text-yellow-50'>{ catalogPageData?.selectedCategory?.name }</span></p>
              <p className='text-3xl font-semibold text-white'>{ catalogPageData.selectedCategory.name }</p>
              <p>{ catalogPageData.selectedCategory.description }</p>
            </div>

            <div>
              {/* section1 */}
              <div className='px-32 py-10'>
                <div className='text-[40px] font-bold text-white'>Courses to get you started</div>
                <div className='flex gap-x-4 border-b text-richblack-800 w-full'>
                  <p onClick={ () => setIsActive(true) }
                  className={`py-2 px-4 ${ isActive ? 'text-yellow-50 border-b-4 border-yellow-50' : 'text-richblack-300 ' }
                  cursor-pointer`}>Most Popular</p>
                  <p onClick={ () => setIsActive(false) }
                  className={`py-2 px-4 ${ !isActive ? 'text-yellow-50 border-b-4 border-yellow-50' : 'text-richblack-300' }
                  cursor-pointer `}>New</p>
                </div>
                <div className='py-4'>
                  <CourseSlider Courses={ catalogPageData.selectedCategory.courses } />
                </div>
              </div>

              {/* section2 */}
              {/* <div>
                <p>Top Courses in { catalogPageData.selectedCategory.name }</p>
                <CourseSlider Courses={ catalogPageData.differentCourses } />
              </div> */}

              {/* section3 */}
              <div className='px-32 py-10 flex flex-col gap-4'>
                <p className='text-[40px] font-bold text-white border-b border-richblack-800 py-2'>Frequently Bought Courses</p>
                <div>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
                    {
                      catalogPageData.topSellingCourses
                      .map( (course , index) => (
                        <CourseCard key={index} course={course}  Height={'h-[300px]'}/>
                      ) )
                    }
                  </div>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
        )
      }
    </div>
  )
}

export default Catalog