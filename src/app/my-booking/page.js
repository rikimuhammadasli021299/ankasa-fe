'use client';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MyBooking() {
  const router = useRouter();
  const [showMyAccount, setShowMyAccount] = useState(false);

  const navigateToProfile = () => {
    router.push('/profile');
  };
  return (
    <>
      <Navbar />
      <div className='max-w-[1366px] justify-center flex flex-col md:flex-row mx-auto mt-[100px] mb-[75px] bg-[#F5F6FA]'>
        <div className='flex md:w-[40%] lg:w-[30%] w-full flex-col px-7 py-3 md:py-10 '>
          <div className='flex bg-white w-full px-7 py-5 rounded-[15px] visible md:hidden gap-x-3 items-center'>
            {showMyAccount ? (
              <img src='/icon/close.svg' alt='close' className='w-[20px] h-[20px] object-cover cursor-pointer' onClick={() => setShowMyAccount(!showMyAccount)} />
            ) : (
              <img src='/image/profile.png' alt='profile' className='w-[20px] h-[20px] object-cover cursor-pointer' onClick={() => setShowMyAccount(!showMyAccount)} />
            )}
            <h1 className='visible md:hidden cursor-pointer' onClick={() => setShowMyAccount(!showMyAccount)}>
              My Account
            </h1>
          </div>
          <div
            className={`flex flex-col absolute md:static top-[160px] ${
              showMyAccount ? 'left-[28px]' : 'left-[-400px]'
            } md:top-0 items-center w-[300px] md:w-full px-5 py-10 md:rounded-[15px] rounded-b-[15px] bg-white transition-all duration-500 shadow-2xl md:shadow-none`}
          >
            <div className='flex items-center justify-center w-[137px] h-[137px] rounded-full object-cover border-[4px] border-[#2395FF] overflow-hidden'>
              <img src='/image/user-2.png' alt='user' className='w-[115px] h-[115px] object-cover rounded-full' />
            </div>
            <div className='flex items-center justify-center w-[150px] h-[50px] border border-[#2395FF] hover:border-white rounded-[10px] mt-[25px] cursor-pointer hover:bg-[#2395FF] text-[#2395FF] hover:text-white hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] relative overflow-hidden'>
              <h1 className='text-[16px] font-bold hover:text-white w-full h-full text-center py-3'>Select Photo</h1>
              <input type='file' className='absolute scale-150 opacity-0 cursor-pointer' />
            </div>
            <h1 className='text-[#000] text-[20px] font-semibold mt-[25px] text-center'>Mike Kowalski</h1>
            <div className='flex mt-[7px] justify-center items-center gap-x-2'>
              <img src='/icon/map-pin-blue.svg' alt='map' />
              <h1 className='text-[#6B6B6B] text-[14px] font-normal leading-5'>Medan, Indonesia</h1>
            </div>
            <div className='flex justify-between items-center w-full mt-[30px]'>
              <h1 className='text-[#000] text-[14px] font-semibold leading-5'>Cards</h1>
              <h1 className='text-blue text-[14px] font-semibold leading-5'>+ Add</h1>
            </div>
            <div className='flex flex-col w-full bg-blue rounded-[10px] mt-[11px] py-[12px] px-[16px] shadow-[0px_8px_25px_0px_rgba(35,149,255,0.49)]'>
              <h1 className='text-white text-[14px] font-semibold leading-5'>4441 1235 5512 5551</h1>
              <div className='flex justify-between'>
                <h1 className='text-[#AEFAFF] text-[12px] font-normal leading-5'>X Card</h1>
                <h1 className='text-[#AEFAFF] text-[12px] font-normal leading-5'>$ 1,440.2</h1>
              </div>
            </div>
            <div className='flex flex-col w-full mt-[30px] px-[16px]'>
              <div className='flex w-full justify-between items-center bg-white cursor-pointer' onClick={navigateToProfile}>
                <div className='flex items-center'>
                  <img src='/image/profile.png' alt='profile' className='object-cover w-[20px] h-[20px]' />
                  <h1 className='pl-[37px] text-blue text-[14px] font-semibold leading-5'>Profile</h1>
                </div>
                <img src='/icon/arrow-right.svg' alt='arrow' />
              </div>
              <div className='flex w-full justify-between mt-[30px] items-center bg-white'>
                <div className='flex items-center'>
                  <img src='/icon/star.svg' alt='my-review' />
                  <h1 className='pl-[37px] text-[#000] text-[14px] font-semibold leading-5'>My Review</h1>
                </div>
                <img src='/icon/arrow-right-dark.svg' alt='arrow' />
              </div>
              <div className='flex w-full justify-between mt-[30px] items-center bg-white'>
                <div className='flex items-center'>
                  <img src='/icon/setting.svg' alt='setting' />
                  <h1 className='pl-[37px] text-[#000] text-[14px] font-semibold leading-5'>Settings</h1>
                </div>
                <img src='/icon/arrow-right-dark.svg' alt='arrow' />
              </div>
              <div className='flex w-full justify-between mt-[30px] items-center bg-white'>
                <div className='flex items-center'>
                  <img src='/icon/logout.svg' alt='setting' />
                  <h1 className='pl-[37px] text-[#F24545] text-[14px] font-semibold leading-5'>Logout</h1>
                </div>
                <img src='/icon/arrow-right-red.svg' alt='arrow' />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:w-[60%] lg:w-[70%] w-full px-7 md:pr-7 md:pl-0 py-3 md:py-10 mb-[75px] md:mb-[0]'>
          <div className='flex flex-col w-full px-[28px] py-[26px] rounded-[15px] bg-white mb-[10px]'>
            <h1 className='text-blue text-[14px] font-medium tracking-[4.2px]'>My Booking</h1>
            <div className='flex items-center w-full justify-between mt-[7px]'>
              <h1 className='text-[#000] text-[24px] font-semibold'>My Booking</h1>
              <h1 className='text-blue text-[16px] font-semibold'>Order History</h1>
            </div>
          </div>
          <div className='flex flex-col w-full py-[26px] rounded-[15px] bg-white mt-[20px]'>
            <h1 className='text-[#000] text-[14px] pl-[28px] font-normal leading-5'>Monday, 20 July '20 - 12:33</h1>
            <div className='flex w-[175px] items-center justify-between pl-[28px] mt-[15px]'>
              <h1 className='text-[#000] text-[20px] font-semibold leading-5'>IDN</h1>
              <img src='/icon/one-way-dark.svg' alt='logo' />
              <h1 className='text-[#000] text-[20px] font-semibold leading-5'>JPN</h1>
            </div>
            <div className='mt-[10px] border-b border-[#E6E6E6] pb-[15px]'>
              <h1 className='text-[#979797] text-[14px] font-normal leading-5 pl-[28px]'>Garuda Indonesia, AB-221</h1>
            </div>
            <div className='flex flex-wrap gap-y-3 px-[28px] justify-between items-center mt-[20px]'>
              <div className='flex flex-wrap items-center gap-x-[68px]'>
                <h1 className='text-[#7A7A7A] text-[14px] font-semibold'>Status</h1>
                <button className='text-[#fff] text-[14px] font-semibold left-5 py-[7px] px-[18px] rounded-[6px] bg-[#FF7F23]'>Waiting for payment</button>
              </div>
              <div className='flex items-center gap-x-[15px]'>
                <h1 className='text-blue text-[16px] font-semibold'>View Details</h1>
                <img src='/icon/arrow-bottom.svg' alt='arrow' />
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full py-[26px] rounded-[15px] bg-white mt-[20px]'>
            <h1 className='text-[#000] text-[14px] pl-[28px] font-normal leading-5'>Monday, 20 July '20 - 12:33</h1>
            <div className='flex w-[175px] items-center justify-between pl-[28px] mt-[15px]'>
              <h1 className='text-[#000] text-[20px] font-semibold leading-5'>IDN</h1>
              <img src='/icon/one-way-dark.svg' alt='logo' />
              <h1 className='text-[#000] text-[20px] font-semibold leading-5'>JPN</h1>
            </div>
            <div className='mt-[10px] border-b border-[#E6E6E6] pb-[15px]'>
              <h1 className='text-[#979797] text-[14px] font-normal leading-5 pl-[28px]'>Garuda Indonesia, AB-221</h1>
            </div>
            <div className='flex flex-wrap gap-y-3 px-[28px] justify-between items-center mt-[20px]'>
              <div className='flex flex-wrap items-center gap-x-[68px]'>
                <h1 className='text-[#7A7A7A] text-[14px] font-semibold'>Status</h1>
                <button className='text-[#fff] text-[14px] font-semibold left-5 py-[7px] px-[18px] rounded-[6px] bg-[#4FCF4D]'>Eticket issued</button>
              </div>
              <div className='flex items-center gap-x-[15px]'>
                <h1 className='text-blue text-[16px] font-semibold'>View Details</h1>
                <img src='/icon/arrow-bottom.svg' alt='arrow' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
