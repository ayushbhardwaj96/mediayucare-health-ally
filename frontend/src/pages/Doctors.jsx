import React, { useContext, useEffect, useState } from 'react'  
import { useNavigate, useParams } from 'react-router-dom'  
import { AppContext } from '../context/AppContext'  
  
const Doctors = () => {  
  
  const { speciality} = useParams()  
  
  const [filterDoc, setFilterDoc] = useState([])  
  const  [showFilter, setShowFilter] = useState(false)  
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
    <div className='pb-16 px-1 sm:px-2 lg:px-0'>  
  
      {/* Page description */}  
      <p className='text-[#64748B] text-sm md:text-base font-medium mb-6 leading-6 max-w-3xl'>  
        Browse through our trusted doctors and find the right specialist for your healthcare needs.  
      </p>  
  
      <div className='flex flex-col sm:flex-row items-start gap-6 lg:gap-8 mt-5'>  

        <button 
          className={`w-full sm:w-auto py-2.5 px-5 border rounded-xl text-sm font-medium 
          shadow-sm transition-all duration-300 sm:hidden 
          ${showFilter 
            ? 'bg-[#087F8C] text-white border-[#087F8C] shadow-md' 
            : 'bg-white text-[#334155] border-[#D9E3E8] hover:border-[#087F8C] hover:text-[#087F8C]'
          }`} 
          onClick={()=> setShowFilter(prev=> !prev)}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>  
  
        {/* Speciality Filter */}  
        <div className={`flex-col gap-3 text-sm text-[#475569] w-full sm:w-[210px] lg:w-[225px] flex-shrink-0 
          ${showFilter ? 'flex' : 'hidden sm:flex'}`}>  

          <div className='hidden sm:block mb-1'>
            <p className='text-[#123F78] text-sm font-semibold'>
              Filter by Speciality
            </p>
            <p className='text-[#94A3B8] text-xs mt-1'>
              Choose a medical speciality
            </p>
          </div>
  
          <p  
            onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}  
            className={`w-full min-w-0 pl-4 py-3 pr-4 
            border rounded-xl transition-all duration-300 cursor-pointer font-medium
            hover:border-[#087F8C] hover:text-[#087F8C] hover:bg-[#F0FAFA]
            ${speciality === 'General physician'  
              ? 'bg-[#E8F5F7] border-[#087F8C] text-[#087F8C] shadow-sm'  
              : 'border-[#D9E3E8] bg-white shadow-sm hover:shadow-md'
            }`}  
          >  
            General physician  
          </p>  
  
          <p  
            onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}  
            className={`w-full min-w-0 pl-4 py-3 pr-4 
            border rounded-xl transition-all duration-300 cursor-pointer font-medium
            hover:border-[#087F8C] hover:text-[#087F8C] hover:bg-[#F0FAFA]
            ${speciality === 'Gynecologist'  
              ? 'bg-[#E8F5F7] border-[#087F8C] text-[#087F8C] shadow-sm'  
              : 'border-[#D9E3E8] bg-white shadow-sm hover:shadow-md'
            }`}  
          >  
            Gynecologist  
          </p>  
  
          <p  
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}  
            className={`w-full min-w-0 pl-4 py-3 pr-4 
            border rounded-xl transition-all duration-300 cursor-pointer font-medium
            hover:border-[#087F8C] hover:text-[#087F8C] hover:bg-[#F0FAFA]
            ${speciality === 'Dermatologist'  
              ? 'bg-[#E8F5F7] border-[#087F8C] text-[#087F8C] shadow-sm'  
              : 'border-[#D9E3E8] bg-white shadow-sm hover:shadow-md'
            }`}  
          >  
            Dermatologist  
          </p>  
  
          <p  
            onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}  
            className={`w-full min-w-0 pl-4 py-3 pr-4 
            border rounded-xl transition-all duration-300 cursor-pointer font-medium
            hover:border-[#087F8C] hover:text-[#087F8C] hover:bg-[#F0FAFA]
            ${speciality === 'Pediatricians'  
              ? 'bg-[#E8F5F7] border-[#087F8C] text-[#087F8C] shadow-sm'  
              : 'border-[#D9E3E8] bg-white shadow-sm hover:shadow-md'
            }`}  
          >  
            Pediatricians  
          </p>  
  
          <p  
            onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}  
            className={`w-full min-w-0 pl-4 py-3 pr-4 
            border rounded-xl transition-all duration-300 cursor-pointer font-medium
            hover:border-[#087F8C] hover:text-[#087F8C] hover:bg-[#F0FAFA]
            ${speciality === 'Neurologist'  
              ? 'bg-[#E8F5F7] border-[#087F8C] text-[#087F8C] shadow-sm'  
              : 'border-[#D9E3E8] bg-white shadow-sm hover:shadow-md'
            }`}  
          >  
            Neurologist  
          </p>  
  
          <p  
            onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}  
            className={`w-full min-w-0 pl-4 py-3 pr-4 
            border rounded-xl transition-all duration-300 cursor-pointer font-medium
            hover:border-[#087F8C] hover:text-[#087F8C] hover:bg-[#F0FAFA]
            ${speciality === 'Gastroenterologist'  
              ? 'bg-[#E8F5F7] border-[#087F8C] text-[#087F8C] shadow-sm'  
              : 'border-[#D9E3E8] bg-white shadow-sm hover:shadow-md'
            }`}  
          >  
            Gastroenterologist  
          </p>  
  
        </div>  
  
  
        {/* Doctors Grid */}  
        <div className='w-full grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6'>  
  
          {  
            filterDoc.map((item,index)=>(  
  
              <div  
                onClick={()=>navigate(`/appointment/${item._id}`)}  
                className='group bg-white border border-[#E2EEF3] 
                rounded-2xl overflow-hidden cursor-pointer 
                shadow-sm hover:shadow-xl hover:border-[#C7E3E7]
                hover:-translate-y-1.5 
                transition-all duration-300 ease-out'  
                key={index}  
              >  
  
                {/* Doctor Image */}  
                <div className='bg-gradient-to-br from-[#EEF9FA] to-[#F7FBFC] overflow-hidden relative'>  
                  <img  
                    className='w-full aspect-[4/4.5] object-cover 
                    group-hover:scale-[1.04] 
                    transition-transform duration-500 ease-out'  
                    src={item.image}  
                    alt=""  
                  />  

                  {/* Image overlay */}  
                  <div className='absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none'></div>
                </div>  
  
                {/* Doctor Details */}  
                <div className='p-4 sm:p-5'>  
  
                  <div className='inline-flex items-center gap-2 
                  text-[11px] sm:text-xs font-semibold text-[#159A63] 
                  bg-[#EAF8F1] border border-[#D4F0E1]
                  px-2.5 py-1.5 rounded-full mb-3'>  
  
                    <p className='w-1.5 h-1.5 bg-[#16A36A] rounded-full'></p>  
  
                    <p>Available</p>  
  
                  </div>  
  
                  <p className='text-[#123F78] text-base sm:text-lg font-semibold 
                  leading-6 truncate'>  
                    {item.name}  
                  </p>  
  
                  <p className='text-[#64748B] text-sm mt-1.5 font-medium'>  
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