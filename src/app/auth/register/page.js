'use client';
import { useState } from 'react';
import BackgroundAuth from '@/app/components/BackgroundAuth';
import Link from 'next/link';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className='max-w-[1366px] mx-auto flex items-center'>
        <BackgroundAuth />
        <div className='flex flex-col h-screen w-full md:w-[45%]'>
          <div className='flex gap-x-3 items-center w-[300px] mx-auto'>
            <img src='/icon/logo.svg' alt='logo' />
            <h1 className='text-[#414141] text-[24px] font-semibold'>Ankasa</h1>
          </div>
          <form className='my-auto mx-auto'>
            <div className='flex flex-col gap-y-7 w-[300px] my-auto mx-auto '>
              <h1 className='text-[#000] text-[36px] font-semibold'>Register</h1>
              <input type='text' className='outline-none focus:outline-none focus:border-[#2395ff] border-b-[2px] text-[16px] font-normal text-primary p-3' placeholder='Full Name' />
              <input type='email' className='outline-none focus:outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' placeholder='Email' />
              <div className='flex w-full justify-between relative'>
                <input type={showPassword ? 'text' : 'password'} className='w-full outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' placeholder='Password' />
                {showPassword ? (
                  <img src='/icon/eye-visible.svg' alt='eye' className='absolute right-0 top-[13px] z-10' onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <img src='/icon/eye-slash-visible.svg' width={30} height={30} alt='eye' className='absolute right-0 top-[13px] z-10' onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <button className='bg-blue w-full py-3 text-white text-[18px] font-bold rounded-[10px]'>Sign Up</button>
              <div className='flex gap-x-4'>
                <input type='checkbox' className='w-[20px]' />
                <h1 className='text-[#595959] text-[16px] font-normal'>Accept terms and condition</h1>
              </div>
              <div className='flex w-[85%] self-center justify-center pt-4 border-t-2'>
                <h1 className='text-[#4D4D4D] text-[14px] font-normal'>Already have an account?</h1>
              </div>
              <Link href={'/auth/login'} className='flex border border-[#2395ff] rounded-[10px] py-3 justify-center'>
                <h1 className='text-blue text-[18px] font-bold'>Sign In</h1>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
