import BackgroundAuth from '@/app/components/BackgroundAuth';

export default function VerificationOtp() {
  return (
    <>
      <div className='max-w-[1366px] mx-auto flex items-center'>
        <BackgroundAuth />
        <div className='flex flex-col h-screen w-full md:w-[45%]'>
          <div className='flex gap-x-3 items-center w-[300px] mx-auto'>
            <img src='/icon/logo.svg' alt='logo' />
            <h1 className='text-[#414141] text-[24px] font-semibold'>Ankasa</h1>
          </div>
          <form className='my-auto mx-auto'>
            <div className='flex flex-col gap-y-7 w-[300px] my-auto mx-auto '>
              <h1 className='text-[#000] text-[35px] font-semibold'>Verification OTP</h1>
              <input type='email' className='outline-none focus:outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' placeholder='Email' />
              <input type='text' className='outline-none focus:outline-none border-b-[2px] focus:border-[#2395ff] text-[16px] font-normal text-primary p-3' placeholder='OTP' />
              <button href={'/auth/verification-otp'} className='bg-blue w-full py-3 flex justify-center text-white text-[18px] font-bold rounded-[10px]'>
                Verif
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
