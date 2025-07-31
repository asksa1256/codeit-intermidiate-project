import Image from 'next/image';

import heroCardCenter from '../../../../public/images/HeroKeyboardCard1.png';
import heroCardLeft2 from '../../../../public/images/HeroKeyboardCardL2.png';
import heroCardLeft3 from '../../../../public/images/HeroKeyboardCardL3.png';
import heroCardRight2 from '../../../../public/images/HeroKeyboardCardR2.png';
import heroCardRight3 from '../../../../public/images/HeroKeyboardCardR3.png';

const HeroImage = () => {
  return (
    <>
      <Image
        className='absolute bottom-[-4%] md:bottom-0 left-[-126%] md:left-[-70.6%] lg:left-[-131%] md:w-40 lg:w-65'
        src={heroCardLeft3}
        alt='메인 페이지 키보드 카드 이미지'
        width={240}
        height={111}
      />
      <Image
        className='absolute bottom-[-4%] md:bottom-0 right-[-126%] md:right-[-70.6%] lg:right-[-131%] md:w-40 lg:w-65'
        src={heroCardRight3}
        alt='메인 페이지 키보드 카드 이미지'
        width={240}
        height={111}
      />
      <div>
        <Image
          className='absolute bottom-[-4%] md:bottom-0 left-[-64%] md:left-[-32%] lg:left-[-73%] md:w-40 lg:w-65'
          src={heroCardLeft2}
          alt='메인 페이지 키보드 카드 이미지'
          width={240}
          height={139}
        />
        <Image
          className='absolute bottom-[-4%] md:bottom-0 right-[-64%] md:right-[-32%] lg:right-[-73%] md:w-40 lg:w-65'
          src={heroCardRight2}
          alt='메인 페이지 키보드 카드 이미지'
          width={240}
          height={139}
        />
        <div>
          <Image
            className='absolute bottom-[-4%] md:bottom-0 left-[50%] translate-x-[-50%] md:w-40 lg:w-65'
            src={heroCardCenter}
            alt='메인 페이지 키보드 카드 이미지'
            width={240}
            height={185}
          />
        </div>
      </div>
    </>
  );
};

export default HeroImage;
