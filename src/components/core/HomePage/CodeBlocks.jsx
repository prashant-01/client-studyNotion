import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

function CodeBlocks( {
    position , heading , subheading , ctabtn1 , ctabtn2 , codeblock , backgroundGradient , codeColor
} ) {
  return (
    <div className={`flex ${ position } mt-12 mb-12 justify-center items-center gap-12`}>
      {/* Section1 */}
      <div className='w-ful lg:w-[50%] flex flex-col gap-8'>
        { heading }
        <div className='text-richblack-300 font-bold'>
          { subheading }
        </div>
        <div className='flex items-center justify-center gap-7 mt-7'>
          <CTAButton active={ ctabtn1.active } linkTo={ ctabtn1.linkTo }>
            <div className='flex items-center gap-2'>
              { ctabtn1.btnText }
              <FaArrowRight/>
            </div>
          </CTAButton>
          <CTAButton active={ ctabtn2.active } linkTo={ ctabtn2.linkTo }>
            { ctabtn2.btnText }
          </CTAButton>
        </div>
      </div>

      {/* Section2 */}
      <div className='relative h-fit w-full lg:w-[380px] flex text-[10px] py-4 text-sm bg-[rgba(255,255,255,0.03)] backdrop-filter:blur(10px) 
                      border border-[rgba(255,255,255,0.04)] '>
        {/* TODO : BG Gradient */}
          <div className={`absolute h-[200px] w-[300px] rounded-[100%] -left-5 top-0 ${ backgroundGradient }
          filter blur-2xl opacity-30 `}></div>
          <div className='w-[10%] flex flex-col text-center text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
            <p>13</p>
            <p>14</p>
          </div>
          <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono pr-2 ${ codeColor }`} >
            <TypeAnimation
              sequence={ [ codeblock , 1000 , "" ] } 
              repeat={ Infinity }
              speed={ 70 }
              cursor={ true }
              style={
                {
                  whiteSpace : "pre-line" ,
                  display: "block"
                }
              }
              omitDeletionAnimation={ true }
            />
          </div>
      </div>
    </div>
  )
}

export default CodeBlocks