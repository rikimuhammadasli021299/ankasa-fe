'use client';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('');
  const [flightClass, setFlightClass] = useState('');
  const [journey, setJourney] = useState(1);
  const [child, setChild] = useState('');
  const [adult, setAdult] = useState('');
  const [nextOrPrev, setNextOrPrev] = useState('');
  const arrayImage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arrayImageTop = [1, 2];

  return (
    <main>
      <Navbar />
      <div className='pt-20'>
        {/* Hero section start */}
        <section>
          <div className='flex'>
            <div className='flex flex-col w-[60%] relative'>
              <div className='md:mx-16 mx-2 mt-9'>
                <h1 className='text-primary text-[24px] md:text-[44px] font-semibold md:leading-[75px] leading-[45px]'>
                  Find your <span className='text-blue'>fligth</span>
                </h1>
                <p className='text-secondary md:text-[14px] text-[11px] font-normal'>and explore the world with us.</p>
              </div>
              <div className={`mt-10 bg-[linear-gradient(180deg,_rgba(0,0,0,0.00)_0%,_rgba(0,0,0,0.81)_100%),url('/image/hero-1.png')] md:w-[425px] xl:w-[725px] h-[500px] rounded-r-[75px]`} />
              <div className='flex w-[300px] md:w-[375px] rounded-lg bg-white shadow-[0px_8px_27px_0px_rgba(14,63,108,0.19)] absolute md:top-36 top-28 lg:top-8 sm:left-1/2 md:left-1/2 lg:left-[75%] left-[20%]'>
                <div className='flex flex-col mx-3 my-3 w-full'>
                  <h1 className='text-[#000] font-semibold leading-5 text-[14px] mb-2'>Hey,</h1>
                  <h1 className='text-[#000] font-medium leading-5 text-[18px]'>Where you want to go?</h1>
                  <div className='flex justify-between mt-3'>
                    <h1 className='text-blue text-[16px] font-semibold'>Recently Searched</h1>
                    <img src='/icon/arrow-right.svg' alt='arrow' />
                  </div>
                  <div className='flex justify-between bg-white rounded-lg p-3 mt-4 shadow-[0px_8px_27px_0px_rgba(14,63,108,0.19)]'>
                    <div className='flex flex-col'>
                      <h1 className='text-secondary text-[12px] font-normal'>From</h1>
                      <h1 className='text-[#000] text-[20px] font-semibold'>Medan</h1>
                      <h1 className='text-secondary text-[12px] font-light'>Indonesia</h1>
                    </div>
                    <img src='/icon/transfer.svg' alt='transfer' />
                    <div className='flex flex-col items-end'>
                      <h1 className='text-secondary text-[12px] font-normal'>To</h1>
                      <h1 className='text-[#000] text-[20px] font-semibold'>Tokyo</h1>
                      <h1 className='text-secondary text-[12px] font-light'>Japan</h1>
                    </div>
                  </div>
                  <div className='flex justify-between mt-4'>
                    <button className={`w-[45%] h-11 rounded-md ${journey === 2 ? 'bg-[#F0F0F0]' : 'bg-blue'}`} onClick={() => setJourney(1)}>
                      <div className='flex justify-center gap-x-2'>
                        <img src={`${journey === 2 ? '/icon/one-way-dark.svg' : '/icon/one-way.svg'}`} alt='one-way' />
                        <h1 className={`${journey === 2 ? 'text-secondary' : 'text-white'} font-semibold text-[14px]`}>One Way</h1>
                      </div>
                    </button>
                    <button className={`w-[45%] h-11 rounded-md ${journey === 1 ? 'bg-[#F0F0F0]' : 'bg-blue'}`} onClick={() => setJourney(2)}>
                      <div className='flex justify-center gap-x-2'>
                        <img src={`${journey === 1 ? '/icon/round-trip.svg' : '/icon/round-trip-white.svg'}`} alt='round-trip' />
                        <h1 className={`${journey === 1 ? 'text-secondary ' : 'text-white'} font-semibold text-[14px]`}>Round Trip</h1>
                      </div>
                    </button>
                  </div>
                  <h1 className='text-secondary font-medium text-[14px] leading-5 mt-5'>Departure</h1>
                  <div className='flex'>
                    <input type='date' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className='w-full p-3 rounded-md outline-none focus:outline-none mt-2 border border-solid border-[#DDD]' />
                  </div>
                  <h1 className='text-secondary text-[14px] font-medium mt-5'>How many person?</h1>
                  <div className='flex justify-between mt-3'>
                    <div className='flex w-[45%] bg-white items-center relative px-3 border border-solid border-[#DDD] rounded-md py-3'>
                      <input type='text' placeholder='0' value={child} className='w-5 focus:outline-none text-[#000] font-bold text-[14px]' onChange={(e) => setChild(e.target.value)} />
                      <h1 className='text-[#000] font-bold text-[14px]'>Child</h1>
                      <img src='/icon/arrow-right.svg' alt='arrow' className='absolute right-1' />
                    </div>
                    <div className='flex w-[45%] bg-white items-center relative px-3 border border-solid border-[#DDD] rounded-md'>
                      <input type='text' placeholder='0' value={adult} className='w-5 focus:outline-none text-[#000] font-bold text-[14px]' onChange={(e) => setAdult(e.target.value)} />
                      <h1 className='text-[#000] font-bold text-[14px]'>Adult</h1>
                      <img src='/icon/arrow-right.svg' alt='arrow' className='absolute right-1' />
                    </div>
                  </div>
                  <h1 className='text-secondary text-[14px] font-medium mt-5'>Which class do you want?</h1>
                  <div className='flex justify-between mt-2'>
                    <div className='flex'>
                      <input type='radio' name='class' value={'economoy'} onChange={(e) => setFlightClass(e.target.value)} />
                      <p className='text-[#000] text-[14px] font-bold ms-2'>Econmoy</p>
                    </div>
                    <div className='flex'>
                      <input type='radio' name='class' value={'business'} onChange={(e) => setFlightClass(e.target.value)} />
                      <p className='text-[#000] text-[14px] font-bold ms-2'>Business</p>
                    </div>
                    <div className='flex'>
                      <input type='radio' name='class' value={'first class'} onChange={(e) => setFlightClass(e.target.value)} />
                      <p className='text-[#000] text-[14px] font-bold ms-2'>First Class</p>
                    </div>
                  </div>
                  <button className='flex justify-around bg-blue w-full items-center h-14 rounded-md mt-5'>
                    <h1 className='text-white text-[18px] font-bold'>SEARCH FLIGHT</h1>
                    <img src='/icon/arrow-next.svg' alt='arrow' />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-[40%]'>
              <div className={`w-[150px] md:w-[325px] lg:w-[425px] h-[500px] bg-[linear-gradient(180deg,_rgba(0,0,0,0.00)_0%,_rgba(0,0,0,0.81)_100%),url('/image/hero-2.png')] self-end rounded-l-[75px]`} />
              <img src='/icon/bubble.svg' width={152} height={120} alt='bubble' className='mt-[150px] md:mt-[100px] md:ms-20' />
            </div>
          </div>
        </section>
        {/* Hero section end */}

        {/* Trending section start */}
        <section>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-blue mt-8 text-[14px] font-medium tracking-[4.2px]'>Trending</h1>
            <div className='flex justify-between items-center'>
              <h1 className='text-[#000] text-[24px] font-semibold'>Trending destinations</h1>
              <h1 className='text-blue text-[16px] fonts font-semibold'>View all</h1>
            </div>
            <Swiper
              spaceBetween={5}
              slidesPerView={2}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              modules={[Autoplay]}
            >
              {arrayImage.map((items) => (
                <SwiperSlide className='flex justify-between mt-5' key={items}>
                  <div
                    className={`flex flex-col w-[165px] md:w-[200px] h-[215px] md:h-[250px] rounded-[20px] ${
                      items % 2 === 0 ? `bg-[linear-gradient(180deg,_rgba(0,0,0,0.00)_0%,_#000_100%),url('/image/barcelona.png')]` : `bg-[linear-gradient(180deg,_rgba(0,0,0,0.00)_0%,_#000_100%),url('/image/tokyo.png')]`
                    } px-[20px] py-[15px]`}
                  >
                    <div className='w-[88px] h-[28px] px-[14px] py-[5px] rounded-[33px] bg-[rgba(255,255,255,0.41)]'>
                      <h1 className='text-white text-[12px] font-bold'>
                        {items % 2 === 0 ? '22' : '15'} <span className='text-white text-[12px] font-light'>Airlines</span>
                      </h1>
                    </div>
                    <div className='flex relative mt-[105px] md:mt-[135px]'>
                      <div className='flex flex-col'>
                        <h1 className='text-white text-[14px] font-semibold'>{items % 2 === 0 ? 'Barcelona' : 'Tokyo'},</h1>
                        <h1 className='text-white text-[24px] font-semibold'>{items % 2 === 0 ? 'Spain' : 'Japan'}</h1>
                      </div>
                      <img src='/icon/more.svg' alt='more' className='absolute right-0 bottom-3' />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* Trending section end */}

        {/* Top destinations start */}
        <section className='mb-[150px]'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[150px]'>
            <div className='flex flex-col bg-blue rounded-[60px] items-center relative'>
              <h1 className='text-[14px] text-white tracking-[4.2px] font-medium mt-[67px]'>Top 10</h1>
              <h1 className='text-[24px] text-white font-semibold mt-[28px]'>Top 10 destinations</h1>
              <Swiper
                spaceBetween={5}
                slidesPerView={2}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                modules={[Autoplay]}
                className='flex justify-between w-full mt-[45px]'
              >
                {arrayImageTop.map((items) => (
                  <div key={Math.random()}>
                    <SwiperSlide className='flex flex-col' key={Math.random()}>
                      <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-center rounded-full w-[150px] h-[150px] md:w-[180px] md:h-[180px] border-[5px] border-white border-solid'>
                          <img src='/image/paris.png' className='w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full' alt='' />
                        </div>
                        <h1 className='text-[18px] font-normal text-white mt-5'>PARIS</h1>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className='flex flex-col' key={Math.random()}>
                      <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-center rounded-full w-[150px] h-[150px] md:w-[180px] md:h-[180px] border-[5px] border-white border-solid'>
                          <img src='/image/bali.png' className='w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full' alt='' />
                        </div>
                        <h1 className='text-[18px] font-normal text-white mt-5'>BALI</h1>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className='flex flex-col' key={Math.random()}>
                      <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-center rounded-full w-[150px] h-[150px] md:w-[180px] md:h-[180px] border-[5px] border-white border-solid'>
                          <img src='/image/singapore.png' className='w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full' alt='' />
                        </div>
                        <h1 className='text-[18px] font-normal text-white mt-5'>SINGAPORE</h1>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className='flex flex-col' key={Math.random()}>
                      <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-center rounded-full w-[150px] h-[150px] md:w-[180px] md:h-[180px] border-[5px] border-white border-solid'>
                          <img src='/image/agra.png' className='w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full' alt='' />
                        </div>
                        <h1 className='text-[18px] font-normal text-white mt-5'>AGRA</h1>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className='flex flex-col' key={Math.random()}>
                      <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-center rounded-full w-[150px] h-[150px] md:w-[180px] md:h-[180px] border-[5px] border-white border-solid'>
                          <img src='/image/sydney.png' className='w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full' alt='' />
                        </div>
                        <h1 className='text-[18px] font-normal text-white mt-5'>SYDNEY</h1>
                      </div>
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
              <div className='flex justify-center mt-[45px] gap-x-[50px] mb-[67px] z-10'>
                <button className={`flex items-center justify-center w-[70px] h-[50px] rounded-md border border-solid border-white ${nextOrPrev === 'prev' ? 'bg-white' : null}`} onClick={() => setNextOrPrev('prev')}>
                  <img src={`${nextOrPrev === 'prev' ? '/icon/arrow-back-blue.svg' : '/icon/arrow-back.svg'}`} alt='arrow' />
                </button>
                <button className={`flex items-center justify-center w-[70px] h-[50px] rounded-md border border-solid border-white ${nextOrPrev === 'next' ? 'bg-white' : null}`} onClick={() => setNextOrPrev('next')}>
                  <img src={`${nextOrPrev === 'next' ? '/icon/arrow-right.svg' : '/icon/arrow-right-white.svg'}`} width={14} height={14} alt='arrow' />
                </button>
              </div>
              <img src='/image/plane.png' alt='plane' className='absolute left-0 bottom-0' />
            </div>
          </div>
        </section>
        {/* Top destinations end */}
      </div>
      <Footer />
    </main>
  );
}
