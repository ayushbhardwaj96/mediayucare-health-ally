import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='min-h-[85vh] flex items-center justify-center
                 py-10 px-4
                 bg-gradient-to-br from-[#F7FCFD] via-white to-[#EEF8FA]'
    >

      <div
        className='relative
                   flex flex-col gap-4
                   m-auto items-start
                   w-full max-w-[430px]
                   p-7 sm:p-9
                   bg-white
                   border border-[#DCECEF]
                   rounded-2xl
                   text-[#64748B]
                   text-sm
                   shadow-[0_12px_40px_rgba(18,63,120,0.10)]'
      >

        {/* ---------- Top Decorative Line ---------- */}

        <div
          className='absolute top-0 left-0
                     w-full h-1
                     rounded-t-2xl
                     bg-gradient-to-r
                     from-[#087F8C]
                     to-[#123F78]'
        >
        </div>


        {/* ---------- Heading ---------- */}

        <div className='w-full mb-2'>

          <div
            className='inline-flex items-center gap-2
                       px-3 py-1
                       rounded-full
                       bg-[#E8F7F9]
                       text-[#087F8C]
                       text-xs
                       font-semibold
                       mb-3'
          >

            <span
              className='w-1.5 h-1.5
                         rounded-full
                         bg-[#087F8C]'
            >
            </span>

            MEDIAYUCARE

          </div>


          <p
            className='text-2xl sm:text-3xl
                       font-bold
                       text-[#123F78]'
          >

            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}

          </p>


          <p className='text-[#64748B] mt-2 leading-6'>

            {state === 'Sign Up'
              ? 'Create your account and start managing your healthcare appointments.'
              : 'Login to continue managing your healthcare appointments.'
            }

          </p>

        </div>


        {/* ---------- Full Name ---------- */}

        {state === 'Sign Up'
          ? (
            <div className='w-full'>

              <p className='text-[#334155] font-medium mb-1.5'>
                Full Name
              </p>

              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='w-full
                           border border-[#D8E5E8]
                           rounded-lg
                           px-3.5 py-3
                           text-[#334155]
                           bg-[#FBFDFD]
                           outline-none
                           placeholder:text-[#94A3B8]
                           focus:border-[#087F8C]
                           focus:ring-2
                           focus:ring-[#087F8C]/10
                           transition-all duration-200'
                type='text'
                placeholder='Enter your full name'
                required
              />

            </div>
          )
          : null
        }


        {/* ---------- Email ---------- */}

        <div className='w-full'>

          <p className='text-[#334155] font-medium mb-1.5'>
            Email
          </p>

          <input
            className='w-full
                       border border-[#D8E5E8]
                       rounded-lg
                       px-3.5 py-3
                       text-[#334155]
                       bg-[#FBFDFD]
                       outline-none
                       placeholder:text-[#94A3B8]
                       focus:border-[#087F8C]
                       focus:ring-2
                       focus:ring-[#087F8C]/10
                       transition-all duration-200'
            type='email'
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

        </div>


        {/* ---------- Password ---------- */}

        <div className='w-full'>

          <p className='text-[#334155] font-medium mb-1.5'>
            Password
          </p>

          <input
            className='w-full
                       border border-[#D8E5E8]
                       rounded-lg
                       px-3.5 py-3
                       text-[#334155]
                       bg-[#FBFDFD]
                       outline-none
                       placeholder:text-[#94A3B8]
                       focus:border-[#087F8C]
                       focus:ring-2
                       focus:ring-[#087F8C]/10
                       transition-all duration-200'
            type='password'
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

        </div>


        {/* ---------- Forgot Password ---------- */}

        {state === 'Login' && (
          <div className='w-full flex justify-end -mt-1'>

            <p
              className='text-xs
                         text-[#087F8C]
                         font-medium
                         cursor-pointer
                         hover:text-[#123F78]
                         transition-colors'
            >
              Forgot password?
            </p>

          </div>
        )}


        {/* ---------- Submit Button ---------- */}

        <button
          type='submit'
          className='w-full
                     bg-gradient-to-r
                     from-[#087F8C]
                     to-[#123F78]
                     text-white
                     py-3
                     mt-1
                     rounded-lg
                     text-sm
                     font-semibold
                     shadow-[0_6px_18px_rgba(8,127,140,0.20)]
                     hover:shadow-[0_8px_24px_rgba(8,127,140,0.28)]
                     hover:-translate-y-0.5
                     active:translate-y-0
                     transition-all duration-300'
        >

          {state === 'Sign Up' ? 'Create Account' : 'Login'}

        </button>


        {/* ---------- Switch Login / Signup ---------- */}

        <div className='w-full text-center pt-1'>

          {state === 'Sign Up'
            ? (
              <p className='text-sm'>

                Already have an account?{' '}

                <span
                  onClick={() => setState('Login')}
                  className='text-[#087F8C]
                             font-semibold
                             hover:text-[#123F78]
                             underline
                             underline-offset-2
                             cursor-pointer
                             transition-colors'
                >
                  Login here
                </span>

              </p>
            )
            : (
              <p className='text-sm'>

                Create a new account?{' '}

                <span
                  onClick={() => setState('Sign Up')}
                  className='text-[#087F8C]
                             font-semibold
                             hover:text-[#123F78]
                             underline
                             underline-offset-2
                             cursor-pointer
                             transition-colors'
                >
                  Click here
                </span>

              </p>
            )
          }

        </div>


        {/* ---------- Bottom Message ---------- */}

        <div
          className='w-full
                     mt-2
                     pt-4
                     border-t border-[#EDF2F3]
                     text-center'
        >

          <p className='text-xs text-[#94A3B8] leading-5'>

            Your healthcare journey starts with{' '}

            <span className='font-semibold text-[#64748B]'>
              MediAyuCare
            </span>

          </p>

        </div>

      </div>

    </form>
  )
}

export default Login