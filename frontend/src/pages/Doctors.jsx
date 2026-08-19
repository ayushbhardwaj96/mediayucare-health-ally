import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const { speciality} = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const navigate  = useNavigate()

  const {doctors} = useContext(AppContext)


  const applyFilter = () => {
    if(speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])

  return (
    <div className='pb-12'>

      {/* Page description */}
      <p className='text-[#64748B] text-sm md:text-base font-medium mb-6'>
        Browse through our trusted doctors and find the right specialist for your healthcare needs.
      </p>

      <div className='flex flex-col sm:flex-row items-start gap-6 mt-5'>

        {/* Speciality Filter */}
        <div className='flex flex-col gap-3 text-sm text-[#475569] w-full sm:w-auto'>

          <p
            onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}
            className={`w-full sm:w-auto min-w-[190px] pl-4 py-2.5 pr-10
            border rounded-lg transition-all cursor-pointer font-medium
            hover:border-primary hover:text-primary hover:bg-[#F0FAFA]
            ${speciality === 'General physician'
              ? 'bg-[#E8F5F7] border-primary text-[#087F8C] shadow-sm'
              : 'border-[#D9E3E8] bg-white'
            }`}
          >
            General physician
          </p>

          <p
            onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
            className={`w-full sm:w-auto min-w-[190px] pl-4 py-2.5 pr-10
            border rounded-lg transition-all cursor-pointer font-medium
            hover:border-primary hover:text-primary hover:bg-[#F0FAFA]
            ${speciality === 'Gynecologist'
              ? 'bg-[#E8F5F7] border-primary text-[#087F8C] shadow-sm'
              : 'border-[#D9E3E8] bg-white'
            }`}
          >
            Gynecologist
          </p>

          <p
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
            className={`w-full sm:w-auto min-w-[190px] pl-4 py-2.5 pr-10
            border rounded-lg transition-all cursor-pointer font-medium
            hover:border-primary hover:text-primary hover:bg-[#F0FAFA]
            ${speciality === 'Dermatologist'
              ? 'bg-[#E8F5F7] border-primary text-[#087F8C] shadow-sm'
              : 'border-[#D9E3E8] bg-white'
            }`}
          >
            Dermatologist
          </p>

          <p
            onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
            className={`w-full sm:w-auto min-w-[190px] pl-4 py-2.5 pr-10
            border rounded-lg transition-all cursor-pointer font-medium
            hover:border-primary hover:text-primary hover:bg-[#F0FAFA]
            ${speciality === 'Pediatricians'
              ? 'bg-[#E8F5F7] border-primary text-[#087F8C] shadow-sm'
              : 'border-[#D9E3E8] bg-white'
            }`}
          >
            Pediatricians
          </p>

          <p
            onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
            className={`w-full sm:w-auto min-w-[190px] pl-4 py-2.5 pr-10
            border rounded-lg transition-all cursor-pointer font-medium
            hover:border-primary hover:text-primary hover:bg-[#F0FAFA]
            ${speciality === 'Neurologist'
              ? 'bg-[#E8F5F7] border-primary text-[#087F8C] shadow-sm'
              : 'border-[#D9E3E8] bg-white'
            }`}
          >
            Neurologist
          </p>

          <p
            onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
            className={`w-full sm:w-auto min-w-[190px] pl-4 py-2.5 pr-10
            border rounded-lg transition-all cursor-pointer font-medium
            hover:border-primary hover:text-primary hover:bg-[#F0FAFA]
            ${speciality === 'Gastroenterologist'
              ? 'bg-[#E8F5F7] border-primary text-[#087F8C] shadow-sm'
              : 'border-[#D9E3E8] bg-white'
            }`}
          >
            Gastroenterologist
          </p>

        </div>


        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>

          {
            filterDoc.map((item,index)=>(

              <div
                onClick={()=>navigate(`/appointment/${item._id}`)}
                className='bg-white border border-[#E2EEF3]
                rounded-2xl overflow-hidden cursor-pointer
                shadow-sm hover:shadow-xl
                hover:-translate-y-2
                transition-all duration-300'
                key={index}
              >

                {/* Doctor Image */}
                <div className='bg-[#F0F8FA] overflow-hidden'>
                  <img
                    className='w-full h-auto object-cover
                    hover:scale-[1.03]
                    transition-transform duration-300'
                    src={item.image}
                    alt=""
                  />
                </div>

                {/* Doctor Details */}
                <div className='p-4'>

                  <div className='inline-flex items-center gap-2
                  text-xs font-semibold text-[#159A63]
                  bg-[#EAF8F1] px-2.5 py-1 rounded-full mb-2'>

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

            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Doctors