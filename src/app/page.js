import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className='h-screen pt-20'>Landing Page</h1>
      <Footer />
    </main>
  );
}
