'use client';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState, useRef } from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const [showMyAccount, setShowMyAccount] = useState(false);
  const wrapperEmailRef = useRef(null);
  const inputEmailRef = useRef(null);
  const wrapperPhoneRef = useRef(null);
  const inputPhoneRef = useRef(null);
  const wrapperNameRef = useRef(null);
  const inputNameRef = useRef(null);
  const wrapperCityRef = useRef(null);
  const inputCityRef = useRef(null);
  const wrapperAddressRef = useRef(null);
  const inputAddressRef = useRef(null);
  const wrapperPostCodeRef = useRef(null);
  const inputPostCodeRef = useRef(null);

  const onFocusInputEmail = () => {
    const wrapperInputEmail = wrapperEmailRef.current;
    const labelEmail = inputEmailRef.current;
    wrapperInputEmail.className = 'flex flex-col mt-[20px] border-b border-[#2395FF]';
    labelEmail.className = 'text-[#000] text-[14px] font-normal px-[12px]';
  };
  const onBlurInputEmail = () => {
    const wrapperInputEmail = wrapperEmailRef.current;
    const labelEmail = inputEmailRef.current;
    wrapperInputEmail.className = 'flex flex-col mt-[20px] border-b';
    labelEmail.className = 'text-[#9B96AB] text-[14px] font-normal px-[12px]';
  };
  const onFocusInputPhone = () => {
    const wrapperInputPhone = wrapperPhoneRef.current;
    const labelPhone = inputPhoneRef.current;
    wrapperInputPhone.className = 'flex flex-col mt-[33px] border-b border-[#2395FF]';
    labelPhone.className = 'text-[#000] text-[14px] font-normal px-[12px]';
  };
  const onBlurInputPhone = () => {
    const wrapperInputPhone = wrapperPhoneRef.current;
    const labelPhone = inputPhoneRef.current;
    wrapperInputPhone.className = 'flex flex-col mt-[33px] border-b';
    labelPhone.className = 'text-[#9B96AB] text-[14px] font-normal px-[12px]';
  };
  const onFocusInputName = () => {
    const wrapperInputName = wrapperNameRef.current;
    const labelName = inputNameRef.current;
    wrapperInputName.className = 'flex flex-col mt-[20px] border-b border-[#2395FF]';
    labelName.className = 'text-[#000] text-[14px] font-normal px-[12px]';
  };
  const onBlurInputName = () => {
    const wrapperInputName = wrapperNameRef.current;
    const labelName = inputNameRef.current;
    wrapperInputName.className = 'flex flex-col mt-[20px] border-b';
    labelName.className = 'text-[#9B96AB] text-[14px] font-normal px-[12px]';
  };
  const onFocusInputCity = () => {
    const wrapperInputCity = wrapperCityRef.current;
    const labelCity = inputCityRef.current;
    wrapperInputCity.className = 'flex flex-col mt-[33px] border-b border-[#2395FF]';
    labelCity.className = 'text-[#000] text-[14px] font-normal px-[12px]';
  };
  const onBlurInputCity = () => {
    const wrapperInputCity = wrapperCityRef.current;
    const labelCity = inputCityRef.current;
    wrapperInputCity.className = 'flex flex-col mt-[33px] border-b';
    labelCity.className = 'text-[#9B96AB] text-[14px] font-normal px-[12px]';
  };
  const onFocusInputAddress = () => {
    const wrapperInputAddress = wrapperAddressRef.current;
    const labelAddress = inputAddressRef.current;
    wrapperInputAddress.className = 'flex flex-col mt-[33px] border-b border-[#2395FF]';
    labelAddress.className = 'text-[#000] text-[14px] font-normal px-[12px]';
  };
  const onBlurInputAddress = () => {
    const wrapperInputAddress = wrapperAddressRef.current;
    const labelAddress = inputAddressRef.current;
    wrapperInputAddress.className = 'flex flex-col mt-[33px] border-b';
    labelAddress.className = 'text-[#9B96AB] text-[14px] font-normal px-[12px]';
  };
  const onFocusInputPostCode = () => {
    const wrapperInputPostCode = wrapperPostCodeRef.current;
    const labelPostCode = inputPostCodeRef.current;
    wrapperInputPostCode.className = 'flex flex-col mt-[33px] border-b border-[#2395FF]';
    labelPostCode.className = 'text-[#000] text-[14px] font-normal px-[12px]';
  };
  const onBlurInputPostCode = () => {
    const wrapperInputPostCode = wrapperPostCodeRef.current;
    const labelPostCode = inputPostCodeRef.current;
    wrapperInputPostCode.className = 'flex flex-col mt-[33px] border-b';
    labelPostCode.className = 'text-[#9B96AB] text-[14px] font-normal px-[12px]';
  };

  const handleLogout = () => {
    console.log('logout');
    deleteCookie('uniqId');
    deleteCookie('access_token');
    deleteCookie('name');
    deleteCookie('email');
    router.push('/auth/login');
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
              <div className='flex w-full justify-between cursor-pointer items-center bg-white'>
                <div className='flex items-center'>
                  <img src='/image/profile.png' alt='profile' className='object-cover w-[20px] h-[20px]' />
                  <h1 className='pl-[37px] text-blue text-[14px] font-semibold leading-5'>Profile</h1>
                </div>
                <img src='/icon/arrow-right.svg' alt='arrow' />
              </div>
              <div className='flex w-full justify-between cursor-pointer mt-[30px] items-center bg-white'>
                <div className='flex items-center'>
                  <img src='/icon/star.svg' alt='my-review' />
                  <h1 className='pl-[37px] text-[#000] text-[14px] font-semibold leading-5'>My Review</h1>
                </div>
                <img src='/icon/arrow-right-dark.svg' alt='arrow' />
              </div>
              <div className='flex w-full justify-between cursor-pointer mt-[30px] items-center bg-white'>
                <div className='flex items-center'>
                  <img src='/icon/setting.svg' alt='setting' />
                  <h1 className='pl-[37px] text-[#000] text-[14px] font-semibold leading-5'>Settings</h1>
                </div>
                <img src='/icon/arrow-right-dark.svg' alt='arrow' />
              </div>
              <div onClick={handleLogout} className='flex w-full justify-between cursor-pointer mt-[30px] items-center bg-white'>
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
            <h1 className='text-blue text-[14px] font-medium tracking-[4.2px]'>Profile</h1>
            <div className='flex items-center w-full justify-between mt-[7px]'>
              <h1 className='text-[#000] text-[24px] font-semibold'>Profile</h1>
            </div>
            <div className='flex flex-col md:flex-row gap-y-[40px] w-full justify-between mt-[30px]'>
              <div className='flex flex-col w-[100%] md:w-[49%]'>
                <h1 className='text-[#000] text-[16px] font-semibold'>Contact</h1>
                <div ref={wrapperEmailRef} className='flex flex-col mt-[20px] border-b'>
                  <h1 ref={inputEmailRef} className='text-[#9B96AB] text-[14px] font-normal px-[12px]'>
                    Email
                  </h1>
                  <input type='email' className='text-[#000] text-[16px] font-normal py-[10px] px-[12px] outline-none focus:outline-none' onFocus={onFocusInputEmail} onBlur={onBlurInputEmail} />
                </div>
                <div ref={wrapperPhoneRef} className='flex flex-col mt-[33px] border-b'>
                  <h1 ref={inputPhoneRef} className='text-[#9B96AB] text-[14px] font-normal px-[12px]'>
                    Phone Number
                  </h1>
                  <input type='text' className='text-[#000] text-[16px] font-normal py-[10px] px-[12px] outline-none focus:outline-none' onFocus={onFocusInputPhone} onBlur={onBlurInputPhone} />
                </div>
              </div>
              <div className='flex flex-col w-[100%] md:w-[49%]'>
                <h1 className='text-[#000] text-[16px] font-semibold'>Biodata</h1>
                <div ref={wrapperNameRef} className='flex flex-col mt-[20px] border-b'>
                  <h1 ref={inputNameRef} className='text-[#9B96AB] text-[14px] font-normal px-[12px]'>
                    Fullname
                  </h1>
                  <input type='text' className='text-[#000] text-[16px] font-normal py-[10px] px-[12px] outline-none focus:outline-none' onFocus={onFocusInputName} onBlur={onBlurInputName} />
                </div>
                <div ref={wrapperCityRef} className='flex flex-col mt-[33px] border-b'>
                  <h1 ref={inputCityRef} className='text-[#9B96AB] text-[14px] font-normal px-[12px]'>
                    City
                  </h1>
                  <input type='text' className='text-[#000] text-[16px] font-normal py-[10px] px-[12px] outline-none focus:outline-none' onFocus={onFocusInputCity} onBlur={onBlurInputCity} />
                </div>
                <div ref={wrapperAddressRef} className='flex flex-col mt-[33px] border-b'>
                  <h1 ref={inputAddressRef} className='text-[#9B96AB] text-[14px] font-normal px-[12px]'>
                    Address
                  </h1>
                  <input type='text' className='text-[#000] text-[16px] font-normal py-[10px] px-[12px] outline-none focus:outline-none' onFocus={onFocusInputAddress} onBlur={onBlurInputAddress} />
                </div>
                <div ref={wrapperPostCodeRef} className='flex flex-col mt-[33px] border-b'>
                  <h1 ref={inputPostCodeRef} className='text-[#9B96AB] text-[14px] font-normal px-[12px]'>
                    PostCode
                  </h1>
                  <input type='text' className='text-[#000] text-[16px] font-normal py-[10px] px-[12px] outline-none focus:outline-none' onFocus={onFocusInputPostCode} onBlur={onBlurInputPostCode} />
                </div>
              </div>
            </div>
            <div className='flex justify-center md:justify-end mt-[33px]'>
              <button className='text-[#fff] text-[16px] font-bold py-[13px] px-[55px] bg-blue hover:bg-white hover:text-[#2395FF] hover:border hover:border-[#2395FF] rounded-[10px] hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)]'>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
