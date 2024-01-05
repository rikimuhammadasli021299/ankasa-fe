'use client';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import RangeSlider from '../components/RangeSlider';
import axios from 'axios';

export default function FindTicket() {
  const [expanded, setExpanded] = useState(true);
  const [filterTransit, setFilterTransit] = useState(false);
  const [filterFacilities, setFilterFacilities] = useState(false);
  const [filterDeparture, setFilterDeparture] = useState(false);
  const [filterArrived, setFilterArrived] = useState(false);
  const [filterAirlines, setFilterAirlines] = useState(false);
  const [filterTicket, setFilterTicket] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [dataAllFlights, setDataAllFlights] = useState();
  const { format } = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    getAllFlight();
  }, []);

  const getAllFlight = async () => {
    try {
      const res = await axios.get('https://easy-lime-seal-toga.cyclic.app/airlines/flight');
      setDataAllFlights(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMinPrice = (minValue) => {
    setMinPrice(minValue);
  };

  const getMaxPrice = (maxValue) => {
    setMaxPrice(maxValue);
  };

  return (
    <>
      <Navbar />
      {/* Hero start */}
      <div className='max-w-[1366px] mx-auto bg-blue mt-[135px] rounded-b-[30px] relative'>
        <div className='flex flex-wrap gap-y-8 justify-between items-center w-full px-[25px] md:px-[73px] lg:px-[139px] py-[50px] md:py-[55px]'>
          <div className='flex items-center z-10'>
            <img src='/icon/logo-white.svg' alt='logo' />
            <div className='flex flex-col ms-3'>
              <div className='flex justify-between gap-x-8'>
                <div className='flex flex-col'>
                  <h1 className='text-white text-[12px] font-normal'>From</h1>
                  <h1 className='text-white text-[16px] font-semibold mt-1'>Medan {'(IDN)'}</h1>
                </div>
                <img src='/icon/transfer-white.svg' alt='transfer' />
                <div className='flex flex-col'>
                  <h1 className='text-right text-white text-[12px] font-normal'>To</h1>
                  <h1 className='text-right text-white text-[16px] font-semibold mt-1'>Tokyo {'(JPN)'}</h1>
                </div>
              </div>
              <div className='flex flex-wrap justify-between mt-2'>
                <h1 className='text-white text-[12px] font-light'>Monday, 20 July 20</h1>
                <div className='flex gap-x-2'>
                  <div className='flex gap-x-1'>
                    <img src='/icon/ellipse.svg' alt='ellipese' />
                    <h1 className='text-white text-[12px] font-light'>6 Passenger</h1>
                  </div>
                  <div className='flex gap-x-1'>
                    <img src='/icon/ellipse.svg' alt='ellipese' />
                    <h1 className='text-white text-[12px] font-light'>Economy</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className='text-white text-[16px] font-semibold z-10'>Change Search</h1>
        </div>
        <img src='/icon/plane.svg' alt='logo' className='absolute bottom-0' />
      </div>
      {/* Hero End */}

      <div className='max-w-[1366px] flex mx-auto pt-8 bg-[#F5F6FA]'>
        <div className='flex flex-col w-[30%]'>
          <div className='flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8'>
            <h1 className='text-[#000] text-[16px] md:text-[24px] font-semibold' onClick={() => setExpanded((curr) => !curr)}>
              Filter
            </h1>
            <h1 className='text-blue text-[12px] md:text-[16px] font-semibold'>Reset</h1>
          </div>
        </div>
        <div className='flex flex-wrap gap-y-2 w-[70%] justify-between items-center pe-4 sm:pe-6 lg:pe-8'>
          <h1 className='text-[#000] text-[16px] md:text-[24px] font-semibold'>
            Select Ticket <span className='text-secondary text-[12px] md:text-[16px] font-semibold'>({dataAllFlights?.length} flights found)</span>
          </h1>
          <div className='flex gap-x-2'>
            <h1 className='text-[#000] text-[12px] md:text-[16px] font-semibold'>Sort by</h1>
            <img src='/icon/sort.svg' alt='sort' />
          </div>
        </div>
      </div>
      <div className='max-w-[1366px] flex mx-auto pb-[25px] px-4 sm:px-6 lg:px-8 pt-7 bg-[#F5F6FA] gap-x-9'>
        <div className={`md:w-[27%] w-[200px] h-full md:relative absolute rounded-[15px] p-4 bg-[#fff] ${expanded ? null : 'hidden'}`}>
          <div className='border-b border-[#E5E5E5] mb-5'>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='text-[#000] text-[16px] font-semibold'>Transit</h1>
              <img src={`${filterTransit ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} onClick={() => setFilterTransit(!filterTransit)} alt='arrow' />
            </div>
            <div className={`${filterTransit ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Direct</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterTransit ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Transit</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterTransit ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Transit 2+</h1>
              <input type='checkbox' />
            </div>
          </div>
          <div className='border-b border-[#E5E5E5] mb-5'>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='text-[#000] text-[16px] font-semibold'>Facilities</h1>
              <img src={`${filterFacilities ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} onClick={() => setFilterFacilities(!filterFacilities)} alt='arrow' />
            </div>
            <div className={`${filterFacilities ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Luggage</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterFacilities ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>In-Flight Meal</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterFacilities ? 'flex' : 'hidden'} justify-between items-center mb-5`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Wi-fi</h1>
              <input type='checkbox' />
            </div>
          </div>
          <div className='border-b border-[#E5E5E5] mb-5'>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='text-[#000] text-[16px] font-semibold'>Departure Time</h1>
              <img src={`${filterDeparture ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} onClick={() => setFilterDeparture(!filterDeparture)} alt='arrow' />
            </div>
            <div className={`${filterDeparture ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>00:00 - 06:00</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterDeparture ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>06:00 - 12:00</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterDeparture ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>12:00 - 18:00</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterDeparture ? 'flex' : 'hidden'} justify-between items-center mb-5`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>18:00 - 24:00</h1>
              <input type='checkbox' />
            </div>
          </div>
          <div className='border-b border-[#E5E5E5] mb-5'>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='text-[#000] text-[16px] font-semibold'>Time Arrived</h1>
              <img src={`${filterArrived ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} onClick={() => setFilterArrived(!filterArrived)} alt='arrow' />
            </div>
            <div className={`${filterArrived ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>00:00 - 06:00</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterArrived ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>06:00 - 12:00</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterArrived ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>12:00 - 18:00</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterArrived ? 'flex' : 'hidden'} justify-between items-center mb-5`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>18:00 - 24:00</h1>
              <input type='checkbox' />
            </div>
          </div>
          <div className='border-b border-[#E5E5E5] mb-5'>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='text-[#000] text-[16px] font-semibold'>Airlines</h1>
              <img src={`${filterAirlines ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} onClick={() => setFilterAirlines(!filterAirlines)} alt='arrow' />
            </div>
            <div className={`${filterAirlines ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Garuda Indonesia</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterAirlines ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Air Asia</h1>
              <input type='checkbox' />
            </div>
            <div className={`${filterAirlines ? 'flex' : 'hidden'} justify-between items-center mb-5`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Lion Air</h1>
              <input type='checkbox' />
            </div>
          </div>
          <div className='mb-5'>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='text-[#000] text-[16px] font-semibold'>Ticket Price</h1>
              <img src={`${filterTicket ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} onClick={() => setFilterTicket(!filterTicket)} alt='arrow' />
            </div>
            <div className={`${filterTicket ? 'flex' : 'hidden'} justify-between items-center mb-7`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Lowest</h1>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Higest</h1>
            </div>
            <div className={`${filterTicket ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <RangeSlider initialMin={0} initialMax={1000} min={0} max={1000} step={100} priceCap={100} getMinPrice={getMinPrice} getMaxPrice={getMaxPrice} />
            </div>
            <div className={`${filterTicket ? 'flex' : 'hidden'} justify-between items-center mb-5`}>
              <h1 className='text-[16px] font-semibold text-blue'>{format(minPrice)}</h1>
              <h1 className='text-[16px] font-semibold text-blue'>{format(maxPrice)}</h1>
            </div>
          </div>
        </div>
        <div className={`w-[100%] md:w-[73%] flex flex-col`}>
          {dataAllFlights?.map((items) => {
            return (
              <div className='flex flex-col w-full bg-[#fff] mb-10 rounded-[15px] px-[28px] py-[28px] md:py-[35px]' key={items.code}>
                <div className='md:flex hidden items-center gap-x-6'>
                  <img src={items.photo} className='w-[200px] h-[100px] object-cover' alt='airlines' />
                  <h1 className='text-[#595959] leading-5 text-[16px] font-semibold'>{items.name}</h1>
                </div>
                <div className='flex flex-wrap items-center gap-y-6 gap-x-6 justify-around mt-0 md:mt-7'>
                  {/* Logo start */}
                  <div className='flex md:hidden items-center gap-x-6 w-[150px]'>
                    <img src={items.photo} className='w-[100px] h-[50px] object-cover' alt='airlines' />
                  </div>
                  {/* Logo start end*/}
                  {/* Tujuan start */}
                  <div className='flex gap-x-6 justify-center w-[150px]'>
                    <div className='flex flex-col'>
                      <h1 className='text-[#000] text-[24px] leading-5 font-semibold'>IDN</h1>
                      <h1 className='text-secondary text-[12px] font-normal leading-5 mt-1'>12:33</h1>
                    </div>
                    <img src='/icon/one-way-dark.svg' alt='logo' />
                    <div className='flex flex-col'>
                      <h1 className='text-[#000] text-[24px] leading-5 font-semibold'>JPN</h1>
                      <h1 className='text-secondary text-[12px] font-normal leading-5 mt-1'>15:21</h1>
                    </div>
                  </div>
                  {/* Tujuan end */}
                  <div className='hidden md:flex flex-col'>
                    <h1 className='text-[#595959] text-[16px] leading-5 font-normal'>{items.interval_time}</h1>
                    <h1 className='text-secondary text-[12px] font-normal leading-5 mt-1 self-center'>{items.transit == 0 ? 'Direct' : `(${items.transit} Transit)`}</h1>
                  </div>
                  <div className='hidden md:flex justify-between gap-x-2'>
                    {items.facilities.map((elements) => (elements == 'baggage' ? <img src='/icon/luggage.svg' alt='luggage' key={items.code} /> : null))}
                    {items.facilities.map((elements) => (elements == 'meal' ? <img src='/icon/meal.svg' alt='meal' key={items.code} /> : null))}
                    {items.facilities.map((elements) => (elements == 'wifi' ? <img src='/icon/wifi.svg' alt='wifi' key={items.code} /> : null))}
                  </div>
                  <div className='hidden md:flex'>
                    <h1 className='text-blue text-[16px] font-medium'>{format(items.price)}</h1>
                    <h1 className='text-[#979797] text-[14px] font-medium'>/pax</h1>
                  </div>
                  {/* Button start */}
                  <div className='flex justify-center w-[150px]'>
                    <button className='bg-blue py-[13px] px-[50px] text-white text-[16px] font-bold rounded-[10px] shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)]'>Select</button>
                  </div>
                  {/* Button end */}
                </div>
                <div className='flex justify-center md:hidden mt-7 gap-x-2'>
                  <h1 className='text-blue text-[16px] font-semibold'>View Details</h1>
                  <img src={`${viewDetail ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} onClick={() => setViewDetail(!viewDetail)} alt='arrow' />
                </div>
                <div className={`${viewDetail ? 'flex' : 'hidden'} md:hidden flex-col items-center mt-3 justify-center`}>
                  <h1 className='text-[#595959] text-[16px] leading-5 font-normal'>{items.interval_time}</h1>
                  <h1 className='text-secondary text-[12px] font-normal leading-5'>{items.transit == 0 ? 'Direct' : `(${items.transit} Transit)`}</h1>
                </div>
                <div className={`${viewDetail ? 'flex' : 'hidden'} md:hidden justify-center mt-3 gap-x-2`}>
                  {items.facilities.map((elements) => (elements == 'baggage' ? <img src='/icon/luggage.svg' alt='luggage' key={items.code} /> : null))}
                  {items.facilities.map((elements) => (elements == 'meal' ? <img src='/icon/meal.svg' alt='meal' key={items.code} /> : null))}
                  {items.facilities.map((elements) => (elements == 'wifi' ? <img src='/icon/wifi.svg' alt='wifi' key={items.code} /> : null))}
                </div>
                <div className={`${viewDetail ? 'flex' : 'hidden'} md:hidden justify-center mt-3`}>
                  <h1 className='text-blue text-[16px] font-medium'>{format(items.price)}</h1>
                  <h1 className='text-[#979797] text-[14px] font-medium'>/pax</h1>
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
