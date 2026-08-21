import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

  const navigate = useNavigate()

  const {doctors} = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[#183B4E] md:mx-10'>

      <h1 className='text-3xl md:text-4xl font-semibold text-[#123F78] tracking-tight'>
        Top Doctors to Book
      </h1>

      <p className='sm:w-1/3 text-center text-sm text-[#64748B] leading-6'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>

        {doctors.slice(0,10).map((item,index)=>(

          <div
            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
            className='bg-white border border-[#E2EEF3] rounded-2xl overflow-hidden
            cursor-pointer shadow-sm hover:shadow-lg
            hover:-translate-y-2
            transition-all duration-300'
            key={index}
          >

            <div className='bg-[#F0F8FA] overflow-hidden'>
              <img
                className='w-full h-auto object-cover hover:scale-[1.03] transition-transform duration-300'
                src={item.image}
                alt=""
              />
            </div>

            <div className='p-4'>

              <div className='inline-flex items-center gap-2 text-xs font-medium
              text-[#16A36A] bg-[#EAF8F1] px-2.5 py-1 rounded-full mb-2'>

                <p className='w-1.5 h-1.5 bg-[#16A36A] rounded-full'></p>

                <p>Available</p>

              </div>

              <p className='text-[#123F78] text-lg font-semibold mt-1'>
                {item.name}
              </p>

              <p className='text-[#64748B] text-sm mt-1'>
                {item.speciality}
              </p>

            </div>

          </div>

        ))}

      </div>

      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}
        className='bg-[#E8F5F7] text-[#087F8C] px-12 py-3 rounded-full mt-10
        font-medium border border-[#CDE9ED]
        hover:bg-[#087F8C] hover:text-white
        hover:shadow-md hover:-translate-y-0.5
        transition-all duration-300'
      >
        More
      </button>

    </div>
  )
}

export default TopDoctors