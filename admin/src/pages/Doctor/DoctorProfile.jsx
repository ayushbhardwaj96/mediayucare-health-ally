import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    // Updates the doctor's profile variables and refreshes the layout state
const updateProfile = async () => {
    try {
        if (!dToken) {
            return toast.error("Session expired. Please log in again.");
        }

         
        if (!profileData || !profileData.address) {
            return toast.error("Profile data is incomplete or invalid.");
        }

        const updateData = {
            address: profileData.address,
            fee: Number(profileData.fee),  
            about: profileData.about?.trim() || "",
            available: Boolean(profileData.available)
        };

        const { data } = await axios.post(
            `${backendUrl}/api/doctor/update-profile`, 
            updateData, 
            { headers: { token: dToken } }  
        );

        if (data.success) {
            toast.success(data.message || "Profile updated successfully.");
            setIsEdit(false);
            await getProfileData(); // Reload the fresh database details instantly
        } else {
            toast.error(data.message || "Failed to update profile changes.");
        }

    } catch (error) {
        console.error("Doctor Profile Update Error:", error);
        
        // Target explicit validation error messages returned by   backend API response
        const errorMessage = error.response?.data?.message || "Network error. Unable to save profile modifications.";
        toast.error(errorMessage);
    }
};

      useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])


 return profileData && (
    <div className='w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in'>
        <div className='flex flex-col md:flex-row gap-6 lg:gap-8 items-start'>
            
            {/* Doctor Profile Image Container */}
            <div className='w-full md:w-fit flex-shrink-0 flex justify-center md:justify-start'>
                <img 
                    className='bg-gradient-to-b from-[#087F8C]/80 to-[#123F78]/90 w-full sm:max-w-64 aspect-[3/4] object-cover rounded-2xl shadow-md border border-[#E2EEF3]' 
                    src={profileData.image} 
                    alt={profileData.name} 
                />
            </div>

            {/* Core Medical Profile Information Display Card */}
            <div className='flex-1 w-full border border-[#E2EEF3] rounded-2xl p-5 sm:p-8 bg-white shadow-[0_4px_25px_rgba(18,63,120,0.02)]'>

                {/* Identity Name Header */}
                <h1 className='text-2xl sm:text-3xl font-bold text-[#123F78] tracking-tight'>
                    {profileData.name}
                </h1>
                
                {/* Clinical Credentials Sub-headers */}
                <div className='flex flex-wrap items-center gap-2.5 mt-2 text-[#64748B] text-sm sm:text-base font-medium'>
                    <p className='text-[#087F8C]'>{profileData.degree} — {profileData.speciality}</p>
                    <button className='py-0.5 px-3 border border-[#B9DDE2] text-xs font-semibold rounded-full bg-[#EEF7FA] text-[#087F8C] shadow-sm'>
                        {profileData.experience}
                    </button>
                </div>

                {/* Doctor Biography Segment */}
                <div className='mt-6 border-t border-[#EDF2F3] pt-5'>
                    <p className='text-sm font-bold text-[#123F78] mb-2 uppercase tracking-wider text-xs'>
                        About Biography:
                    </p>
                    <div className='text-sm text-[#475569] leading-relaxed max-w-3xl'>
                        {isEdit ? (
                            <textarea 
                                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                                className='w-full border border-[#D8E5E8] rounded-xl p-3 outline-none focus:border-[#087F8C] focus:ring-4 focus:ring-[#087F8C]/5 transition-all duration-200 bg-[#FBFDFD] text-[#334155]' 
                                rows={5} 
                                value={profileData.about} 
                                placeholder="Write something about yourself..."
                            />
                        ) : (
                            <p className='bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F1F5F9] whitespace-pre-line'>{profileData.about}</p>
                        )}
                    </div>
                </div>

               {/* Appointment Fee */}
<div
    className='
        mt-5
        flex
        flex-col
        sm:flex-row
        sm:items-center
        gap-2
        sm:gap-3
        border-t
        border-[#EDF2F3]
        pt-4
    '
>
    <span className='font-bold text-[#123F78]'>
        Appointment Fee:
    </span>

    {isEdit ? (

        <div className='flex items-center gap-2'>

            <span className='text-[#087F8C] font-semibold'>
                {currency}
            </span>

            <input
                type='number'
                onChange={(e) =>
                    setProfileData(prev => ({
                        ...prev,
                        fee: e.target.value
                    }))
                }
                className='
                    w-28
                    border
                    border-[#D8E5E8]
                    rounded-lg
                    px-3
                    py-2
                    outline-none
                    focus:border-[#087F8C]
                    focus:ring-2
                    focus:ring-[#087F8C]/10
                    bg-[#FBFDFD]
                    text-[#334155]
                    font-semibold
                    transition-all
                    duration-200
                '
                value={profileData.fee}
                min='0'
                required
            />

        </div>

    ) : (

        <div className='flex items-center gap-1'>

            <span className='text-[#087F8C] font-bold'>
                {currency}
            </span>

            <span className='text-[#334155] text-base font-bold'>
                {profileData.fee}
            </span>

        </div>

    )}

</div>

                {/* Clinic Location Address Block */}
                <div className='mt-4 flex flex-col gap-1.5 border-t border-[#EDF2F3] pt-4 text-sm sm:text-base'>
                    <span className='font-bold text-[#123F78]'>Clinic Address:</span>
                    <div className='text-[#475569] w-full max-w-md flex flex-col gap-2'>
                        {isEdit ? (
                            <>
                                <input 
                                    type='text' 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                    className='w-full border border-[#D8E5E8] rounded-lg px-3 py-1.5 outline-none focus:border-[#087F8C] bg-[#FBFDFD] text-sm'
                                    value={profileData.address.line1} 
                                    placeholder="Address Line 1"
                                />
                                <input 
                                    type='text' 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                    className='w-full border border-[#D8E5E8] rounded-lg px-3 py-1.5 outline-none focus:border-[#087F8C] bg-[#FBFDFD] text-sm'
                                    value={profileData.address.line2} 
                                    placeholder="Address Line 2"
                                />
                            </>
                        ) : (
                            <p className='bg-[#F8FAFC] p-3 rounded-xl border border-[#F1F5F9] text-xs sm:text-sm leading-5 font-medium'>
                                {profileData.address.line1}
                                {profileData.address.line2 && <><br />{profileData.address.line2}</>}
                            </p>
                        )}
                    </div>
                </div>

               {/* Calendar Availability Toggle Button Switch */}
<div className='mt-5 flex items-center gap-3 border-t border-[#EDF2F3] pt-4'>
    <div className='relative inline-flex items-center cursor-pointer select-none'>
        
        {/* Hidden underlying checkbox core element */}
        <input 
            type="checkbox" 
            id="availability-toggle"
            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
            checked={profileData.available} 
            disabled={!isEdit}
            className='sr-only peer'
        />
        
        {/* Visual toggle track pill - clicking this directly works fine */}
        <div 
            onClick={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
            className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[""] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isEdit ? 'peer-checked:bg-[#087F8C] cursor-pointer' : 'peer-checked:bg-[#087F8C]/60 bg-gray-100 cursor-not-allowed'}`} 
        />
        
       
        <label 
            htmlFor="availability-toggle" 
            onClick={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
            className={`text-sm font-bold ml-2.5 ${profileData.available ? 'text-[#087F8C]' : 'text-[#64748B]'} ${isEdit ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        >
            {profileData.available ? 'Available for Bookings' : 'Unavailable'}
        </label>
    </div>
</div>


                {/* Contextual Profile Form Control Button Triggers */}
                <div className='mt-6 pt-2'>
                    {isEdit ? (
                        <button 
                            onClick={updateProfile} 
                            className='px-6 py-2.5 bg-gradient-to-r from-[#087F8C] to-[#123F78] text-white text-sm font-semibold rounded-xl shadow-[0_4px_14px_rgba(8,127,140,0.2)] hover:shadow-[0_6px_20px_rgba(8,127,140,0.3)] hover:-translate-y-0.5 transition-all duration-300'
                        >
                            Save Profile
                        </button>
                    ) : (
                        <button 
                            onClick={() => setIsEdit(prev => !prev)} 
                            className='px-6 py-2.5 border-2 border-[#087F8C] text-[#087F8C] hover:bg-[#087F8C] hover:text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md'
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

            </div>
        </div>
    </div>
)

}

export default DoctorProfile
