'use client';
import { useState } from 'react';
import BackgroundAuth from '../../components/BackgroundAuth';
import Link from 'next/link';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const base_url = process.env.NEXT_PUBLIC_API_LINK;

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [terms, setTerms] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    let formInput = {
      name: name,
      email: email,
      password: password,
    };

    if (!name) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Fullname is required',
        icon: 'error',
      });
    }
    if (!email) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Email is required',
        icon: 'error',
      });
    }
    if (!password) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Password is required',
        icon: 'error',
      });
    }

    if (!terms) {
      return Swal.fire({
        title: 'Failed!',
        text: 'You must agree with terms and conditions',
        icon: 'error',
      });
    }

    Swal.fire({
      title: 'Registering...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await axios.post(base_url + '/auth/register', formInput, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(res);
      Swal.fire({
        title: 'Success!',
        text: 'Register Success',
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
          <form onSubmit={(e) => onSubmit(e)} className='my-auto mx-auto'>
            <div className='flex flex-col gap-y-7 w-[300px] my-auto mx-auto '>
              <h1 className='text-[#000] text-[36px] font-semibold'>Register</h1>
              <input type='text' className='outline-none focus:outline-none focus:border-[#2395ff] border-b-[2px] text-[16px] font-normal text-primary p-3' onChange={(e) => setName(e.target.value)} placeholder='Full Name' />
              <input onChange={(e) => setEmail(e.target.value)} type='email' className='outline-none focus:outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' placeholder='Email' />
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
              <div className='flex gap-x-4'>
                <input onChange={(e) => setTerms(e.target.checked)} type='checkbox' className='w-[20px]' />
                <h1 className='text-[#595959] text-[16px] font-normal'>Accept terms and condition</h1>
              </div>
              <button
                type='submit'
                className='bg-blue hover:bg-white w-full py-3 text-white hover:text-[#2395FF] text-[18px] font-bold rounded-[10px] hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#fff] hover:border-[#2395FF]'
              >
                Sign Up
              </button>
              <div className='flex w-[85%] self-center justify-center pt-4 border-t-2'>
                <h1 className='text-[#4D4D4D] text-[14px] font-normal'>Already have an account?</h1>
              </div>
              <Link href={'/auth/login'} className='flex border border-[#2395ff] hover:bg-[#2395FF] text-blue hover:text-white rounded-[10px] py-3 justify-center hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)]'>
                <h1 className='text-[18px] font-bold'>Sign In</h1>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
