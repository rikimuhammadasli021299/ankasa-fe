'use client';
import { useState } from 'react';
import Link from 'next/link';
import BackgroundAuth from '@/app/components/BackgroundAuth';

export default function Login() {
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
              <h1 className='text-[#000] text-[36px] font-semibold'>Login</h1>
              <input type='email' className='outline-none focus:outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' placeholder='Username' />
              <div className='flex w-full justify-between relative'>
                <input type={showPassword ? 'text' : 'password'} className='w-full outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' placeholder='Password' />
                {showPassword ? (
                  <img src='/icon/eye-visible.svg' alt='eye' className='absolute right-0 top-[13px] z-10' onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <img src='/icon/eye-slash-visible.svg' width={30} height={30} alt='eye' className='absolute right-0 top-[13px] z-10' onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <button className='bg-blue w-full py-3 text-white text-[18px] font-bold rounded-[10px]'>Sign In</button>
              <div className='flex flex-col self-center justify-center pt-4 gap-y-1'>
                <h1 className='text-[#595959] text-center text-[16px] font-normal'>Did you forgot your password?</h1>
                <Link href={'/auth/forgot-password'} className='text-blue text-[16px] text-center font-normal underline'>
                  Tap here for reset
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
