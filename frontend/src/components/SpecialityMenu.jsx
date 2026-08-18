import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-[#262626]' id='speciality'>

      <h1 className='text-3xl font-semibold text-[#123F78] tracking-tight'>
        Find by Speciality
      </h1>

      <p className='sm:w-1/3 text-center text-sm text-[#64748B] leading-6 font-normal'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>

        {specialityData.map((item,index)=>(
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
          >

            <img
              className='w-16 sm:w-24 mb-2 drop-shadow-[0_4px_8px_rgba(18,63,120,0.15)]'
              src={item.image}
              alt=""
            />

            <p className='text-[#334155] font-medium tracking-wide'>
              {item.speciality}
            </p>

          </Link>
        ))}

      </div>
    </div>
  )
}

export default SpecialityMenu