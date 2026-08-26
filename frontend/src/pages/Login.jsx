import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  // Process asynchronous user registration and login requests securely
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Frontend sanitization to prevent blank space submissions
    if (!email.trim() || !password) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      if (state === 'Sign Up') {
        if (!name.trim()) return toast.error("Please provide your full name.");

        // Dispatch data to registration endpoint
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { 
          name: name.trim(), 
          email: email.toLowerCase().trim(), 
          password 
        });

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success(data.message || "Account created successfully!")
        } else {
          toast.error(data.message)
        }

      } else {
        // Dispatch data to security authentication endpoint
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { 
          email: email.toLowerCase().trim(), 
          password 
        });

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success(data.message || "Welcome back!")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error("[Authentication Error Trace]:", error);

      // Extract and display precise production backend error notifications
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Network connection error. Please verify your backend server is running.")
      }
    }
  }

  // Monitor authorization session strings and route to home page on validation success
      useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])//  



  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white'>
        
        <p className='text-2xl font-semibold text-gray-800'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        
        <p className='text-gray-500'>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
        </p>
        
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p className='font-medium text-gray-700'>Full Name</p>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-primary outline-none transition-all' 
              type="text" 
              placeholder="Enter your full name"
              required 
            />
          </div>
        )}
        
        <div className='w-full'>
          <p className='font-medium text-gray-700'>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-primary outline-none transition-all' 
            type="email" 
            placeholder="Enter your email"
            required 
          />
        </div>
        
        <div className='w-full'>
          <p className='font-medium text-gray-700'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-primary outline-none transition-all' 
            type="password" 
            placeholder="Enter your password"
            required 
          />
        </div>
        
        <button type="submit" className='bg-primary text-white w-full py-2 my-2 rounded-md text-base font-medium hover:bg-opacity-90 active:scale-[0.99] transition-all cursor-pointer'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>
        
        {state === 'Sign Up' ? (
          <p className='text-gray-600'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer font-medium'>
              Login here
            </span>
          </p>
        ) : (
          <p className='text-gray-600'>
            Create a new account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer font-medium'>
              Click here
            </span>
          </p>
        )}
        
      </div>
    </form>
  )
}

export default Login
