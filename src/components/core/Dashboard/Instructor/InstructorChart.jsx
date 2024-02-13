import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut , Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


function InstructorChart( { courses , totalStudentsEnrolled } ) {
  const [ currChart , setCurrChart ] = useState('Student');

  const getRandomColors = ( numsColors ) => {
    const colors = [];
    for(let i=0 ; i<numsColors ; i++){
      const color = `rgb( ${ Math.floor(Math.random()*256) } , ${ Math.floor(Math.random()*256) } , ${ Math.floor(Math.random()*256) } )`;
      colors.push(color);
    }
    return colors;
  }

  // create data for chart displaying students info
  const chartDataForStudents = {
    labels : courses.map((course) => course.courseName) ,
    datasets : [
      {
        data : courses.map((course) => course.totalStudentsEnrolled ) ,
        backgroundColor : getRandomColors( courses.length )
      }
    ]
  }

  // create data for chart displaying income info
  const chartDataForIncome = {
    labels : courses.map((course) => course.courseName) ,
    datasets : [
      {
        data : courses.map((course) => course.totalAmountEarned ) ,
        backgroundColor : getRandomColors( courses.length )
      }
    ]
  }

  // options
  const options = {

  }
  return (
    <div className='p-4 w-[450px] min-h-max'>
      <p className='font-semibold'>Visualise</p>
      <div className='flex gap-6'>
        <button className={`hover:bg-richblack-700 p-2 rounded-sm ${ currChart === "Student" && 'text-yellow-50' }`}
        onClick={ () => setCurrChart("Student") }>Student</button>
        <button className={`hover:bg-richblack-700 p-2 rounded-sm ${ currChart === "Income" && 'text-yellow-50' }`}
        onClick={ () => setCurrChart("Income") }>Income</button>
      </div>
      <div className='flex items-center justify-center'>
        {
          totalStudentsEnrolled !== 0 ? <Pie data={ currChart === "Student" ? chartDataForStudents : chartDataForIncome }/>
          : <div className='flex items-center justify-center h-[100px]'>No Data to show Pie chart</div>
        }
        
      </div>
    </div>
  )
}

export default InstructorChart