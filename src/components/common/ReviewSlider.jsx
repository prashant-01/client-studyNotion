import React from 'react'
import ReviewCard from './ReviewCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/free-mode"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
function ReviewSlider({ reviewData }) {
  return (
    <div>
        <Swiper
            slidesPerView={1}
            spaceBetween={80}
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
                reviewData.map( (review) => (
                <SwiperSlide key={review._id}>
                    <ReviewCard review={review}/>
                </SwiperSlide>
                ) )
            }
        </Swiper>
    </div>
  )
}

export default ReviewSlider