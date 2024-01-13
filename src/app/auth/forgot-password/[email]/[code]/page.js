'use client';
import BackgroundAuth from '@/app/components/BackgroundAuth';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
const base_url = process.env.NEXT_PUBLIC_API_LINK;

export default function ResetPassword(props) {
  const emailParams = props.params.email;
  const email = emailParams.replace(/\+/g, ' ').replace(/\%40/g, '@');
  const request_code = props.params.code;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassowrd = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      return Swal.fire({
        title: 'Failed!',
        text: 'New password is required!',
        icon: 'error',
      });
    }
    if (!confirmPassword) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Confirm password is required!',
        icon: 'error',
      });
    }
    if (newPassword !== confirmPassword) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Password is mismatch!',
        icon: 'error',
      });
    }
    Swal.fire({
      title: 'Resetting Password...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    let formInput = {
      request_code,
      email: email,
      new_password: newPassword,
    };

    try {
      const res = await axios.post(base_url + '/auth/new_password', formInput, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      Swal.fire({
        title: 'Success!',
        text: `${res.data.message}`,
        icon: 'success',
      });
      router.push('/auth/login');
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
          <form onSubmit={(e) => handleResetPassowrd(e)} className='my-auto mx-auto'>
            <div className='flex flex-col gap-y-7 w-[300px] my-auto mx-auto '>
              <h1 className='text-[#000] text-[35px] font-semibold'>Reset Password</h1>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                className='w-full outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3'
                placeholder='New Password'
              />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                className='w-full outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3'
                placeholder='Confirm Password'
              />
              <div className='flex w-full items-center gap-x-2'>
                <input onChange={() => setShowPassword(!showPassword)} type='checkbox' />
                <h1 className='text-[#000] text-[12px] font-medium'>Show password?</h1>
              </div>
              <button
                type='submit'
                className='bg-blue hover:bg-white w-full py-3 flex justify-center text-white hover:text-[#2395FF] text-[18px] font-bold rounded-[10px] hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#fff] hover:border-[#2395FF]'
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
