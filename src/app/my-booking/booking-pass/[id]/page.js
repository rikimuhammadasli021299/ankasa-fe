'use client';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState, useRef } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
const base_url = process.env.NEXT_PUBLIC_API_LINK;

export default function BookingPass(props) {
  const codeBooking = props.params.id;
  const token = getCookie('access_token');
  const [qrIdBooking, setQrIdBooking] = useState('');
  const [showOption, setShowOption] = useState(false);
  const [dataBookingTicket, setDataBookingTicket] = useState();
  const pdfRef = useRef();

  const downloadTicket = () => {
    const input = pdfRef.current;
    html2canvas(input, { proxy: dataBookingTicket?.ticket?.airline?.photo }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight, imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('booking-pass.pdf');
    });
  };

  useEffect(() => {
    generate();
    getDataBookingTicket();
  }, []);

  const generate = () => {
    QRCode.toDataURL('http://localhost:3000/my-booking/booking-pass/' + codeBooking).then(setQrIdBooking);
  };

  const getDataBookingTicket = async () => {
    try {
      const res = await axios.get(base_url + '/booking/tickets/' + codeBooking, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataBookingTicket(res.data.data.result);
      console.log(res.data.data);
    } catch (error) {
      console.log(error.response.message);
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

  return (
    <>
      <Navbar />
      <div className='max-w-[1366px] flex items-center bg-blue mx-auto mt-[100px] mb-[75px]'>
        <div className='flex flex-col bg-white w-full md:mx-[100px] my-[50px] md:my-[100px] rounded-lg mx-[35px] shadow-xl'>
          <div className='flex w-full justify-between items-center px-3 md:px-10 py-10 overflow-hidden'>
            <h1 className='text-[#000] text-[24px] font-medium'>Booking Pass</h1>
            <div className='relative'>
              <img src={'/icon/icon-option.svg'} alt='icon-option' className={`cursor-pointer ${showOption ? 'rotate-90' : null} transition-all duration-500`} onClick={() => setShowOption(!showOption)} />
              <h1
                className={`text-[12px] w-[135px] text-center text-white font-medium absolute bottom-[-40px] bg-blue p-2 rounded-md ${showOption ? 'left-[-130px]' : 'left-[50px]'} cursor-pointer transition-all duration-500`}
                onClick={downloadTicket}
              >
                Download Ticket
              </h1>
            </div>
          </div>
          <div className='flex w-full justify-between px-3 md:px-10 py-10'>
            <div ref={pdfRef} className='flex w-full border rounded-lg'>
              <div className='flex flex-col w-[70%] md:p-10 p-3'>
                <div className='flex flex-wrap items-center gap-x-[30px] gap-y-[10px]'>
                  <img src={dataBookingTicket?.ticket?.airline?.photo} alt='airlines' className='md:w-[150px] w-[100px] h-[50px] md:h-[75px] object-cover' />
                  <div className='flex justify-between gap-x-[20px] md:gap-x-[40px]'>
                    <h1 className='text-[#000] text-[18px] md:text-[26px] font-semibold'>
                      {dataBookingTicket?.ticket?.from?.country === 'Indonesia'
                        ? 'IDN'
                        : dataBookingTicket?.ticket?.from?.country === 'France'
                        ? 'FRA'
                        : dataBookingTicket?.ticket?.from?.country === 'United States'
                        ? 'USA'
                        : dataBookingTicket?.ticket?.from?.country === 'United Kingdom'
                        ? 'UK'
                        : dataBookingTicket?.ticket?.from?.country === 'Australia'
                        ? 'AUS'
                        : dataBookingTicket?.ticket?.from?.country}
                    </h1>
                    <img src='/icon/one-way-dark.svg' alt='logo' />
                    <h1 className='text-[#000] text-[18px] md:text-[26px] font-semibold'>
                      {dataBookingTicket?.ticket?.to?.country === 'Indonesia'
                        ? 'IDN'
                        : dataBookingTicket?.ticket?.to?.country === 'France'
                        ? 'FRA'
                        : dataBookingTicket?.ticket?.to?.country === 'United States'
                        ? 'USA'
                        : dataBookingTicket?.ticket?.to?.country === 'United Kingdom'
                        ? 'UK'
                        : dataBookingTicket?.ticket?.to?.country === 'Australia'
                        ? 'AUS'
                        : dataBookingTicket?.ticket?.to?.country === 'Japan'
                        ? 'JPN'
                        : dataBookingTicket?.ticket?.to?.country === 'Singapore'
                        ? 'SGP'
                        : dataBookingTicket?.ticket?.to?.country === 'Malaysia'
                        ? 'MYS'
                        : dataBookingTicket?.ticket?.to?.country}
                    </h1>
                  </div>
                </div>
                <div className='flex flex-wrap items-center mt-[30px] gap-x-[100px]'>
                  <div className='flex flex-col'>
                    <h1 className='text-[#A5A5A5] text-[12px] font-normal leading-5'>Code</h1>
                    <h1 className='text-[#595959] text-[14px] font-medium leading-5'>{dataBookingTicket?.ticket?.from?.code}</h1>
                  </div>
                  <div className='flex flex-col'>
                    <h1 className='text-[#A5A5A5] text-[12px] font-normal leading-5'>Class</h1>
                    <h1 className='text-[#595959] text-[14px] font-medium leading-5'>Economy</h1>
                  </div>
                </div>
                <div className='flex flex-wrap items-center mt-[15px] gap-x-[100px]'>
                  <div className='flex flex-col'>
                    <h1 className='text-[#A5A5A5] text-[12px] font-normal leading-5'>Terminal</h1>
                    <h1 className='text-[#595959] text-[14px] font-medium leading-5'>{dataBookingTicket?.ticket?.from?.terminal}</h1>
                  </div>
                  <div className='flex flex-col'>
                    <h1 className='text-[#A5A5A5] text-[12px] font-normal leading-5'>Gate</h1>
                    <h1 className='text-[#595959] text-[14px] font-medium leading-5'>221</h1>
                  </div>
                </div>
                <div className='flex flex-wrap items-center mt-[20px]'>
                  <div className='flex flex-col'>
                    <h1 className='text-[#A5A5A5] text-[12px] font-normal leading-5'>Departure</h1>
                    <h1 className='text-[#595959] text-[14px] font-medium leading-5'>
                      {formatDate(dataBookingTicket?.ticket?.takeoff)} - {formatTime(dataBookingTicket?.ticket?.takeoff)}
                    </h1>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center w-[30%] relative gap-y-3'>
                <img src='/icon/border-dashed.svg' alt='border-dashed' className='object-cover w-[1px] h-full absolute left-0' />
                <img src='/icon/ellipse-white.svg' alt='ellipse' className='absolute left-[-11.5px] top-[-1px]' />
                <img src='/icon/ellipse-white.svg' alt='ellipse' className='absolute bottom-[-1px] left-[-11.5px] rotate-180' />
                {codeBooking ? <img src={qrIdBooking} width={150} height={150} className='object-cover' alt='qr-code' /> : null}
                <h1 className='text-[#313131] text-[10px] text-center font-normal' onClick={generate}>
                  {codeBooking}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
