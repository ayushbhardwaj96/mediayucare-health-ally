import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import axios from "axios";
import { toast } from "react-toastify";
 

const MyProfile = () => {

  const {userData, setUserData, token , backendUrl, loadUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  
  //  Defined missing image state variables
  const [image, setImage] = useState(false) 

        // Update user profile information via API
    const updateUserProfileData = async () => {
        if (!userData) {
            return toast.error("No active profile data found to update.");
        }

    const phoneRegex = /^[0-9]{10}$/;
    const sanitizedPhone = (userData.phone || '').trim();

    if (!phoneRegex.test(sanitizedPhone)) {
        return toast.error("Please enter a valid 10-digit phone number.");
    }

        try {
            const formData = new FormData();

            // Clear accidental spaces from the input strings
            formData.append('name', (userData.name || '').trim());
            formData.append('phone', (userData.phone || '').trim());
            formData.append('gender', userData.gender || 'Not Selected');
            formData.append('dob', userData.dob || '');

            // Use a fallback object if the address does not exist in the database
            const addressPayload = userData.address || { line1: '', line2: '' };
            formData.append('address', JSON.stringify(addressPayload));

            if (image) {
                formData.append('image', image);
            }

            const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { 
                headers: { token } 
            });

            if (data.success) {
                toast.success(data.message || "Profile updated successfully.");
                await loadUserProfileData(); // Reload fresh data from database
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message || "Update rejected by server configuration rules.");
            }

        } catch (error) {
            console.error("Profile update error:", error);

            // Extract error message directly from backend response
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.message) {
                toast.error(`Network Error: ${error.message}`);
            } else {
                toast.error("An unhandled connection error occurred. Please try again.");
            }
        }
    };


  return userData ? (
        <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>

            {isEdit
                ? <label htmlFor='image' >
                    <div className='inline-block relative cursor-pointer'>
                        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    {/*  FIX 2: Extracted files[0] properly instead of passing the entire file list */}
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                : <img className='w-36 rounded' src={userData.image} alt="" />
            }

            {isEdit
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
            }

            <hr className='bg-[#ADADAD] h-[1px] border-none' />

            <div>
                <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>

                    {isEdit
                        ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        : <p className='text-blue-500'>{userData.phone}</p>
                    }

                    <p className='font-medium'>Address:</p>

                    {isEdit
                        ? <p>
                            {/* 🔴 FIX 3: Fixed nested state spread to prevent deleting line2 when changing line1 */}
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <br />
                            {/* 🔴 FIX 4: Fixed nested state spread to prevent deleting line1 when changing line2 */}
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>
                        : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    }

                </div>
            </div>
            <div>
                <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                    <p className='font-medium'>Gender:</p>

                    {isEdit
                        ? <select className='max-w-20 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-500'>{userData.gender}</p>
                    }

                    <p className='font-medium'>Birthday:</p>

                    {isEdit
                        ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                        : <p className='text-gray-500'>{userData.dob}</p>
                    }

                </div>
            </div>
            <div className='mt-10'>

                {isEdit
                    ? <button onClick={updateUserProfileData} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Save information</button>
                    : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
                }

            </div>
        </div>
    ) : null
}

export default MyProfile
