import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import MyKeyboardArea from '@/components/feature/myProfile/MyKeyboardArea';
import MyReviewList from '@/components/feature/myProfile/MyReviewList';

const MYPAGE_MENUS = [
  { title: '내가 쓴 후기', component: MyReviewList },
  { title: '내가 등록한 키보드', component: MyKeyboardArea },
];

const MyprofileMain = () => {
  return (
    <div className='lg:grow'>
      <TabGroup defaultIndex={0}>
        <TabList className='flex gap-x-4 gap-y-1 flex-wrap mr-[50px] md:gap-x-8 md:gap-y-2 md:mr-[100px]'>
          {MYPAGE_MENUS.map(({ title }, idx) => (
            <Tab
              key={idx}
              className='text-lg font-bold text-gray-500 data-selected:text-gray-800 md:text-xl outline-none'
            >
              {title}
            </Tab>
          ))}
        </TabList>
        <TabPanels className='relative mt-4 md:mt-[22px]'>
          {MYPAGE_MENUS.map(({ component: Component }, idx) => (
            <TabPanel key={idx}>
              <Component />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default MyprofileMain;
