import { AlertCircle } from 'lucide-react'
import React from 'react'

const AlertMsg = ({msg}) => {
  return (
    <div className='p-4 bg-red-500 mt-5 text-white rounded-md flex gap-5 items-center md:w-[40%] mx-auto'>
      <AlertCircle/>
      {msg}
    </div>
  )
}

export default AlertMsg
