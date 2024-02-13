import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/free-mode"
import CourseCard from './CourseCard';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
function CourseSlider({ Courses }) {
  return (
    <div className='px-10'>
      {
        Courses.length === 0 ? <div className='text-xl font-semibold'>No Courses found</div> : (
          <Swiper
            slidesPerView={1}
            spaceBetween={100}
            // centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            // pagination={{
            //   clickable: true,
            // }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              1024 : {slidesPerView : 3}
            }}
            className="mySwiper">
            {
              Courses.map( (course) => (
                <SwiperSlide key={course._id}>
                  <CourseCard course={course} Height={`h-[250px]`} />
                </SwiperSlide>
              ) )
            }
          </Swiper>
        )
      }
    </div>
  )
}

export default CourseSlider