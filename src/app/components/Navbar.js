'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function Navbar() {
  const router = useRouter();
  const [isClick, setIsClick] = useState(false);
  const [isLogin, setIsLogin] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (getCookie('access_token')) {
      setIsLogin(getCookie('access_token'));
    }
  }, []);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };
  return (
    <>
      <nav className='bg-white fixed w-full top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <div className='flex'>
                <img src='/icon/logo.svg' alt='logo' className='cursor-pointer' onClick={() => router.push('/')} />
                <Link href={'/'} className='block py-6 text-[24px] text-[#414141] font-semibold ms-3'>
                  Ankasa
                </Link>
              </div>
            </div>
            <div className='ml-4 items-center space-x-4 hidden md:flex'>
              <div className='flex items-center'>
                <div className='flex bg-[#F5F5F5] w-1/2 lg:w-[250px] h-[50px] rounded-lg box-border'>
                  <img src='/icon/search.svg' className='ms-3' alt='search' width={23} height={23} />
                  <input type='text' placeholder='Where you want to go?' className='text-primary text-[14px] w-[100px] lg:w-[250px] bg-[#F5F5F5] ms-3 rounded-lg focus:outline-0' />
                </div>
                <div className='flex'>
                  <Link
                    href={'/find-ticket'}
                    className={`mx-8 flex py-2 text-primary hover:text-white hover:bg-[#2395ff] lg:mx-6 xl:mx-8 hover:rounded-lg p-2 ${
                      pathname === '/find-ticket' || pathname === '/flight-details' ? 'border-b-4 border-[#2395ff] font-bold' : 'font-medium'
                    } hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)]`}
                  >
                    Find Ticket
                  </Link>
                  <Link
                    href={'/my-booking'}
                    className={`mx-8 flex py-2 text-primary hover:text-white hover:bg-[#2395ff] lg:mx-6 xl:mx-8 hover:rounded-lg p-2 ${
                      pathname === '/my-booking' || pathname === '/payment' || pathname === '/booking-pass' ? 'border-b-4 border-[#2395ff] font-bold' : 'font-medium'
                    } hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)]`}
                  >
                    My Booking
                  </Link>
                </div>
              </div>
            </div>
            <div className='hidden md:flex w-[150px]'>
              {isLogin ? (
                <div className='flex w-full justify-between'>
                  <img src='/icon/mail.svg' alt='mail' />
                  <img src='/icon/notifications.svg' alt='notifications' />
                  <div onClick={() => router.push('/profile')} className='flex w-[50px] h-[50px] items-center justify-center rounded-full border-[2px] border-[#2395FF] overflow-hidden cursor-pointer'>
                    <img src='/image/user-2.png' alt='user' className='w-[40px] h-[40px] object-cover rounded-full' />
                  </div>
                </div>
              ) : (
                <Link
                  href={'/auth/register'}
                  className='flex justify-center items-center w-[150px] h-[50px] bg-blue hover:bg-[white] text-white hover:text-[#2395FF] text-[16px] font-semibold rounded-[10px] hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#fff] hover:border-[#2395FF]'
                >
                  Sign Up
                </Link>
              )}
            </div>
            <div className='md:hidden flex items-center'>
              <button className='inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500' onClick={toggleNavbar}>
                {isClick ? <img src='/icon/close.svg' alt='menu' width={24} height={24} /> : <img src='/icon/hamburger-menu.svg' alt='menu' />}
              </button>
            </div>
          </div>
        </div>
        {isClick && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              <div className='flex mx-3 bg-[#F5F5F5] w-[250px] h-[50px] rounded-lg box-border'>
                <img src='/icon/search.svg' className='ms-3' alt='search' width={23} height={23} />
                <input type='text' placeholder='Where you want to go?' className='text-primary bg-[#F5F5F5] ms-3 rounded-lg focus:outline-0' />
              </div>
              <Link
                href={'/find-ticket'}
                className={`mx-2 block w-[115px] py-2 text-primary hover:text-white hover:bg-[#2395ff] lg:mx-6 xl:mx-8  ${
                  pathname === '/find-ticket' || pathname === '/fligh-details' ? 'border-b-4 border-[#2395ff] font-bold' : 'font-medium'
                } p-2`}
              >
                Find Ticket
              </Link>
              <Link
                href={'/my-booking'}
                className={`mx-2 block w-[115px] py-2 text-primary hover:text-white hover:bg-[#2395ff] lg:mx-6 xl:mx-8 ${
                  pathname === '/my-booking' || pathname === '/payment' || pathname === '/booking-pass' ? 'border-b-4 border-[#2395ff] font-bold' : 'font-medium'
                } p-2`}
              >
                My Booking
              </Link>
              {isLogin ? (
                <div className='flex justify-between w-[150px] ml-4'>
                  <div onClick={() => router.push('/profile')} className='flex w-[50px] h-[50px] items-center justify-center rounded-full border-[2px] border-[#2395FF] overflow-hidden cursor-pointer'>
                    <img src='/image/user-2.png' alt='user' className='w-[40px] h-[40px] object-cover rounded-full' />
                  </div>
                  <img src='/icon/mail.svg' alt='mail' />
                  <img src='/icon/notifications.svg' alt='notifications' />
                </div>
              ) : (
                <Link href={'/auth/register'} className='w-[100px] h-[35px] mx-3 p-2 flex justify-center items-center bg-blue text-white text-[15px] font-semibold rounded-[10px] shadow-[0_8px_10px_0_rgba(35,149,255,0.30)]'>
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
