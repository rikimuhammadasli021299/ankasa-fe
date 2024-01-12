'use client';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import axios from 'axios';
const base_url = process.env.NEXT_PUBLIC_API_LINK;

export default function MyBooking() {
  const router = useRouter();
  const token = getCookie('access_token');
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [dataAllTicket, setDataAllTicket] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);

  const navigateToProfile = () => {
    router.push('/profile');
  };

  useEffect(() => {
    getAllTicket();
  }, []);

  const getAllTicket = async () => {
    try {
      const res = await axios.get(base_url + '/booking/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      setDataAllTicket(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };
  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getFullYear();
    return `${day}/${month < 10 ? '0' : ''}${month + 1}/${year}`;
  };
  const { format } = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  });

  const handleViewDetail = (item) => {
    setViewDetail(viewDetail === item ? false : item);
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
              <div className='flex w-full justify-between cursor-pointer items-center bg-white' onClick={navigateToProfile}>
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
            <h1 className='text-blue text-[14px] font-medium tracking-[4.2px]'>My Booking</h1>
            <div className='flex items-center w-full justify-between mt-[7px]'>
              <h1 className='text-[#000] text-[24px] font-semibold'>My Booking</h1>
              <h1 className='text-blue text-[16px] font-semibold'>Order History</h1>
            </div>
          </div>
          {dataAllTicket?.result?.map((items) => {
            return (
              <div key={items.id} className='flex flex-col w-full py-[26px] rounded-[15px] bg-white mt-[20px]'>
                <h1 className='text-[#000] text-[14px] pl-[28px] font-normal leading-5'>
                  {formatDate(items.ticket.takeoff)} - {formatTime(items.ticket.takeoff)}
                </h1>
                <div className='flex w-[175px] items-center justify-between pl-[28px] mt-[15px]'>
                  <h1 className='text-[#000] text-[20px] font-semibold leading-5'>
                    {items?.ticket?.from?.country === 'Indonesia'
                      ? 'IDN'
                      : items?.ticket?.from?.country === 'France'
                      ? 'FRA'
                      : items?.ticket?.from?.country === 'United States'
                      ? 'USA'
                      : items?.ticket?.from?.country === 'United Kingdom'
                      ? 'UK'
                      : items?.ticket?.from?.country === 'Australia'
                      ? 'AUS'
                      : items?.ticket?.from?.country}
                  </h1>
                  <img src='/icon/one-way-dark.svg' alt='logo' />
                  <h1 className='text-[#000] text-[20px] font-semibold leading-5'>
                    {items?.ticket?.to?.country === 'Indonesia'
                      ? 'IDN'
                      : items?.ticket?.to?.country === 'France'
                      ? 'FRA'
                      : items?.ticket?.to?.country === 'United States'
                      ? 'USA'
                      : items?.ticket?.to?.country === 'United Kingdom'
                      ? 'UK'
                      : items?.ticket?.to?.country === 'Australia'
                      ? 'AUS'
                      : items?.ticket?.to?.country === 'Japan'
                      ? 'JPN'
                      : items?.ticket?.to?.country === 'Singapore'
                      ? 'SGP'
                      : items?.ticket?.to?.country === 'Malaysia'
                      ? 'MYS'
                      : items?.ticket?.to?.country}
                  </h1>
                </div>
                <div className='mt-[10px] border-b border-[#E6E6E6] pb-[15px]'>
                  <h1 className='text-[#979797] text-[14px] font-normal leading-5 pl-[28px]'>
                    {items?.ticket?.airline?.name}, {items?.ticket?.from?.code} - {items?.ticket?.from?.terminal}
                  </h1>
                </div>
                <div className='flex flex-wrap gap-y-3 px-[28px] justify-between items-center mt-[20px]'>
                  <div className='flex flex-wrap items-center gap-x-[68px]'>
                    <h1 className='text-[#7A7A7A] text-[14px] font-semibold'>Status</h1>
                    <button
                      onClick={
                        items.statusId === 1
                          ? () => router.push(`/my-booking/payment/${items.code}`)
                          : items.statusId === 2
                          ? () => router.push(`/my-booking/booking-pass/${items.code}`)
                          : items.statusId === 3
                          ? () => router.push(`/my-booking/payment/${items.code}`)
                          : () => console.log('canceled')
                      }
                      className={`text-[#fff] text-[14px] font-semibold left-5 py-[7px] px-[18px] rounded-[6px] ${
                        items.statusId === 1 ? 'bg-[#FF7F23]' : items.statusId === 2 ? 'bg-[#4FCF4D]' : items.statusId === 3 ? 'bg-[#F24545]' : 'bg-[#F24545]'
                      }`}
                    >
                      {items.statusId === 1 ? 'Waiting for payment' : items.statusId === 2 ? 'Eticket issued' : items.statusId === 3 ? 'Cancelled' : items.statusId}
                    </button>
                  </div>
                  <div onClick={() => handleViewDetail(items)} className='flex items-center gap-x-[15px]'>
                    <h1 className='text-blue text-[16px] font-semibold'>View Details</h1>
                    {viewDetail === items ? <img src='/icon/arrow-top.svg' alt='arrow' /> : <img src='/icon/arrow-bottom.svg' alt='arrow' />}
                  </div>
                </div>
                <div className={`${viewDetail === items ? 'flex' : 'hidden'} flex-col md:flex-row items-center mt-3 px-[28px]`}>
                  {/* from */}
                  <div className='flex w-full md:w-[45%] p-3 justify-center '>
                    <div className='flex flex-col gap-y-2 items-center md:items-start'>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/one-way-dark.svg' alt='logo' />
                        <h1 className='text-secondary text-[12px] font-normal'>
                          {items.ticket.from.name} ({items.ticket.from.code})
                        </h1>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/gate.svg' alt='location' width={18} height={18} />
                        <h1 className='text-secondary text-[12px] font-normal'>{items.ticket.from.terminal}</h1>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/map-pin.svg' alt='location' width={18} height={18} />
                        <h1 className='text-secondary text-[12px] font-normal'>{items.ticket.from.location}</h1>
                      </div>
                    </div>
                  </div>
                  {/* image */}
                  <div className='flex md:w-[10%] justify-center'>
                    <img src='/icon/transfer-dark.svg' alt='transfer' className='hidden md:block' />
                    <img src='/icon/sort-grey.svg' alt='transfer' className='block md:hidden' />
                  </div>
                  {/* to */}
                  <div className='flex w-full md:w-[45%] p-3 justify-center'>
                    <div className='flex flex-col gap-y-2 items-center md:items-start'>
                      <div className='flex gap-x-2'>
                        <img src='/icon/one-way-dark.svg' alt='logo' />
                        <h1 className='text-secondary text-[12px] font-normal'>
                          {items.ticket.to.name} ({items.ticket.to.code})
                        </h1>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/gate.svg' alt='location' width={18} height={18} />
                        <h1 className='text-secondary text-[12px] font-normal'>{items.ticket.to.terminal}</h1>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/map-pin.svg' alt='location' width={18} height={18} />
                        <h1 className='text-secondary text-[12px] font-normal'>{items.ticket.to.location}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${viewDetail === items ? 'flex' : 'hidden'} flex-wrap gap-y-5 w-full mt-3 justify-around px-[28px]`}>
                  <div className='flex flex-col w-[150px] justify-center gap-y-2'>
                    <div className={`${items.isRefundable ? 'flex' : 'hidden'} items-center gap-x-2`}>
                      <img src='/icon/check-list.svg' alt='check' />
                      <h1 className='text-blue text-[14px] font-medium'>Refundable</h1>
                    </div>
                    <div className={`${items.iscanReschedule ? 'flex' : 'hidden'} items-center gap-x-2`}>
                      <img src='/icon/check-list.svg' alt='check' />
                      <h1 className='text-blue text-[14px] font-medium'>Can Reschedule</h1>
                    </div>
                    <div className={`${items.isWithInsurance ? 'flex' : 'hidden'} items-center gap-x-2`}>
                      <img src='/icon/check-list.svg' alt='check' />
                      <h1 className='text-blue text-[14px] font-medium'>With Insurance</h1>
                    </div>
                  </div>
                  <div className='flex w-[150px] items-center justify-center gap-x-5'>
                    {items?.ticket?.FlightFacilities?.map((items) => {
                      return (
                        <img
                          src={items.listSchedule.id === 1 ? '/icon/luggage.svg' : items.listSchedule.id === 2 ? '/icon/meal.svg' : items.listSchedule.id === 3 ? '/icon/wifi.svg' : items.listSchedule.id}
                          alt='facilities'
                          key={items.id}
                          className='w-[35px] h-[32px] object-cover'
                        />
                      );
                    })}
                  </div>
                  <div className='flex w-[150px] items-center justify-center'>
                    <h1 className='text-blue text-[18px] font-semibold'>{items.PassengerDetail.length > 0 ? format(items.ticket.price * items.PassengerDetail.length + 2 * items.PassengerDetail.length) : format(items.ticket.price)}</h1>
                  </div>
                </div>
                <div className={`${viewDetail === items ? 'flex' : 'hidden'} flex-col flex-wrap gap-y-3 w-full mt-5 px-[28px]`}>
                  <div className='flex w-full'>
                    <h1 className='text-[#000] text-[16px] font-medium'>Passenger Detail</h1>
                  </div>
                  <div className='flex flex-col gap-y-3'>
                    {items?.PassengerDetail?.map((items) => {
                      return (
                        <div className='flex gap-x-2 items-center' key={items.id}>
                          <img src='/icon/passenger.svg' alt='passenger' className='w-[20px] h-[20px] object-cover' />
                          <h1 className='text-secondary text-[12px] font-normal'>
                            {items.title}. {items.fullname}, {items.nationality}
                          </h1>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
