export default function BackgroundAuth() {
  return (
    <div className='md:flex bg-blue h-screen items-center justify-center w-[55%] hidden'>
      <div className='flex relative justify-center'>
        <img src='/image/bubble-register.png' />
        <img src='/icon/logo-white.svg' alt='logo' className='w-[222px] h-[151px] self-center absolute left-[50px] top-[135px]' />
        <img src='/icon/logo-1.svg' alt='logo' className='absolute top-[10px] right-[145px]' />
        <img src='/icon/logo-2.svg' alt='logo' className='absolute top-[200px] right-[-15px]' />
        <img src='/icon/logo-3.svg' alt='logo' className='absolute top-[350px] left-[60px]' />
      </div>
    </div>
  );
}
