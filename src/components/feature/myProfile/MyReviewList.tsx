import MyReviewItem from '@/components/feature/myProfile/MyReviewItem';
import { MyReviewListType } from '@/types/reviewTypes';

const reviewsData: MyReviewListType = {
  list: [
    {
      id: 3054,
      rating: 2,
      lightBold: 6,
      smoothTannic: 8,
      drySweet: 4,
      softAcidic: 5,
      aroma: ['CHERRY'],
      content: '저한테는 너무 맞지 않네요...',
      createdAt: '2025-07-21T06:02:06.037Z',
      updatedAt: '2025-07-21T06:02:06.037Z',
      user: {
        id: 1642,
        nickname: '테스트163',
        image: null,
      },
      wine: {
        id: 1345,
        name: '키크론 V10 MAX 유무선 앨리스 키보드',
        region: '키크론',
        image:
          '<https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074281491/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C0_%C3%AD%C2%82%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A1%C2%A0%C3%AC%C2%95%C2%A8%C3%AB%C2%A6%C2%AC%C3%AC%C2%8A%C2%A4.png>',
        price: 169000,
        avgRating: 3.833333333333333,
        type: 'RED',
      },
    },
    {
      id: 3055,
      rating: 5,
      lightBold: 6,
      smoothTannic: 8,
      drySweet: 4,
      softAcidic: 5,
      aroma: ['CHERRY'],
      content: '적응만 되면 최고의 키보드!!! 키감이 쫀득하고 소리가 너무 좋아요!!!!',
      createdAt: '2025-07-21T06:02:23.888Z',
      updatedAt: '2025-07-21T06:02:23.888Z',
      user: {
        id: 1642,
        nickname: '테스트163',
        image: null,
      },
      wine: {
        id: 1345,
        name: '키크론 V10 MAX 유무선 앨리스 키보드',
        region: '키크론',
        image:
          '<https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074281491/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C0_%C3%AD%C2%82%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A1%C2%A0%C3%AC%C2%95%C2%A8%C3%AB%C2%A6%C2%AC%C3%AC%C2%8A%C2%A4.png>',
        price: 169000,
        avgRating: 3.833333333333333,
        type: 'RED',
      },
    },
    {
      id: 3056,
      rating: 5,
      lightBold: 6,
      smoothTannic: 8,
      drySweet: 4,
      softAcidic: 5,
      aroma: ['BAKING', 'TOBACCO'],
      content: '적응만 되면 최고의 키보드!!! 키감이 쫀득하고 소리가 너무 좋아요!!!!',
      createdAt: '2025-07-21T06:05:22.047Z',
      updatedAt: '2025-07-21T06:05:22.047Z',
      user: {
        id: 1642,
        nickname: '테스트163',
        image: null,
      },
      wine: {
        id: 1345,
        name: '키크론 V10 MAX 유무선 앨리스 키보드',
        region: '키크론',
        image:
          '<https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074281491/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C0_%C3%AD%C2%82%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A1%C2%A0%C3%AC%C2%95%C2%A8%C3%AB%C2%A6%C2%AC%C3%AC%C2%8A%C2%A4.png>',
        price: 169000,
        avgRating: 3.833333333333333,
        type: 'RED',
      },
    },
    {
      id: 3057,
      rating: 4,
      lightBold: 5,
      smoothTannic: 6,
      drySweet: 7,
      softAcidic: 8,
      aroma: ['CHERRY'],
      content: '손목이 너무 아파서 구매했습니다. 잘 맞았으면 좋겠네요. 키감은 만족합니다.',
      createdAt: '2025-07-21T06:17:12.701Z',
      updatedAt: '2025-07-21T06:17:12.701Z',
      user: {
        id: 1642,
        nickname: '테스트163',
        image: null,
      },
      wine: {
        id: 1345,
        name: '키크론 V10 MAX 유무선 앨리스 키보드',
        region: '키크론',
        image:
          '<https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074281491/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C0_%C3%AD%C2%82%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A1%C2%A0%C3%AC%C2%95%C2%A8%C3%AB%C2%A6%C2%AC%C3%AC%C2%8A%C2%A4.png>',
        price: 169000,
        avgRating: 3.833333333333333,
        type: 'RED',
      },
    },
    {
      id: 3058,
      rating: 4,
      lightBold: 5,
      smoothTannic: 6,
      drySweet: 7,
      softAcidic: 8,
      aroma: ['BERRY'],
      content:
        '트렌드라고 하길래 구매했어용! 배열이 진짜 신기하게 생겼네용! LED도 있고 화려해서 마음에 들어용! 잘쓸께용^^!',
      createdAt: '2025-07-21T06:18:41.851Z',
      updatedAt: '2025-07-21T06:18:41.851Z',
      user: {
        id: 1642,
        nickname: '테스트163',
        image: null,
      },
      wine: {
        id: 1345,
        name: '키크론 V10 MAX 유무선 앨리스 키보드',
        region: '키크론',
        image:
          '<https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074281491/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C0_%C3%AD%C2%82%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A1%C2%A0%C3%AC%C2%95%C2%A8%C3%AB%C2%A6%C2%AC%C3%AC%C2%8A%C2%A4.png>',
        price: 169000,
        avgRating: 3.833333333333333,
        type: 'RED',
      },
    },
  ],
  totalCount: 24,
  nextCursor: 3058,
};

const MyReviewList = () => {
  return (
    <>
      <span className='absolute bottom-[calc(100%+16px)] right-0 text-xs text-primary leading-[26px] md:text-md md:leading-[32px] md:bottom-[calc(100%+22px)]'>
        총 {reviewsData.totalCount}개
      </span>
      <ul>
        {reviewsData.list.map((review) => (
          <MyReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
};

export default MyReviewList;
