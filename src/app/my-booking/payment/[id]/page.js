'use client';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useRef, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
const base_url = process.env.NEXT_PUBLIC_API_LINK;

export default function Payment(props) {
  const codeBooking = props.params.id;
  const token = getCookie('access_token');
  const router = useRouter();
  const [creditCardNumber, setCreditCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [cvcOrCvv, setCvcOrCvv] = useState();
  const refCreditCardNumber = useRef(null);
  const refWrapperCreditCardNumber = useRef(null);
  const refWrapperExpiryDate = useRef(null);
  const refWrapperCvcOrCvv = useRef(null);
  const refInputExpiryDate = useRef(null);

  const onFocusInputCcNumber = () => {
    const wrapperCcNumber = refWrapperCreditCardNumber.current;
    wrapperCcNumber.className = 'flex mx-3 p-2 rounded-md border border-solid border-[#2395ff] gap-x-2';
  };
  const onBlurInputCcNumber = () => {
    const wrapperCcNumber = refWrapperCreditCardNumber.current;
    wrapperCcNumber.className = 'flex mx-3 p-2 rounded-md border border-solid gap-x-2';
  };
  const onFocusInputExpiryDate = () => {
    const wrapperExpiryDate = refWrapperExpiryDate.current;
    wrapperExpiryDate.className = 'flex p-2 overflow-hidden items-center rounded-md border border-solid border-[#2395ff] gap-x-2';
  };
  const onBlurInputExpiryDate = () => {
    const wrapperExpiryDate = refWrapperExpiryDate.current;
    wrapperExpiryDate.className = 'flex p-2 overflow-hidden items-center rounded-md border border-solid gap-x-2';
  };
  const onFocusInputCvcOrCvv = () => {
    const wrapperCvcOrCvv = refWrapperCvcOrCvv.current;
    wrapperCvcOrCvv.className = 'flex p-2 overflow-hidden items-center rounded-md border border-solid border-[#2395ff] gap-x-2';
  };
  const onBlurInputCvcOrCvv = () => {
    const wrapperCvcOrCvv = refWrapperCvcOrCvv.current;
    wrapperCvcOrCvv.className = 'flex p-2 overflow-hidden items-center rounded-md border border-solid gap-x-2';
  };

  const handleInputCreditCard = () => {
    const creditNumber = refCreditCardNumber.current;
    let num = creditNumber.value;

    let newValue = '';
    num = num.replace(/\s/g, '');
    for (let i = 0; i < num.length; i++) {
      if (i % 4 == 0 && i > 0) newValue = newValue.concat(' ');
      newValue = newValue.concat(num[i]);
      creditNumber.value = newValue;
    }
  };

  const handleInputExpiryDate = (e) => {
    const expiryDate = refInputExpiryDate.current;
    let newInput = expiryDate.value;

    if (e.which !== 8) {
      let numChars = e.target.value.length;
      if (numChars == 2) {
        let thisVal = e.target.value;
        thisVal += '/';
        e.target.value = thisVal;
      }
    }
  };

  const handlePayment = async () => {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmation',
      text: 'Pay now?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        return pay();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };
  const handleCancel = async () => {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmation',
      text: 'Are you sure want to cancel?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        return cancelPay();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };

  const pay = async () => {
    let status = {
      statusId: 2,
    };
    Swal.fire({
      title: 'Processing payments...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const res = await axios.put(base_url + '/booking/status/' + codeBooking, status, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      Swal.fire({
        title: 'Success!',
        text: 'Payment successful',
        icon: 'success',
      });
      navigateAfterPayment(res.data.data.code);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Failed!',
        text: 'Payment failed',
        icon: 'error',
      });
    }
  };
  const cancelPay = async () => {
    let status = {
      statusId: 3,
    };

    Swal.fire({
      title: 'Canceling the order...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const res = await axios.put(base_url + '/booking/status/' + codeBooking, status, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      Swal.fire({
        title: 'Success!',
        text: 'Ticket cancelled',
        icon: 'success',
      });
      router.push('/my-booking');
    } catch (error) {
      console.log(error.response.message);
      Swal.fire({
        title: 'Failed!',
        text: 'Cancel failed',
        icon: 'error',
      });
    }
  };

  const navigateAfterPayment = (id) => {
    router.push(`/my-booking/booking-pass/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className='max-w-[1366px] flex items-center bg-blue mx-auto mt-[100px]'>
        <div className='flex bg-white md:flex-row flex-col w-full md:mx-[100px] my-[50px] md:my-[100px] rounded-lg mx-[35px] shadow-xl'>
          <div className='flex flex-col md:w-[50%] w-full px-3 py-3 md:py-10 md:px-10'>
            <h1 className='text-[#000] text-[18px] font-semibold'>Payment Method</h1>
            <div className='flex flex-col bg-slate-200 mt-2 rounded-md py-4 px-3'>
              <div className='flex justify-between items-center'>
                <h1 className='text-[#000] font-medium '>Paypal</h1>
                <img src='/icon/paypal.svg' alt='paypal' className='w-[30px] h-[30px] object-cover' />
              </div>
              <div className='flex flex-col md:flex-row justify-between md:items-center items-start mt-[35px]'>
                <h1 className='text-[#000] font-medium '>Credit Card</h1>
                <div className='flex flex-wrap gap-x-2'>
                  <img src='/icon/mastercard.svg' alt='mastercard' className='w-[40px] h-[40px] object-cover' />
                  <img src='/icon/visa.svg' alt='visa' className='w-[40px] h-[40px] object-cover' />
                  <img src='/icon/stripe.svg' alt='stripe' className='w-[40px] h-[40px] object-cover' />
                  <img src='/icon/mastercard.svg' alt='mastercard' className='w-[40px] h-[40px] object-cover' />
                </div>
              </div>
            </div>
            <h1 className='text-[#313131] text-[13px] font-medium mt-10 ps-3'>Card Number</h1>
            <div ref={refWrapperCreditCardNumber} className='flex mx-3 p-2 rounded-md border border-solid gap-x-2'>
              <img src='/icon/credit-card.svg' alt='credit-card' className='w-[30px] h-[30px] object-cover' />
              <input
                type='tel'
                className='text-[#000] text-[13px] w-full outline-none focus:outline-none'
                ref={refCreditCardNumber}
                id='number'
                placeholder='0000 0000 0000 0000'
                maxLength='19'
                onKeyUp={handleInputCreditCard}
                value={creditCardNumber}
                onFocus={onFocusInputCcNumber}
                onBlur={onBlurInputCcNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
              />
            </div>
            <div className='flex mt-5 px-3 w-full gap-x-2'>
              <div className='flex flex-col w-[50%]'>
                <h1 className='text-[#313131] text-[13px] font-medium'>Expiry Date</h1>
                <div ref={refWrapperExpiryDate} className='flex p-2 overflow-hidden items-center rounded-md border border-solid gap-x-2'>
                  <img src='/icon/calendar.svg' alt='calendar' className='w-[20px] h-[20px] object-cover' />
                  <input
                    type='text'
                    className='text-[#000] text-[13px] outline-none focus:outline-none w-full'
                    maxLength={5}
                    ref={refInputExpiryDate}
                    value={expiryDate}
                    onFocus={onFocusInputExpiryDate}
                    onBlur={onBlurInputExpiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    onKeyUp={(e) => handleInputExpiryDate(e)}
                    placeholder='MM/YY'
                  />
                </div>
              </div>
              <div className='flex flex-col w-[50%]'>
                <h1 className='text-[#313131] text-[13px] font-medium'>CVC/CVV</h1>
                <div ref={refWrapperCvcOrCvv} className='flex p-2 overflow-hidden items-center rounded-md border border-solid gap-x-2'>
                  <img src='/icon/padlock.svg' alt='padlock' className='w-[20px] h-[20px] object-cover' />
                  <input
                    type='text'
                    className='text-[#000] text-[13px] w-full outline-none focus:outline-none'
                    maxLength={3}
                    value={cvcOrCvv}
                    onFocus={onFocusInputCvcOrCvv}
                    onBlur={onBlurInputCvcOrCvv}
                    onChange={(e) => setCvcOrCvv(e.target.value)}
                    placeholder='000'
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center gap-x-1 p-3'>
              <img src='/icon/padlock.svg' alt='padlock' className='w-[12px] h-[12px] object-cover' />
              <h1 className='text-[10px] text-gray-600 font-normal'>Your transaction is secured with ssl certifacte</h1>
            </div>
            <div className='flex flex-wrap justify-around p-3 gap-5'>
              <div
                onClick={handleCancel}
                className='flex w-[45%] justify-center bg-[#F24545] hover:bg-[white] text-white hover:text-[#F24545] rounded-md py-3 hover:shadow-[0px_8px_10px_0px_rgba(242,70,70,0.30)] border border-[#F24545] hover:border-[#F24545] cursor-pointer'
              >
                <h1 className='text-[13px] font-medium'>Cancel</h1>
              </div>
              <div
                onClick={handlePayment}
                className='flex w-[45%] justify-center bg-blue hover:bg-[white] text-white hover:text-[#2395FF] rounded-md py-3 hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#2395FF] hover:border-[#2395FF] cursor-pointer'
              >
                <h1 className='text-[13px] font-medium'>Pay Now</h1>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:w-[50%] w-full px-3 md:ps-0 py-3 md:py-10 md:pr-10'>
            <h1 className='text-[#000] text-[18px] font-semibold'>Summary</h1>
            <div className='flex flex-col mt-2 rounded-md py-4 border-b'>
              <div className='flex flex-wrap justify-between items-center pb-2'>
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <h1 className='text-[#000] font-medium'>Pro(Billed Monthly)</h1>
                    <img src='/icon/triangle.svg' alt='triangle' className='w-[10px] h-[10px] object-cover rotate-180' />
                  </div>
                  <h1 className='text-blue text-[10px] font-normal underline cursor-pointer'>Save 20% with annual billing</h1>
                </div>
                <h1 className='text-[#000] font-medium text-[20px]'>
                  $9.99<span className='text-secondary text-[8px]'>/month</span>
                </h1>
              </div>
            </div>
            <div className='flex flex-col mt-3 rounded-md py-4 border-b'>
              <div className='flex justify-between'>
                <h1 className='text-[#000] font-medium'>Referral Bonouses</h1>
                <h1 className='text-[#000] font-medium'>-$2.00</h1>
              </div>
              <div className='flex mt-2 justify-between'>
                <div className='flex items-center gap-x-1'>
                  <h1 className='text-[#000] font-medium'>VAT</h1>
                  <img src='/icon/pending.svg' alt='pending' className='w-[15px] h-[15px]' />
                </div>
                <h1 className='text-[#000] font-medium'>-20%</h1>
              </div>
            </div>
            <div className='flex flex-col mt-3 rounded-md py-[14px]'>
              <div className='flex justify-between'>
                <h1 className='text-[#000] font-medium'>Today you pay(US Dollars)</h1>
                <h1 className='text-[#000] font-medium'>$0</h1>
              </div>
              <h1 className='text-secondary text-[12px] font-normal'>After 30 days $9.59</h1>
            </div>
            <div className='flex justify-center bg-blue hover:bg-[white] text-white hover:text-[#2395FF] mt-5 rounded-md py-3 hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)] border border-[#fff] hover:border-[#2395FF] cursor-pointer'>
              <h1 className='text-[12px] font-light'>Try it free for 30 days</h1>
            </div>
            <h1 className='text-blue underline text-center text-[12px] font-light mt-1 cursor-pointer'>Have a promo code?</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
