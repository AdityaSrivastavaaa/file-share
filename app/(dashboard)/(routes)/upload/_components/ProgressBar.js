import React from 'react'

const ProgressBar = ({progress=40}) => {
  return (
    <div className='bg-gray-300 w-[60%] mt-3 rounded-full mx-auto h-4'>
       <div className='h-4 bg-primary rounded-full text-[10px] text-center text-white' style={{width:`${progress}%`}}>
         {`${Number(progress).toFixed(0)}%`}
       </div>
    </div>
  )
}

export default ProgressBar
