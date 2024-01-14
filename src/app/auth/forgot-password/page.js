'use client';
import BackgroundAuth from '../../components/BackgroundAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
const base_url = process.env.NEXT_PUBLIC_API_LINK;
const fe_url = process.env.NEXT_PUBLIC_FE_LINK;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Email is required',
        icon: 'error',
      });
    }
    Swal.fire({
      title: 'Sending request...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    let formInput = {
      email,
      fe_url: fe_url + `/${email}`,
    };
    try {
      const res = await axios.post(base_url + '/auth/forgot_password', formInput, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(res.data.data);
      Swal.fire({
        title: 'Success!',
        text: `${res.data.message}, please check your email.`,
        icon: 'success',
      });
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
          <form onSubmit={(e) => handleSubmit(e)} className='my-auto mx-auto'>
            <div className='flex flex-col gap-y-7 w-[300px] my-auto mx-auto '>
              <h1 className='text-[#000] text-[35px] font-semibold'>Forgot Password</h1>
              <input type='email' className='outline-none focus:outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
              <button
                type='submit'
                className='bg-blue hover:bg-white w-full py-3 flex justify-center text-white hover:text-[#2395FF] text-[18px] font-bold rounded-[10px] hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#fff] hover:border-[#2395FF]'
              >
                Send
              </button>
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
