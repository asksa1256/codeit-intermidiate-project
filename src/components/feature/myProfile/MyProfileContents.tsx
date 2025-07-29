import MyprofileMain from '@/components/feature/myProfile/MyprofileMain';
import MyprofileSidebar from '@/components/feature/myProfile/MyprofileSidebar';

const MyProfileContents = () => {
  return (
    <div className='flex flex-col gap-[30px] px-4 py-5 m-auto max-w-[1140px] md:gap-10 md:px-5 md:pt-4 md:pb-5 lg:flex-row lg:gap-15 lg:px-0 lg:py-[37px] lg:items-start'>
      <MyprofileSidebar />
      <MyprofileMain />
    </div>
  );
};

export default MyProfileContents;
