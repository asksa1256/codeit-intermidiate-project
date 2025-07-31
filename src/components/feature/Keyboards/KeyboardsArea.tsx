'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import FilterModalBack from '@/components/feature/Keyboards/Filter/FilterModalBack';
import Modal from '@/components/feature/Modal';
import ButtonDefault from '@/components/ui/ButtonDefault';
import KeyboardThumbnail from '@/components/ui/KeyboardThumbnail';
import RatingAndPrice from '@/components/ui/RatingAndPrice';
import StarRating from '@/components/ui/StarRating';

const KeyboardsArea = () => {
  const [isFilterModal, setIsFilterModal] = useState(false); // 필터 모달
  const [isKeyboardModal, setIsKeyboardModal] = useState(false); // 키보드 등록 모달

  // 아마 여기서 리스트 api

  return (
    <div>
      {/* 검색 영역 :: S */}
      <div className='flex gap-4 mt-5'>
        {/* FilterOpenButton :: S */}
        <button
          type='button'
          className='w-[38px] border border-gray-300 aspect-square rounded-lg shrink-0 grow-0 basis-auto md:w-12 lg:hidden'
          onClick={() => {
            setIsFilterModal(true);
          }}
        >
          <Image
            src='/images/FilterIcon.svg'
            alt='필터 열기'
            width={22}
            height={22}
            className='w-[22px] h-[22px] m-auto md:w-[26px] md:h-[26px]'
          />
        </button>

        <input
          type='text'
          name='name' // 검색 쿼리스트링 스웨거 스키마
          placeholder='키보드를 검색해 보세요'
          className='h-[38px] border border-gray-300 rounded-[50px] grow-1 pl-[45px] pr-[15px] bg-[url(/images/SearchIcon.svg)] bg-position-[center_left_15px] bg-no-repeat text-md outline-none focus:ring-2 focus:ring-primary hover:border-primary md:h-12 md:pl-[55px] md:pr-5 md:bg-position-[center_left_20px] md:text-base lg:max-w-200 lg:ml-auto'
        />

        {/* 키보드 등록하기 버튼 :: S */}
        <ButtonDefault
          onClick={() => setIsKeyboardModal(true)}
          className='fixed bottom-[35px] left-4 right-4 w-auto h-12 text-md font-bold rounded-xl z-10 md:static md:w-[220px] md:rounded-2xl md:text-base md:shrink-0 md:z-auto lg:hidden'
        >
          키보드 등록하기
        </ButtonDefault>
        {/* 키보드 등록하기 버튼 :: E */}
      </div>
      {/* 검색 영역 :: E */}

      {/* 하단 영역 :: S */}
      <div className='flex items-start gap-10 mt-6'>
        {/* 필터 영역 :: S */}
        <FilterModalBack open={isFilterModal} onClose={setIsFilterModal} />
        {/* 필터 영역 :: E */}
        {/* 리스트 영역 :: S */}
        <div className='grow-1'>
          {/* 키보드 카드 영역 :: S */}
          <Link
            href={`/keyboards/1345`}
            className='block mb-5 border border-gray-300 rounded-xl md:rounded-2xl'
          >
            <div className='flex'>
              {/* 이미지 */}
              <div className='w-[126px] px-3 shrink-0 self-center md:w-[160px] md:pl-0 md:self-end lg:w-[168px]'>
                <KeyboardThumbnail
                  imgSrc='https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1643/1753845442347/image_1753845442269.png'
                  keyboardName='Office Master 3모드 저소음 펜타그래프 유무선겸용 일반형 키보드'
                  className='pt-[200%] md:w-[60%] md:ml-10 md:pt-[180%] lg:ml-12'
                  ratioClass='w-[200%] aspect-[200/100] md:w-[250%] md:aspect-[250/100]'
                />
              </div>
              {/* 컨텐츠 */}
              <div className='pt-[30px] pr-5 pb-7 grow md:flex md:gap-[45px] md:pt-10 md:pr-10 md:pb-6 lg:pt-9 lg:pr-[53px] lg:pb-6 lg:gap-[70px]'>
                {/* 컨텐츠 상단 */}
                <div>
                  {/* 키보드명 */}
                  <h3 className='text-xl font-semibold line-clamp-2 md:mb-5 md:text-3xl'>
                    Office Master 3모드 저소음 펜타그래프 유무선겸용 일반형 키보드
                  </h3>
                  {/* 제조사 */}
                  <span className='block mb-2 text-md text-gray-500 md:mb-3 md:text-base lg:mb-4'>
                    한성컴퓨터
                  </span>
                  {/* 가격 */}
                  <RatingAndPrice
                    label='price'
                    value={64990}
                    className='rounded-[10px] py-[2.5px] px-[10px] md:rounded-xl md:py-[8px] md:px-[15px]'
                  />
                </div>
                {/* 컨텐츠 하단 */}
                <div className='flex items-center gap-[15px] mt-[22px] md:shrink-0 md:flex-col md:items-start md:mt-0 md:gap-[10px]'>
                  {/* 평점 숫자 */}
                  <strong className='text-[28px] font-extrabold md:text-5xl'>4.8</strong>
                  <div className='md:mb-[10px]'>
                    {/* 별점 5개 */}
                    <StarRating value={4} className='w-[14px] md:w-6' />
                    {/* 리뷰 개수 */}
                    <div className='mt-[5px] text-xs text-gray-500 md:mt-[10px] md:text-md'>
                      47개의 후기
                    </div>
                  </div>
                  {/* 오른쪽: 화살표 아이콘 */}
                  <Image
                    src='/images/RightArrowIcon.svg'
                    alt='오른쪽 이동'
                    width={32}
                    height={32}
                    className='ml-auto w-[32px] md:w-[36px] md:mt-auto'
                  />
                </div>
              </div>
            </div>
            <div className='border-t border-gray-300 py-[7px] px-5 text-md md:py-5 md:px-10 md:text-base lg:px-12'>
              {/* 최신 후기 있을 때 :: S */}
              <h4 className='mb-2 font-semibold'>최신 후기</h4>
              <p className='text-gray-500 line-clamp-3'>내용 내용 내용</p>
              {/* 최신 후기 있을 때 :: E */}

              {/* 최신 후기 없을 때 :: S*/}
              <p className='py-3 text-gray-600 text-center'>최신 후기가 없습니다.</p>
              {/* 최신 후기 없을 때 :: E*/}
            </div>
          </Link>
          {/* 키보드 카드 영역 :: E */}
          {/* 키보드 카드 영역 - 더미 :: S */}
          <Link
            href={`/keyboards/1345`}
            className='block mb-5 border border-gray-300 rounded-xl md:rounded-2xl'
          >
            <div className='flex'>
              {/* 이미지 */}
              <div className='w-[126px] px-3 shrink-0 self-center md:w-[160px] md:pl-0 md:self-end lg:w-[168px]'>
                <KeyboardThumbnail
                  imgSrc='https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1643/1753774074265/image_1753774074024.png'
                  keyboardName='몬스타기어 위캣6 앨리스 어고노믹 매크로 단축키 한손 조약돌 스플릿 블루투스 유무선 텐키리스 키보드'
                  className='pt-[200%] md:w-[60%] md:ml-10 md:pt-[180%] lg:ml-12'
                  ratioClass='w-[200%] aspect-[200/100] md:w-[250%] md:aspect-[250/100]'
                />
              </div>
              {/* 컨텐츠 */}
              <div className='pt-[30px] pr-5 pb-7 grow md:flex md:gap-[45px] md:pt-10 md:pr-10 md:pb-6 lg:pt-9 lg:pr-[53px] lg:pb-6 lg:gap-[70px]'>
                {/* 컨텐츠 상단 */}
                <div>
                  {/* 키보드명 */}
                  <h3 className='text-xl font-semibold line-clamp-2 md:mb-5 md:text-3xl'>
                    몬스타기어 위캣6 앨리스 어고노믹 매크로 단축키 한손 조약돌 스플릿 블루투스
                    유무선 텐키리스 키보드
                  </h3>
                  {/* 제조사 */}
                  <span className='block mb-2 text-md text-gray-500 md:mb-3 md:text-base lg:mb-4'>
                    몬스타기어
                  </span>
                  {/* 가격 */}
                  <RatingAndPrice
                    label='price'
                    value={162000}
                    className='rounded-[10px] py-[2.5px] px-[10px] md:rounded-xl md:py-[8px] md:px-[15px]'
                  />
                </div>
                {/* 컨텐츠 하단 */}
                <div className='flex items-center gap-[15px] mt-[22px] md:shrink-0 md:flex-col md:items-start md:mt-0 md:gap-[10px]'>
                  {/* 평점 숫자 */}
                  <strong className='text-[28px] font-extrabold md:text-5xl'>4.8</strong>
                  <div className='md:mb-[10px]'>
                    {/* 별점 5개 */}
                    <StarRating value={4} className='w-[14px] md:w-6' />
                    {/* 리뷰 개수 */}
                    <div className='mt-[5px] text-xs text-gray-500 md:mt-[10px] md:text-md'>
                      47개의 후기
                    </div>
                  </div>
                  {/* 오른쪽: 화살표 아이콘 */}
                  <Image
                    src='/images/RightArrowIcon.svg'
                    alt='오른쪽 이동'
                    width={32}
                    height={32}
                    className='ml-auto w-[32px] md:w-[36px] md:mt-auto'
                  />
                </div>
              </div>
            </div>
            <div className='border-t border-gray-300 py-[7px] px-5 text-md md:py-5 md:px-10 md:text-base lg:px-12'>
              {/* 최신 후기 있을 때 :: S */}
              <h4 className='mb-2 font-semibold'>최신 후기</h4>
              <p className='text-gray-500 line-clamp-3'>
                내용 내용 내용내용 내용 내용내용 내용 내용내용 내용 내용내용 내용 내용내용 내용
                내용내용 내용 내용내용 내용 내용내용 내용 내용내용 내용 내용내용 내용 내용내용 내용
                내용내용 내용 내용내용 내용 내용내용 내용 내용내용 내용 내용내용 내용 내용내용 내용
                내용내용 내용 내용내용 내용 내용내용 내용 내용내용 내용 내용
              </p>
              {/* 최신 후기 있을 때 :: E */}

              {/* 최신 후기 없을 때 :: S*/}
              <p className='py-3 text-gray-600 text-center'>최신 후기가 없습니다.</p>
              {/* 최신 후기 없을 때 :: E*/}
            </div>
          </Link>
          {/* 키보드 카드 영역 - 더미 :: E */}
        </div>
        {/* 리스트 영역 :: E */}
      </div>
      {/* 하단 영역 :: E */}

      {/* 키보드 등록하기 :: S */}
      <Modal open={isKeyboardModal} onClose={() => setIsKeyboardModal(false)}>
        여기에 키보드 등록하기 폼 모달 들어갈 예정
      </Modal>
      {/* 키보드 등록하기 :: E */}
    </div>
  );
};

export default KeyboardsArea;
