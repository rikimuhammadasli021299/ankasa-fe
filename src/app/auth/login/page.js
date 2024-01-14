'use client';
import { useState } from 'react';
import Link from 'next/link';
import BackgroundAuth from '../../components/BackgroundAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { setCookie } from 'cookies-next';
const base_url = process.env.NEXT_PUBLIC_API_LINK;

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    let formInput = {
      email,
      password,
    };

    if (!formInput.email || !formInput.password) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Email or password is required',
        icon: 'error',
      });
    }

    Swal.fire({
      title: 'Login...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const res = await axios.post(base_url + '/auth/login', formInput, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      Swal.fire({
        title: 'Success!',
        text: 'Login Success',
        icon: 'success',
      });
      setCookie('uniqId', res?.data?.data?.uniqId, { maxAge: 60 * 60 * 24 });
      setCookie('access_token', res?.data?.data?.access_token, { maxAge: 60 * 60 * 24 });
      setCookie('name', res?.data?.data?.name, { maxAge: 60 * 60 * 24 });
      setCookie('email', res?.data?.data?.email, { maxAge: 60 * 60 * 24 });
      router.push(`/find-ticket?page=1&per_page=5&passenger=1`);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Failed!',
        text: error.response.data.message,
        icon: 'error',
      });
    }
  };

  return (
    <>
      <div className='max-w-[1366px] mx-auto flex items-center'>
        <BackgroundAuth />
        <div className='flex flex-col h-screen w-full md:w-[45%]'>
          <div className='flex gap-x-3 items-center w-[300px] mx-auto'>
            <img src='/icon/logo.svg' alt='logo' />
            <h1 className='text-[#414141] text-[24px] font-semibold'>Ankasa</h1>
          </div>
          <form onSubmit={(e) => onSubmit(e)} className='my-auto mx-auto'>
            <div className='flex flex-col gap-y-7 w-[300px] my-auto mx-auto '>
              <h1 className='text-[#000] text-[36px] font-semibold'>Login</h1>
              <input onChange={(e) => setEmail(e.target.value)} type='email' className='outline-none focus:outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' placeholder='Username' />
              <div className='flex w-full justify-between relative'>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className='w-full outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3'
                  placeholder='Password'
                />
                {showPassword ? (
                  <img src='/icon/eye-visible.svg' alt='eye' className='absolute right-0 top-[13px] z-10' onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <img src='/icon/eye-slash-visible.svg' width={30} height={30} alt='eye' className='absolute right-0 top-[13px] z-10' onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <button
                type='submit'
                className='bg-blue hover:bg-white w-full py-3 text-white hover:text-[#2395FF] text-[18px] font-bold rounded-[10px] hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#fff] hover:border-[#2395FF]'
              >
                Sign In
              </button>
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
