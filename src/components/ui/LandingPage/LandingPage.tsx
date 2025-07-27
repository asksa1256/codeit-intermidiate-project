import Image from 'next/image';
import ButtonDefault from '../ButtonDefault';

const LandingPage = () => {
  return (
    <div>
      <Image src='/images/Landing_page_01.png' alt='한눈에 둘러보는 키보드 리뷰' width={1140} height={535} />
      <Image src='/images/Landing_page_02.png' alt='한눈에 둘러보는 키보드 리뷰' width={700} height={1152} />
      <ButtonDefault className='w-[293px] h-[50px]'>키보드 보러가기</ButtonDefault>
    </div>
  )
}

export default LandingPage
