import MyKeyboardItem from '@/components/feature/myProfile/MyKeyboardItem';

type KeyboardColorType =
  | 'CHERRY'
  | 'BERRY'
  | 'OAK'
  | 'VANILLA'
  | 'PEPPER'
  | 'BAKING'
  | 'GRASS'
  | 'APPLE'
  | 'PEACH'
  | 'CITRUS'
  | 'TROPICAL'
  | 'MINERAL'
  | 'FLOWER'
  | 'TOBACCO'
  | 'EARTH'
  | 'CHOCOLATE'
  | 'SPICE'
  | 'CARAMEL'
  | 'LEATHER';
type KeyboardCategoryType = 'RED' | 'WHITE' | 'SPARKLING';

interface KeyboardItemType {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: KeyboardCategoryType;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: KeyboardColorType[];
    rating: number;
    id: number;
  } | null;
  userId: number;
}

interface KeyboardListType {
  list: KeyboardItemType[];
  totalCount: number;
  nextCursor: number | null;
}

const keyboadsData: KeyboardListType = {
  list: [
    {
      id: 1345,
      name: '키크론 V10 MAX 유무선 앨리스 키보드',
      region: '키크론',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074281491/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C0_%C3%AD%C2%82%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A1%C2%A0%C3%AC%C2%95%C2%A8%C3%AB%C2%A6%C2%AC%C3%AC%C2%8A%C2%A4.png',
      price: 169000,
      type: 'RED',
      avgRating: 3.83,
      reviewCount: 0,
      recentReview: null,
      userId: 1642,
    },
    {
      id: 1346,
      name: '지클릭커 오피스프로 사일런스 M RGB 유선 키보드 Greenwich',
      region: '키크론',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074356585/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C1_%C3%AC%C2%A7%C2%80%C3%AD%C2%81%C2%B4%C3%AB%C2%A6%C2%AD%C3%AC%C2%BB%C2%A4_greenwich.png',
      price: 139000,
      type: 'RED',
      avgRating: 0,
      reviewCount: 0,
      recentReview: null,
      userId: 1642,
    },
    {
      id: 1347,
      name: '지클릭커 오피스프로 사일런스 M RGB 유선 키보드 Skycity',
      region: '지클릭커',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074366356/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C2_%C3%AC%C2%A7%C2%80%C3%AD%C2%81%C2%B4%C3%AB%C2%A6%C2%AD%C3%AC%C2%BB%C2%A4_skycity.png',
      price: 21400,
      type: 'WHITE',
      avgRating: 0,
      reviewCount: 0,
      recentReview: null,
      userId: 1642,
    },
    {
      id: 1348,
      name: '지클릭커 오피스프로 사일런스 M RGB 유선 키보드 Gundam',
      region: '지클릭커',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074378920/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C3_%C3%AC%C2%A7%C2%80%C3%AD%C2%81%C2%B4%C3%AB%C2%A6%C2%AD%C3%AC%C2%BB%C2%A4_gundam.png',
      price: 21400,
      type: 'WHITE',
      avgRating: 0,
      reviewCount: 0,
      recentReview: null,
      userId: 1642,
    },
    {
      id: 1351,
      name: '지클릭커 오피스프로 사일런스 M RGB 유선 키보드 Poker',
      region: '지클릭커',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074419585/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C4_%C3%AC%C2%A7%C2%80%C3%AD%C2%81%C2%B4%C3%AB%C2%A6%C2%AD%C3%AC%C2%BB%C2%A4_poker.png',
      price: 21400,
      type: 'WHITE',
      avgRating: 4,
      reviewCount: 0,
      recentReview: null,
      userId: 1642,
    },
    {
      id: 1352,
      name: '지클릭커 오피스프로 사일런스 M RGB 유선 키보드 Pink',
      region: '지클릭커',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074430743/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C5_%C3%AC%C2%A7%C2%80%C3%AD%C2%81%C2%B4%C3%AB%C2%A6%C2%AD%C3%AC%C2%BB%C2%A4_pink.png',
      price: 21400,
      type: 'WHITE',
      avgRating: 0,
      reviewCount: 0,
      recentReview: null,
      userId: 1642,
    },
    {
      id: 1353,
      name: '로지텍 무선키보드 마우스 세트',
      region: '로지텍',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074468525/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C9_%C3%AB%C2%A1%C2%9C%C3%AC%C2%A7%C2%80%C3%AD%C2%85%C2%8D%C3%AB%C2%AC%C2%B4%C3%AC%C2%84%C2%A0.png',
      price: 21400,
      type: 'SPARKLING',
      avgRating: 3.25,
      reviewCount: 0,
      recentReview: null,
      userId: 1642,
    },
    {
      id: 1354,
      name: '키크론 K10 Pro SE2 RGB 기계식 핫스왑 유무선 일반형 키보드',
      region: '키크론',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074480746/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C10_%C3%AD%C2%82%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A1%C2%A0K10.png',
      price: 139000,
      type: 'RED',
      avgRating: 0,
      reviewCount: 0,
      recentReview: null,
      userId: 1642,
    },
    {
      id: 1355,
      name: '키크론 C2 Pro 8K RGB 핫스왑 유선 기계식 키보드',
      region: '키크론',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1642/1753074489256/%C3%AD%C2%82%C2%A4%C3%AB%C2%B3%C2%B4%C3%AB%C2%93%C2%9C11_%C3%AD%C2%82%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A1%C2%A0C2.png',
      price: 89000,
      type: 'RED',
      avgRating: 0,
      reviewCount: 0,
      recentReview: null,
      userId: 1642,
    },
  ],
  totalCount: 9,
  nextCursor: null,
};

const MyKeyboardList = () => {
  return (
    <>
      <span className='absolute bottom-[calc(100%+16px)] right-0 text-xs text-primary leading-[26px] md:text-md md:leading-[32px] md:bottom-[calc(100%+22px)]'>
        총 {keyboadsData.totalCount}개
      </span>
      <ul>
        {keyboadsData.list.map((keyboard) => (
          <MyKeyboardItem key={keyboard.id} keyboard={keyboard} />
        ))}
      </ul>
    </>
  );
};

export default MyKeyboardList;
