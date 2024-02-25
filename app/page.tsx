import { Navbar } from '@/components/navbar';
import { CardList } from '@/components/cardList';
import { Footer } from '@/components/footer';

export default function Page() {
  return (
    <div className='bg-white'>
      <Navbar />
      <div className='gap-2 min-h-screen px10 mx-9'>
      <div className='text-3xl text-gray-800 py-5 mt-12 mb-6'>개발 블로그</div>
      <CardList />
      </div>
      <Footer />
    </div>
  )
}