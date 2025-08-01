'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

import ButtonDefault from '@/components/ui/ButtonDefault';
import HeroImage from '@/components/ui/LandingPage/HeroImage';
import LandingPageCard from '@/components/ui/LandingPage/LandingPageCard';

import descImg2 from '../../../public/images/DescriptionCard2.png';
import filterImg from '../../../public/images/LandingFilter.png';
import recommendImg1 from '../../../public/images/RecommendCard1.png';
import recommendImg2 from '../../../public/images/RecommendCard2.png';
import reviewCardImg from '../../../public/images/ReviewCard.png';

const Home = () => {
  const leftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <main className='bg-gray-100 lg:bg-white px-4 pt-[90px] md:pt-[114px] lg:pt-[178px] pb-16 -mt-[90px] md:-mt-[110px] overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <section className='overflow-hidden bg-[#171a21] rounded-2xl lg:max-w-285 h-101 lg:h-134 pt-14 md:pt-18 lg:pt-21 mx-auto'>
          <div className='relative w-65 h-full mx-auto'>
            <div className='flex flex-col items-center gap-6 lg:gap-3'>
              <Image src='images/logo.svg' alt='타닥 로고' width={120} height={38} />
              <h2 className='text-center text-gray-100 text-xl leading-[30px] md:text-3xl md:leading-12 font-semibold'>
                한눈에 둘러 보는
                <br />
                키보드 리뷰!
              </h2>
            </div>
            <HeroImage />
          </div>
        </section>
      </motion.div>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        variants={rightVariant}
      >
        <LandingPageCard
          title={'매달 새롭게 만나는\n키보드 추천 콘텐츠'}
          description={'매달 다양한 인기 키보드를 만나보세요.'}
          className='md:overflow-visible'
        >
          <div className='absolute bottom-6 md:bottom-0 right-0 bg-gray-100 md:bg-[#ebeef4] rounded-l-2xl pl-5 py-5 w-[289px] md:w-[356px] h-[241px] md:h-[277px]'>
            <div className='text-[#7e7e7e] md:text-lg font-bold leading-[100%] mb-5'>
              <motion.span
                whileInView={{
                  rotate: [0, 3, -3, 3, -3, 0],
                  transition: { duration: 1.2, delay: 0.9 },
                }}
                viewport={{ once: true }}
                style={{ display: 'inline-block' }}
              >
                이번 달 추천 키보드!
              </motion.span>
            </div>
            <div className='flex flex-nowrap gap-[10px]'>
              <Image
                className='shrink-0'
                src={recommendImg1}
                alt='추천 키보드 카드 이미지'
                width={193}
                height={160}
              />
              <Image
                className='shrink-0'
                src={recommendImg2}
                alt='추천 키보드 카드 이미지'
                width={193}
                height={160}
              />
            </div>
          </div>
        </LandingPageCard>
      </motion.div>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        variants={leftVariant}
      >
        <LandingPageCard
          title={'다양한 필터로 찾는\n내 맞춤 키보드'}
          description={'키보드 종류, 가격, 평점으로\n나에게 맞는 키보드를 쉽게 검색해요.'}
        >
          <Image
            className='absolute -right-2 md:-right-4 -bottom-2 md:-bottom-20 md:w-85'
            src={descImg2}
            alt='키보드 정보 카드 이미지'
            width={274}
            height={288}
          />
          <Image
            className='hidden md:block absolute bottom-0 left-0'
            src={filterImg}
            alt='상품 필터 이미지'
            width={186}
            height={128}
          />
        </LandingPageCard>
      </motion.div>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        variants={rightVariant}
      >
        <LandingPageCard
          title={'직관적인\n리뷰 시스템'}
          description={'더 구체화된 리뷰 시스템으로\n쉽고 빠르게 키보드 리뷰를 살펴보세요'}
        >
          <Image
            className='absolute -right-2 -bottom-28 md:-bottom-9'
            src={reviewCardImg}
            alt='리뷰 카드 이미지'
            width={272}
            height={412}
          />
        </LandingPageCard>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 100 }}
        whileInView={{
          y: 0,
        }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 12 }}
        viewport={{ once: true }}
      >
        <ButtonDefault href='/keyboards' className='w-70 h-12 rounded-[100px] mt-16 mx-auto'>
          키보드 보러가기
        </ButtonDefault>
      </motion.div>
    </main>
  );
};

export default Home;
