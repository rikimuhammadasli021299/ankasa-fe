'use client';
import Link from 'next/link';
import BackgroundAuth from '@/app/components/BackgroundAuth';

export default function ForgotPassword() {
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
              <h1 className='text-[#000] text-[35px] font-semibold'>Forgot Password</h1>
              <input type='email' className='outline-none focus:outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' placeholder='Email' />
              <Link href={'/auth/verification-otp'} className='bg-blue w-full py-3 flex justify-center text-white text-[18px] font-bold rounded-[10px]'>
                Send
              </Link>
              <div className='flex flex-col self-center justify-center pt-4 gap-y-1'>
                <h1 className='text-[#595959] text-center text-[15px] font-normal'>You'll get message soon on your email</h1>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
