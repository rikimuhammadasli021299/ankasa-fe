function Footer() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-wrap justify-between'>
        <div className='w-full md:w-1/2 flex'>
          <div className='flex w-1/2 md:w-2/3 ms-[11px] md:ms-0'>
            <div className='flex flex-col'>
              <div className='flex flex-wrap'>
                <img src='/icon/logo.svg' alt='logo' />
                <h1 className='text-[24px] text-[#414141] font-semibold text-primary ms-3'>Ankasa</h1>
              </div>
              <p className='text-secondary mt-3 text-[14px] font-normal leading-8'>Find your Flight and explore the world with us. We will take care of the rest</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 px-5'>
            <h1 className='text-[#000] mt-2 mb-3 text-[16px] font-medium block'>Features</h1>
            <p className='text-secondary text-[14px] font-normal'>Find Ticket</p>
            <p className='text-secondary text-[14px] font-normal'>My Booking</p>
            <p className='text-secondary text-[14px] font-normal'>Chat</p>
            <p className='text-secondary text-[14px] font-normal'>Notification</p>
          </div>
        </div>
        <div className='flex w-full md:w-1/2 md:justify-end'>
          <div className='flex w-1/2 md:w-2/3 flex-col'>
            <h1 className='text-[#000] mt-2 mb-3 text-[16px] font-medium ms-[11px]'>Download Angkasa App</h1>
            <img src='./image/download-app.png' alt='' width={200} height={60} />
          </div>
          <div className='flex flex-col ps-[32px] md:ps-0'>
            <h1 className='text-[#000] mt-2 mb-3 text-[16px] font-medium block'>Follow Us</h1>
            <div className='flex flex-wrap mt-2 gap-5'>
              <img src='./icon/facebook.svg' alt='facebook' />
              <img src='./icon/twitter.svg' alt='twitter' />
              <img src='./icon/instagram.svg' alt='instagram' />
              <img src='./icon/youtube.svg' alt='youtube' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-between flex-col md:flex-row mt-8'>
        <p className='text-secondary text-[14px] font-normal ms-3 md:ms-0'>© Ankasa. All Rights Reserved.</p>
        <div className='flex mt-3 mb-8 md:mt-0'>
          <img src='./icon/map-pin.svg' alt='location' className='ms-2 md:ms-0' />
          <p className='text-secondary text-[14px] font-normal ms-2'>Jakarta, Indonesia</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
