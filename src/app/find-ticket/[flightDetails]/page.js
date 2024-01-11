'use client';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';
const base_url = process.env.NEXT_PUBLIC_API_LINK;

export default function FlightDetails(props) {
  const idFlight = props.params.flightDetails;
  const token = getCookie('access_token');
  const router = useRouter();
  const refLabelFullName = useRef(null);
  const refLabelFullNameContact = useRef(null);
  const refLabelEmail = useRef(null);
  const refLabelPhoneNumber = useRef(null);
  const refCardPhoneNumber = useRef(null);
  const refLabelTitle = useRef(null);
  const refCardTitle = useRef(null);
  const refLabelNationality = useRef(null);
  const refCardNationality = useRef(null);
  const [checked, setChecked] = useState(false);
  const [toggleSameContact, setToggleSameContact] = useState(false);
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [codePhone, setCodePhone] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [title, setTitle] = useState();
  const [nationality, setNationality] = useState();
  const [fullnameSameAsContact, setFullnameSameAsContact] = useState();
  const [dataDetailFlight, setDataDetailFlight] = useState();

  useEffect(() => {
    getDataDetailFlight();
  }, []);

  const formInputTes = {
    title,
    fullname: `${toggleSameContact ? fullname : fullnameSameAsContact}`,
    nationality,
  };
  console.log(formInputTes);

  const getDataDetailFlight = async () => {
    try {
      const res = await axios.get(base_url + '/airlines/flight/' + idFlight);
      console.log(res.data.data);
      setDataDetailFlight(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceedPayment = async (e) => {
    e.preventDefault();
    if (toggleSameContact ? !fullname : !fullname || !fullnameSameAsContact) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Fullname required',
        icon: 'error',
      });
    }
    if (!email) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Email required',
        icon: 'error',
      });
    }
    if (!phoneNumber || !codePhone) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Phone Number required',
        icon: 'error',
      });
    }
    if (!title) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Title required',
        icon: 'error',
      });
    }
    if (!nationality) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Nationality required',
        icon: 'error',
      });
    }
    let formInput = {
      title1: title,
      fullname1: `${toggleSameContact ? fullname : fullnameSameAsContact}`,
      nationality1: nationality,
    };
    console.log(formInput);

    if (!formInput.title1 || !formInput.fullname1 || !formInput.nationality1) {
      return Swal.fire({
        title: 'Failed!',
        text: 'Form input aya nu kosong',
        icon: 'error',
      });
    }

    Swal.fire({
      title: 'Booking ticket...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await axios.post(base_url + '/booking/tickets/' + idFlight, formInput, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('data booking', res.data.data);
      navigateAfterBooking(res.data.data.code);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Failed!',
        text: error.response.data.message,
        icon: 'error',
      });
    }
  };

  const navigateAfterBooking = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Booking Successfull',
      text: 'Pay now?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/my-booking/payment/${id}`);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        router.push(`/my-booking`);
      }
    });
  };

  const { format } = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  });

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

  const onFocusInputFullName = () => {
    const labelFullName = refLabelFullName.current;
    labelFullName.className = 'text-[#000] text-[14px] font-normal';
  };
  const onBlurInputFullName = () => {
    const labelFullName = refLabelFullName.current;
    labelFullName.className = 'text-[#9B96AB] text-[14px] font-normal';
  };
  const onFocusInputFullNameContact = () => {
    const labelFullNameContact = refLabelFullNameContact.current;
    labelFullNameContact.className = 'text-[#000] text-[14px] font-normal';
  };
  const onBlurInputFullNameContact = () => {
    const labelFullNameContact = refLabelFullNameContact.current;
    labelFullNameContact.className = 'text-[#9B96AB] text-[14px] font-normal';
  };
  const onFocusInputEmail = () => {
    const labelEmail = refLabelEmail.current;
    labelEmail.className = 'text-[#000] text-[14px] font-normal mt-5';
  };
  const onBlurInputEmail = () => {
    const labelEmail = refLabelEmail.current;
    labelEmail.className = 'text-[#9B96AB] text-[14px] font-normal mt-5';
  };
  const onFocusInputPhoneNumber = () => {
    const labelPhoneNumber = refLabelPhoneNumber.current;
    const cardPhoneNumber = refCardPhoneNumber.current;
    labelPhoneNumber.className = 'text-[#000] text-[14px] font-normal mt-5';
    cardPhoneNumber.className = 'flex w-full border-b-2 border-b-[#2395ff] pt-3';
  };
  const onBlurInputPhoneNumber = () => {
    const labelPhoneNumber = refLabelPhoneNumber.current;
    const cardPhoneNumber = refCardPhoneNumber.current;
    labelPhoneNumber.className = 'text-[#9B96AB] text-[14px] font-normal mt-5';
    cardPhoneNumber.className = 'flex w-full border-b-2 pt-3';
  };
  const onFocusInputTitle = () => {
    const labelTitle = refLabelTitle.current;
    const cardTitle = refCardTitle.current;
    labelTitle.className = 'text-[#000] text-[14px] font-normal mt-5';
    cardTitle.className = 'flex w-full border-b-2 border-b-[#2395ff] pt-3 mb-5';
  };
  const onBlurInputTitle = () => {
    const labelTitle = refLabelTitle.current;
    const cardTitle = refCardTitle.current;
    labelTitle.className = 'text-[#9B96AB] text-[14px] font-normal mt-5';
    cardTitle.className = 'flex w-full border-b-2 pt-3 mb-5';
  };
  const onFocusInputNationality = () => {
    const labelNationality = refLabelNationality.current;
    const cardNationality = refCardNationality.current;
    labelNationality.className = 'text-[#000] text-[14px] font-normal mt-5';
    cardNationality.className = 'flex w-full border-b-2 border-b-[#2395ff] pt-3 mb-3';
  };
  const onBlurInputNationality = () => {
    const labelNationality = refLabelNationality.current;
    const cardNationality = refCardNationality.current;
    labelNationality.className = 'text-[#9B96AB] text-[14px] font-normal mt-5';
    cardNationality.className = 'flex w-full border-b-2 pt-3 mb-3';
  };
  const onCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      <Navbar />
      <div className='max-w-[1366px] mx-auto bg-blue mt-[135px] h-[177px] rounded-b-[30px] relative'>
        <img src='/icon/plane.svg' alt='logo' className='absolute bottom-0' />
      </div>
      <div className='max-w-[1366px] mx-auto mt-[-125px]'>
        <div className='flex w-full flex-col-reverse gap-y-[50px] items-center md:items-start md:flex-row bg-[#F5F6FA] px-4 sm:px-6 lg:px-8'>
          <div className='flex md:w-[60%] lg:w-[70%] w-[320px] flex-col z-10 md:px-7 px-0'>
            <h1 className='text-[#000] md:text-white text-[24px] font-semibold'>Contact Person Details</h1>
            <div className='flex flex-col w-full bg-white rounded-[15px] p-5 mt-6'>
              <h1 ref={refLabelFullName} className='text-[#9B96AB] text-[14px] font-normal'>
                Full Name
              </h1>
              <input
                type='text'
                className='w-full border-b-2 outline-none focus:border-b-[#2395ff] text-[16px] text-[#000] font-normal py-2'
                onFocus={onFocusInputFullName}
                onBlur={onBlurInputFullName}
                onChange={(e) => setFullname(e.target.value)}
              />
              <h1 ref={refLabelEmail} className='text-[#9B96AB] text-[14px] font-normal mt-5'>
                Email
              </h1>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                className='w-full border-b-2 outline-none focus:border-b-[#2395ff] text-[16px] text-[#000] font-normal py-2'
                onFocus={onFocusInputEmail}
                onBlur={onBlurInputEmail}
              />
              <h1 ref={refLabelPhoneNumber} className='text-[#9B96AB] text-[14px] font-normal mt-5'>
                Phone Number
              </h1>
              <div ref={refCardPhoneNumber} className='flex w-full border-b-2 pt-3'>
                <select onChange={(e) => setCodePhone(e.target.value)} className='outline-none focus:outline-none' onFocus={onFocusInputPhoneNumber} onBlur={onBlurInputPhoneNumber}>
                  <option value='+62'>+62</option>
                  <option value='+1'>+1</option>
                  <option value='+33'>+33</option>
                  <option value='+44'>+44</option>
                  <option value='+61'>+61</option>
                  <option value='+81'>+81</option>
                  <option value='+65'>+65</option>
                  <option value='+60'>+60</option>
                </select>
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type='text'
                  className='text-[16px] text-[#000] font-normal w-full px-3 outline-none focus:outline-none'
                  onFocus={onFocusInputPhoneNumber}
                  onBlur={onBlurInputPhoneNumber}
                />
              </div>
              <div className='flex px-5 py-3 mt-9 mb-[18px] rounded-[10px] items-center gap-x-3 bg-[rgba(242,69,69,0.10)]'>
                <img src='/icon/warning.svg' alt='warning' />
                <h1 className='text-[#595959] text-[14px] font-normal'>Make sure the customer data is correct.</h1>
              </div>
            </div>
            <h1 className='text-[#000] text-[24px] mt-[50px] font-semibold'>Passenger Details</h1>
            <div className='flex flex-col w-full bg-white rounded-[15px] p-5 mt-6'>
              <div className='flex flex-wrap px-5 py-3 rounded-[10px] items-center justify-between bg-[rgba(35,149,255,0.10)]'>
                <h1 className='text-[#595959] text-[14px] font-semibold'>Passenger : 1 Adult</h1>
                <div className='flex items-center md:gap-x-3 gap-x-1'>
                  <h1 className='text-[#595959] text-[14px] font-semibold'>Same as contact person</h1>
                  <label htmlFor='toggle' className={`${toggleSameContact ? 'bg-[#2395ff]' : 'bg-[#C4C4C4]'} w-[55px] h-[30px] rounded-full cursor-pointer relative peer-checked:bg-yellow-300`}>
                    <input type='checkbox' id='toggle' className='sr-only peer' onChange={() => setToggleSameContact(!toggleSameContact)} />
                    <span className='bg-white w-[24px] h-[24px] rounded-full absolute left-[3px] top-[3px] peer-checked:left-[28px] transition-all duration-500'></span>
                  </label>
                </div>
              </div>
              <h1 ref={refLabelTitle} className='text-[#9B96AB] text-[14px] font-normal mt-5'>
                Title
              </h1>
              <div ref={refCardTitle} className='flex w-full border-b-2 pt-3 mb-5'>
                <select onChange={(e) => setTitle(e.target.value)} className='outline-none focus:outline-none' onFocus={onFocusInputTitle} onBlur={onBlurInputTitle}>
                  <option value='mr'>Mr.</option>
                  <option value='ms'>Ms.</option>
                </select>
              </div>
              <h1 ref={refLabelFullNameContact} className='text-[#9B96AB] text-[14px] font-normal'>
                Full Name
              </h1>
              <input
                type='text'
                value={toggleSameContact ? fullname : fullnameSameAsContact}
                className='w-full border-b-2 outline-none focus:border-b-[#2395ff] text-[16px] text-[#000] font-normal py-2'
                disabled={toggleSameContact ? true : false}
                onFocus={onFocusInputFullNameContact}
                onBlur={onBlurInputFullNameContact}
                onChange={toggleSameContact ? () => setFullnameSameAsContact(fullname) : (e) => setFullnameSameAsContact(e.target.value)}
              />
              <h1 ref={refLabelNationality} className='text-[#9B96AB] text-[14px] font-normal mt-5'>
                Nationality
              </h1>
              <div ref={refCardNationality} className='flex w-full border-b-2 pt-3 mb-3'>
                <select onChange={(e) => setNationality(e.target.value)} className='outline-none focus:outline-none' onFocus={onFocusInputNationality} onBlur={onBlurInputNationality}>
                  <option value='Australia'>Australia</option>
                  <option value='France'>France</option>
                  <option value='Indonesia'>Indonesia</option>
                  <option value='Japan'>Japan</option>
                  <option value='Malaysia'>Malaysia</option>
                  <option value='Singapore'>Singapore</option>
                  <option value='United Kingdom'>United Kingdom</option>
                  <option value='United States'>United States</option>
                </select>
              </div>
            </div>
            <h1 className='text-[#000] text-[24px] mt-[50px] font-semibold'>Passenger Details</h1>
            <div className='flex flex-col w-full bg-white rounded-[15px] py-5 mt-6'>
              <div className='flex px-6 py-3 items-center justify-between border-b'>
                <div className='flex items-center gap-x-3'>
                  <div className={`relative cursor-pointer w-[17px] h-[17px] border-2 border-[#2395ff] ${checked ? 'bg-blue' : null} rounded-[3px]`} onClick={onCheck}>
                    <img src='/icon/icon-check.svg' alt='check' width={15} height={15} className={`absolute opacity-0 ${checked ? 'opacity-100' : 'opacity-0'} z-50`} onClick={onCheck} />
                  </div>
                  <h1 className='text-[#000] md:text-[18px] text-[14px] font-semibold'>Travel Insurance</h1>
                </div>
                <h1 className='text-blue md:text-[18px] text-[14px] font-bold'>
                  $ 2.00 <span className='text-[#979797] md:text-[14px] text-[12px] font-semibold'>/pax</span>
                </h1>
              </div>
              <h1 className='text-[#000] px-6 text-[14px] text-center md:text-start font-normal mt-5'>Get travel compensation up to $ 10.000,00</h1>
            </div>
            <div
              onClick={(e) => handleProceedPayment(e)}
              className='flex mx-auto my-[40px] justify-center w-[278px] bg-blue hover:bg-white text-[#FFF] hover:text-[#2395FF] cursor-pointer rounded-[10px] px-3 py-3 hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#fff] hover:border-[#2395FF]'
            >
              <button className='text-[18px] font-bold'>Proceed to Payment</button>
            </div>
          </div>
          <div className='flex flex-col md:w-[40%] lg:w-[30%] w-[320px] z-10'>
            <div className='flex w-full items-center justify-between'>
              <h1 className='text-white text-[24px] font-semibold'>Flight Details</h1>
              <h1 className='text-white text-[16px] font-semibold'>View Details</h1>
            </div>
            <div className='flex flex-col bg-white w-full rounded-[15px] mt-6 py-7'>
              <div className='flex items-center gap-x-[20px] px-5'>
                <img src={dataDetailFlight?.photo} alt='airlines' className='w-[150px] h-[75px] object-cover' />
                <h1 className='text-[#595959] text-[16px] font-medium'>{dataDetailFlight?.name}</h1>
              </div>
              <div className='flex justify-between mt-[20px] px-5'>
                <h1 className='text-[#000] text-[18px] font-medium'>
                  {dataDetailFlight?.from?.location === 'Bali, Indonesia'
                    ? 'Bali '
                    : dataDetailFlight?.from?.location === 'Jakarta, Indonesia'
                    ? 'Jakarta '
                    : dataDetailFlight?.from?.location === 'Medan, Indonesia'
                    ? 'Medan '
                    : dataDetailFlight?.from?.location === 'Paris, France'
                    ? 'Paris '
                    : dataDetailFlight?.from?.location === 'New York, USA'
                    ? 'New York '
                    : dataDetailFlight?.from?.location === 'London, UK'
                    ? 'London '
                    : dataDetailFlight?.from?.location === 'Sydney, Australia'
                    ? 'Sydney '
                    : dataDetailFlight?.from?.location}
                  {dataDetailFlight?.from?.country === 'Indonesia'
                    ? '(IDN)'
                    : dataDetailFlight?.from?.country === 'France'
                    ? '(FRA)'
                    : dataDetailFlight?.from?.country === 'United States'
                    ? '(USA)'
                    : dataDetailFlight?.from?.country === 'United Kingdom'
                    ? '(UK)'
                    : dataDetailFlight?.from?.country === 'Australia'
                    ? '(AUS)'
                    : dataDetailFlight?.from?.country}
                </h1>
                <img src='/icon/one-way-dark.svg' alt='logo' />
                <h1 className='text-[#000] text-[18px] font-medium'>
                  {dataDetailFlight?.to?.location === 'Bali, Indonesia'
                    ? 'Bali '
                    : dataDetailFlight?.to?.location === 'Tokyo, Japan'
                    ? 'Tokyo '
                    : dataDetailFlight?.to?.location === 'Singapore'
                    ? 'Singapore '
                    : dataDetailFlight?.to?.location === 'Paris, France'
                    ? 'Paris '
                    : dataDetailFlight?.to?.location === 'New York, USA'
                    ? 'New York '
                    : dataDetailFlight?.to?.location === 'London, UK'
                    ? 'London '
                    : dataDetailFlight?.to?.location === 'Kuala Lumpur, Malaysia'
                    ? 'Kuala Lumpur '
                    : dataDetailFlight?.to?.location}
                  {dataDetailFlight?.to?.country === 'Indonesia'
                    ? '(IDN)'
                    : dataDetailFlight?.to?.country === 'France'
                    ? '(FRA)'
                    : dataDetailFlight?.to?.country === 'United States'
                    ? '(USA)'
                    : dataDetailFlight?.to?.country === 'United Kingdom'
                    ? '(UK)'
                    : dataDetailFlight?.to?.country === 'Australia'
                    ? '(AUS)'
                    : dataDetailFlight?.to?.country === 'Japan'
                    ? '(JPN)'
                    : dataDetailFlight?.to?.country === 'Singapore'
                    ? '(SGP)'
                    : dataDetailFlight?.to?.country === 'Malaysia'
                    ? '(MYS)'
                    : dataDetailFlight?.to?.country}
                </h1>
              </div>
              <div className='flex gap-x-5 mt-[20px] px-5'>
                <h1 className='text-[#6B6B6B] text-[12px] font-normal'>{formatDate(dataDetailFlight?.takeoff)}</h1>
                <div className='flex gap-x-2'>
                  <img src='/icon/ellipse-dark.svg' alt='ellipse' />
                  <h1 className='text-[#6B6B6B] text-[12px] font-normal'>
                    {formatTime(dataDetailFlight?.takeoff)}-{formatTime(dataDetailFlight?.landing)}
                  </h1>
                </div>
              </div>
              <div className='flex items-center gap-x-2 mt-[20px] px-5'>
                <img src='/icon/check-list.svg' alt='check' />
                <h1 className='text-blue text-[14px] font-medium'>Refundable</h1>
              </div>
              <div className='flex items-center gap-x-2 mt-[13px] px-5'>
                <img src='/icon/check-list.svg' alt='check' />
                <h1 className='text-blue text-[14px] font-medium'>Can reschedule</h1>
              </div>
              <div className='flex pt-[20px] border-t mt-[20px]'>
                <div className='flex w-full justify-between items-center px-5'>
                  <h1 className='text-[#000] text-[18px] font-medium'>Total Payments</h1>
                  <div className='flex gap-x-2'>
                    <h1 className='text-blue md:text-[18px] lg:text-[18px] xl:text-[24px] font-semibold'>{format(dataDetailFlight?.price)}</h1>
                    <img src='/icon/arrow-bottom.svg' alt='arrow' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
