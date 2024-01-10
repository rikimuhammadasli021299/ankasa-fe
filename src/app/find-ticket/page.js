'use client';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import RangeSlider from '../components/RangeSlider';
import axios from 'axios';
// import Link from 'next/link';
const base_url = process.env.NEXT_PUBLIC_API_LINK;
import { useRouter } from 'next/navigation';

export default function FindTicket() {
  const router = useRouter();
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
  const [departureCity, setDepartureCity] = useState();
  const [destinationCity, setDestinationCity] = useState();
  const [filteredFlightByLocation, setFilteredFlightByLocation] = useState();
  const [filteredFlightByTransitDirect, setFilteredFlightByTransitDirect] = useState(false);
  const [filteredFlightByTransitOne, setFilteredFlightByTransitOne] = useState(false);
  const [filteredFlightByTransitMuch, setFilteredFlightByTransitMuch] = useState(false);
  const [filteredFlightByFacilitiesBagage, setFilteredFlightByFacilitiesBagage] = useState(false);
  const [filteredFlightByFacilitiesMeal, setFilteredFlightByFacilitiesMeal] = useState(false);
  const [filteredFlightByFacilitiesWifi, setFilteredFlightByFacilitiesWifi] = useState(false);
  const [filteredFlightByAirlinesGi, setFilteredFlightByAirlinesGi] = useState(false);
  const [filteredFlightByAirlinesLa, setFilteredFlightByAirlinesLa] = useState(false);
  const [filteredFlightByAirlinesCl, setFilteredFlightByAirlinesCl] = useState(false);
  const [filteredFlightByAirlinesAa, setFilteredFlightByAirlinesAa] = useState(false);
  const [filteredFlightByAirlinesSa, setFilteredFlightByAirlinesSa] = useState(false);

  const [dataFlightIsFlitered, setDataFlightIsFlitered] = useState();

  const { format } = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    getAllFlight();
  }, []);

  const getAllFlight = async () => {
    try {
      const res = await axios.get(base_url + '/airlines/flight');
      setDataAllFlights(res.data.data);
      setFilteredFlightByLocation(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // get unique departure city
  const fromCity = dataAllFlights?.map((items) => items.from.location);
  const uniqueFromcity = Array.from(new Set(fromCity));

  // get unique destination city
  const toCity = dataAllFlights?.map((items) => items.to.location);
  const uniqueTocity = Array.from(new Set(toCity));

  const getMinPrice = (minValue) => {
    setMinPrice(minValue);
  };

  const getMaxPrice = (maxValue) => {
    setMaxPrice(maxValue);
  };

  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const handleViewDetail = (item) => {
    setViewDetail(viewDetail === item ? false : item);
  };

  const changeDepartureCity = (value) => {
    setDepartureCity(value);
  };

  const changeDestinationCity = (value) => {
    setDestinationCity(value);
  };

  const changeSearch = () => {
    const result = dataAllFlights?.filter((items) => {
      return items.from.location === departureCity && items.to.location === destinationCity;
    });
    setFilteredFlightByLocation(result);
    setDataFlightIsFlitered(result);
    setFilteredFlightByTransitDirect(false);
    setFilteredFlightByTransitOne(false);
    setFilteredFlightByTransitMuch(false);
    setFilteredFlightByAirlinesAa(false);
    setFilteredFlightByAirlinesGi(false);
    setFilteredFlightByAirlinesCl(false);
    setFilteredFlightByAirlinesLa(false);
    setFilteredFlightByAirlinesSa(false);
  };

  const handleSetFilter = () => {
    const resultFilterByTransit = dataFlightIsFlitered?.filter((items) => {
      return filteredFlightByTransitDirect ? items.transit === 0 : null || filteredFlightByTransitOne ? items.transit === 1 : null || filteredFlightByTransitMuch ? items.transit > 1 : null;
    });

    const resultFilterByAirlines = resultFilterByTransit?.filter((items) => {
      return filteredFlightByAirlinesGi && filteredFlightByAirlinesAa && filteredFlightByAirlinesLa && filteredFlightByAirlinesSa && filteredFlightByAirlinesCl
        ? items.name === 'Garuda Indonesia' || items.name === 'AirAsia Indonesia' || items.name === 'Lion Air' || items.name === 'Singapore Airlines' || items.name === 'Citilink'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesAa && filteredFlightByAirlinesLa && filteredFlightByAirlinesSa
        ? items.name === 'Garuda Indonesia' || items.name === 'AirAsia Indonesia' || items.name === 'Lion Air' || items.name === 'Singapore Airlines'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesAa && filteredFlightByAirlinesLa
        ? items.name === 'Garuda Indonesia' || items.name === 'AirAsia Indonesia' || items.name === 'Lion Air'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesAa && filteredFlightByAirlinesSa && filteredFlightByAirlinesCl
        ? items.name === 'Garuda Indonesia' || items.name === 'AirAsia Indonesia' || items.name === 'Singapore Airlines' || items.name === 'Citilink'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesAa && filteredFlightByAirlinesSa
        ? items.name === 'Garuda Indonesia' || items.name === 'AirAsia Indonesia' || items.name === 'Singapore Airlines'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesAa
        ? items.name === 'Garuda Indonesia' || items.name === 'AirAsia Indonesia'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesLa && filteredFlightByAirlinesSa && filteredFlightByAirlinesCl
        ? items.name === 'Garuda Indonesia' || items.name === 'Lion Air' || items.name === 'Singapore Airlines' || items.name === 'Citilink'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesLa && filteredFlightByAirlinesSa
        ? items.name === 'Garuda Indonesia' || items.name === 'Lion Air' || items.name === 'Singapore Airlines'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesLa
        ? items.name === 'Garuda Indonesia' || items.name === 'Lion Air'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesSa && filteredFlightByAirlinesCl
        ? items.name === 'Garuda Indonesia' || items.name === 'Singapore Airlines' || items.name === 'Citilink'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesSa
        ? items.name === 'Garuda Indonesia' || items.name === 'Singapore Airlines'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesCl
        ? items.name === 'Garuda Indonesia' || items.name === 'Citilink'
        : filteredFlightByAirlinesGi
        ? items.name === 'Garuda Indonesia'
        : filteredFlightByAirlinesAa && filteredFlightByAirlinesLa && filteredFlightByAirlinesSa && filteredFlightByAirlinesCl
        ? items.name === 'AirAsia Indonesia' || items.name === 'Lion Air' || items.name === 'Singapore Airlines' || items.name === 'Citilink'
        : filteredFlightByAirlinesAa && filteredFlightByAirlinesLa && filteredFlightByAirlinesSa
        ? items.name === 'AirAsia Indonesia' || items.name === 'Lion Air' || items.name === 'Singapore Airlines'
        : filteredFlightByAirlinesAa && filteredFlightByAirlinesLa
        ? items.name === 'AirAsia Indonesia' || items.name === 'Lion Air'
        : filteredFlightByAirlinesAa && filteredFlightByAirlinesSa && filteredFlightByAirlinesCl
        ? items.name === 'AirAsia Indonesia' || items.name === 'Singapore Airlines' || items.name === 'Citilink'
        : filteredFlightByAirlinesAa && filteredFlightByAirlinesSa
        ? items.name === 'AirAsia Indonesia' || items.name === 'Singapore Airlines'
        : filteredFlightByAirlinesAa && filteredFlightByAirlinesCl
        ? items.name === 'AirAsia Indonesia' || items.name === 'Citilink'
        : filteredFlightByAirlinesAa
        ? items.name === 'AirAsia Indonesia'
        : filteredFlightByAirlinesLa && filteredFlightByAirlinesSa && filteredFlightByAirlinesCl
        ? items.name === 'Lion Air' || items.name === 'Singapore Airlines' || items.name === 'Citilink'
        : filteredFlightByAirlinesLa && filteredFlightByAirlinesSa
        ? items.name === 'Lion Air' || items.name === 'Singapore Airlines'
        : filteredFlightByAirlinesLa && filteredFlightByAirlinesCl
        ? items.name === 'Lion Air' || items.name === 'Citilink'
        : filteredFlightByAirlinesLa
        ? items.name === 'Lion Air'
        : filteredFlightByAirlinesSa && filteredFlightByAirlinesCl
        ? items.name === 'Singapore Airlines' || items.name === 'Citilink'
        : filteredFlightByAirlinesSa
        ? items.name === 'Singapore Airlines'
        : filteredFlightByAirlinesCl
        ? items.name === 'Citilink'
        : filteredFlightByAirlinesGi && filteredFlightByAirlinesSa && filteredFlightByAirlinesCl
        ? items?.name === 'Garuda Indonesia' || items.name === 'Singapore Airlines' || items.name === 'Citilink'
        : null;
    });

    setFilteredFlightByLocation(resultFilterByAirlines || resultFilterByTransit);
  };

  const handleResetFilter = () => {
    setFilteredFlightByLocation(dataFlightIsFlitered);
    setFilteredFlightByTransitDirect(false);
    setFilteredFlightByTransitOne(false);
    setFilteredFlightByTransitMuch(false);
    setFilteredFlightByAirlinesAa(false);
    setFilteredFlightByAirlinesGi(false);
    setFilteredFlightByAirlinesCl(false);
    setFilteredFlightByAirlinesLa(false);
    setFilteredFlightByAirlinesSa(false);
  };

  return (
    <>
      <Navbar />
      {/* Hero start */}
      <div className='max-w-[1366px] mx-auto bg-blue mt-[135px] rounded-b-[30px] relative'>
        <div className='flex flex-wrap gap-y-8 justify-between items-center w-full px-[25px] md:px-[73px] lg:px-[139px] py-[50px] md:py-[55px]'>
          <div className='flex items-center z-10'>
            <img src='/icon/logo-white.svg' alt='logo' className='hidden md:block' />
            <div className='flex flex-col ms-3'>
              <div className='flex flex-col md:flex-row justify-between gap-x-8'>
                <div className='flex flex-col'>
                  <h1 className='text-white text-[12px] font-normal'>From</h1>
                  <select value={departureCity} className='text-[16px] text-white bg-transparent font-semibold mt-1 outline-none focus:outline-none' onChange={(e) => changeDepartureCity(e.target.value)}>
                    {uniqueFromcity?.map((items, index) => {
                      return (
                        <option value={items} key={index + 1} className='text-black'>
                          {items}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <img src='/icon/transfer-white.svg' alt='transfer' className='hidden md:block' />
                <div className='flex justify-center items-center mt-4 md:hidden'>
                  <img src='/icon/sort-white.svg' alt='transfer' className='bolck md:hidden' width={18} height={18} />
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-left md:text-right text-white text-[12px] font-normal'>To</h1>
                  <select value={destinationCity} className='md:text-[16px] text-white bg-transparent font-semibold mt-1 outline-none focus:outline-none' onChange={(e) => changeDestinationCity(e.target.value)}>
                    {uniqueTocity?.map((items, index) => {
                      return (
                        <option value={items} key={index + 1} className='text-secondary'>
                          {items}
                        </option>
                      );
                    })}
                  </select>
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
          <button className='text-white hover:text-[#000] text-[16px] font-semibold z-10' onClick={changeSearch}>
            Change Search
          </button>
        </div>
        <img src='/icon/plane.svg' alt='logo' className='absolute bottom-0' />
      </div>
      {/* Hero End */}

      <div className='max-w-[1366px] flex mx-auto pt-8 bg-[#F5F6FA]'>
        <div className='flex flex-col w-[30%]'>
          <div className='flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8'>
            <h1 className='text-[#000] hover:text-[#2395FF] text-[16px] md:text-[24px] font-semibold cursor-pointer' onClick={() => setExpanded((curr) => !curr)}>
              Filter
            </h1>
            <h1 className='text-blue hover:text-[#000] text-[12px] md:text-[16px] font-semibold cursor-pointer' onClick={handleResetFilter}>
              Reset
            </h1>
          </div>
        </div>
        <div className='flex flex-wrap gap-y-2 w-[70%] justify-between items-center pe-4 sm:pe-6 lg:pe-8'>
          <h1 className='text-[#000] text-[16px] md:text-[24px] font-semibold'>
            Select Ticket <span className='text-secondary text-[12px] md:text-[16px] font-semibold'>({filteredFlightByLocation?.length} flights found)</span>
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
              <img src={`${filterTransit ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} className='cursor-pointer' onClick={() => setFilterTransit(!filterTransit)} alt='arrow' />
            </div>
            <div className={`${filterTransit ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Direct</h1>
              <input type='checkbox' checked={filteredFlightByTransitDirect ? true : false} onChange={() => setFilteredFlightByTransitDirect(!filteredFlightByTransitDirect)} />
            </div>
            <div className={`${filterTransit ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Transit</h1>
              <input type='checkbox' checked={filteredFlightByTransitOne ? true : false} onChange={() => setFilteredFlightByTransitOne(!filteredFlightByTransitOne)} />
            </div>
            <div className={`${filterTransit ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Transit 2+</h1>
              <input type='checkbox' checked={filteredFlightByTransitMuch ? true : false} onChange={() => setFilteredFlightByTransitMuch(!filteredFlightByTransitMuch)} />
            </div>
          </div>
          <div className='border-b border-[#E5E5E5] mb-5'>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='text-[#000] text-[16px] font-semibold'>Facilities</h1>
              <img src={`${filterFacilities ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} className='cursor-pointer' onClick={() => setFilterFacilities(!filterFacilities)} alt='arrow' />
            </div>
            <div className={`${filterFacilities ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Luggage</h1>
              <input type='checkbox' onChange={() => setFilteredFlightByFacilitiesBagage(!filteredFlightByFacilitiesBagage)} />
            </div>
            <div className={`${filterFacilities ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>In-Flight Meal</h1>
              <input type='checkbox' onChange={() => setFilteredFlightByFacilitiesMeal(!filteredFlightByFacilitiesMeal)} />
            </div>
            <div className={`${filterFacilities ? 'flex' : 'hidden'} justify-between items-center mb-5`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Wi-fi</h1>
              <input type='checkbox' onChange={() => setFilteredFlightByFacilitiesWifi(!filteredFlightByFacilitiesWifi)} />
            </div>
          </div>
          <div className='border-b border-[#E5E5E5] mb-5'>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='text-[#000] text-[16px] font-semibold'>Departure Time</h1>
              <img src={`${filterDeparture ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} className='cursor-pointer' onClick={() => setFilterDeparture(!filterDeparture)} alt='arrow' />
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
              <img src={`${filterArrived ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} className='cursor-pointer' onClick={() => setFilterArrived(!filterArrived)} alt='arrow' />
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
              <img src={`${filterAirlines ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} className='cursor-pointer' onClick={() => setFilterAirlines(!filterAirlines)} alt='arrow' />
            </div>
            <div className={`${filterAirlines ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Garuda Indonesia</h1>
              <input type='checkbox' checked={filteredFlightByAirlinesGi ? true : false} onChange={() => setFilteredFlightByAirlinesGi(!filteredFlightByAirlinesGi)} />
            </div>
            <div className={`${filterAirlines ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Air Asia</h1>
              <input type='checkbox' checked={filteredFlightByAirlinesAa ? true : false} onChange={() => setFilteredFlightByAirlinesAa(!filteredFlightByAirlinesAa)} />
            </div>
            <div className={`${filterAirlines ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Lion Air</h1>
              <input type='checkbox' checked={filteredFlightByAirlinesLa ? true : false} onChange={() => setFilteredFlightByAirlinesLa(!filteredFlightByAirlinesLa)} />
            </div>
            <div className={`${filterAirlines ? 'flex' : 'hidden'} justify-between items-center mb-3`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Singapore Airlines</h1>
              <input type='checkbox' checked={filteredFlightByAirlinesSa ? true : false} onChange={() => setFilteredFlightByAirlinesSa(!filteredFlightByAirlinesSa)} />
            </div>
            <div className={`${filterAirlines ? 'flex' : 'hidden'} justify-between items-center mb-5`}>
              <h1 className='text-[#000] text-[14px] font-normal leading-5'>Citilink</h1>
              <input type='checkbox' checked={filteredFlightByAirlinesCl ? true : false} onChange={() => setFilteredFlightByAirlinesCl(!filteredFlightByAirlinesCl)} />
            </div>
          </div>
          <div className='mb-5 border-[#E5E5E5] border-b'>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='text-[#000] text-[16px] font-semibold'>Ticket Price</h1>
              <img src={`${filterTicket ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} className='cursor-pointer' onClick={() => setFilterTicket(!filterTicket)} alt='arrow' />
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
          <div
            className='flex bg-blue hover:bg-[#FFF] mx-auto w-[50%] p-1 justify-center items-center rounded-md text-white hover:text-[#2395FF] text-[14px] font-medium hover:cursor-pointer hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#fff] hover:border-[#2395FF]'
            onClick={handleSetFilter}
          >
            Set Filter
          </div>
        </div>
        <div className={`w-[100%] md:w-[73%] flex flex-col`}>
          {filteredFlightByLocation?.map((items) => {
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
                      <h1 className='text-[#000] text-[24px] leading-5 font-semibold'>
                        {items.from.country === 'Indonesia'
                          ? 'IDN'
                          : items.from.country === 'France'
                          ? 'FRA'
                          : items.from.country === 'United States'
                          ? 'USA'
                          : items.from.country === 'United Kingdom'
                          ? 'UK'
                          : items.from.country === 'Australia'
                          ? 'AUS'
                          : items.from.country}
                      </h1>
                      <h1 className='text-secondary text-[12px] font-normal leading-5 mt-1'>{formatTime(items.takeoff)}</h1>
                    </div>
                    <img src='/icon/one-way-dark.svg' alt='logo' />
                    <div className='flex flex-col'>
                      <h1 className='text-[#000] text-[24px] leading-5 font-semibold'>
                        {items.to.country === 'Indonesia'
                          ? 'IDN'
                          : items.to.country === 'France'
                          ? 'FRA'
                          : items.to.country === 'United States'
                          ? 'USA'
                          : items.to.country === 'United Kingdom'
                          ? 'UK'
                          : items.to.country === 'Australia'
                          ? 'AUS'
                          : items.to.country === 'Japan'
                          ? 'JPN'
                          : items.to.country === 'Singapore'
                          ? 'SGP'
                          : items.to.country === 'Malaysia'
                          ? 'MYS'
                          : items.to.country}
                      </h1>
                      <h1 className='text-secondary text-[12px] font-normal leading-5 mt-1'>{formatTime(items.landing)}</h1>
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
                    <button
                      onClick={() => router.push(`/find-ticket/${items.code}`)}
                      className='bg-blue hover:bg-[white] py-[13px] px-[50px] text-white hover:text-[#2395FF] text-[16px] font-bold rounded-[10px] hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#fff] hover:border-[#2395FF]'
                    >
                      Select
                    </button>
                  </div>
                  {/* Button end */}
                </div>
                <div className='flex justify-center md:justify-start mt-7 gap-x-2'>
                  <h1 className='text-blue text-[16px] font-semibold'>View Details</h1>
                  <img src={`${viewDetail === items ? '/icon/arrow-top.svg' : '/icon/arrow-bottom.svg'}`} onClick={() => handleViewDetail(items)} alt='arrow' className='cursor-pointer' />
                </div>
                <div className={`${viewDetail === items ? 'flex' : 'hidden'} flex-col md:flex-row items-center mt-3 bg-slate-50 shadow-none md:shadow-md rounded-t-xl md:rounded-xl`}>
                  <div className='flex w-full md:w-[45%] p-3 justify-center '>
                    <div className='flex flex-col gap-y-2 items-center md:items-start'>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/one-way-dark.svg' alt='logo' />
                        <h1 className='text-secondary text-[12px] font-normal'>
                          {items.from.name} ({items.from.code})
                        </h1>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/gate.svg' alt='location' width={18} height={18} />
                        <h1 className='text-secondary text-[12px] font-normal'>{items.from.terminal}</h1>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/map-pin.svg' alt='location' width={18} height={18} />
                        <h1 className='text-secondary text-[12px] font-normal'>{items.from.location}</h1>
                      </div>
                    </div>
                  </div>
                  <div className='flex md:w-[10%] justify-center'>
                    <img src='/icon/transfer-dark.svg' alt='transfer' className='hidden md:block' />
                    <img src='/icon/sort-grey.svg' alt='transfer' className='block md:hidden' />
                  </div>
                  <div className='flex w-full md:w-[45%] p-3 justify-center'>
                    <div className='flex flex-col gap-y-2 items-center md:items-start'>
                      <div className='flex gap-x-2'>
                        <img src='/icon/one-way-dark.svg' alt='logo' />
                        <h1 className='text-secondary text-[12px] font-normal'>
                          {items.to.name} ({items.to.code})
                        </h1>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/gate.svg' alt='location' width={18} height={18} />
                        <h1 className='text-secondary text-[12px] font-normal'>{items.to.terminal}</h1>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <img src='/icon/map-pin.svg' alt='location' width={18} height={18} />
                        <h1 className='text-secondary text-[12px] font-normal'>{items.to.location}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${viewDetail === items ? 'flex' : 'hidden'} md:hidden flex-col items-center pt-3 justify-center bg-slate-50`}>
                  <h1 className='text-[#595959] text-[16px] leading-5 font-normal'>{items.interval_time}</h1>
                  <h1 className='text-secondary text-[12px] font-normal leading-5'>{items.transit == 0 ? 'Direct' : `(${items.transit} Transit)`}</h1>
                </div>
                <div className={`${viewDetail === items ? 'flex' : 'hidden'} md:hidden justify-center pt-3 gap-x-2 bg-slate-50`}>
                  {items.facilities.map((elements) => (elements == 'baggage' ? <img src='/icon/luggage.svg' alt='luggage' key={items.code} /> : null))}
                  {items.facilities.map((elements) => (elements == 'meal' ? <img src='/icon/meal.svg' alt='meal' key={items.code} /> : null))}
                  {items.facilities.map((elements) => (elements == 'wifi' ? <img src='/icon/wifi.svg' alt='wifi' key={items.code} /> : null))}
                </div>
                <div className={`${viewDetail === items ? 'flex' : 'hidden'} md:hidden justify-center pt-3 bg-slate-50 rounded-b-xl pb-3`}>
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
