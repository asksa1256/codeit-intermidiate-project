'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import KeyboardForm, { KeyboardFormValues } from '@/components/feature/Form/KeyboardForm';
import Modal from '@/components/feature/Modal';
import MyKeyboardList from '@/components/feature/myProfile/MyKeyboardList';
import MyListLoading from '@/components/feature/myProfile/MyListLoading';
import ButtonDefault from '@/components/ui/ButtonDefault';
import EmptyList from '@/components/ui/EmptyList';
import { KEYBOARD_TYPES_MAP } from '@/constants';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { apiClient } from '@/lib/api/apiClient';
import useToastStore from '@/stores/toastStore';
import { MyKeyboardItemType, MyKeyboardListType } from '@/types/keyboardTypes';
import { cn } from '@/utils/style';

const TEAM = process.env.NEXT_PUBLIC_TEAM;
const DEFAULT_LIMIT = 10;

const fetchKeyboardList = async (cursor: number | null): Promise<MyKeyboardListType> => {
  const res = await apiClient.get(
    `/${TEAM}/users/me/wines?limit=${DEFAULT_LIMIT}&cursor=${cursor}`,
  );
  return res.data;
};

const MyKeyboardArea = () => {
  const addToast = useToastStore((state) => state.addToast);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardList, setKeyboardList] = useState<MyKeyboardItemType[] | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cursor, setCursor] = useState<number | null>(0);
  const isListEmpty = keyboardList?.length === 0;

  const getKeyboardList = async () => {
    if (cursor === null) return;

    try {
      const data = await fetchKeyboardList(cursor);
      const { list, nextCursor, totalCount } = data;

      setKeyboardList((prev) => (prev === null ? list : [...prev, ...list]));
      setTotalCount(totalCount);
      setCursor(nextCursor);
    } catch (error) {
      console.error(error);
    }
  };

  const targetRef = useIntersectionObserver(getKeyboardList);

  useEffect(() => {
    getKeyboardList();
  }, []);

  const handleDeleteKeyboard = async (keyboardId: number) => {
    try {
      await apiClient.delete(`/${TEAM}/wines/${keyboardId}`);

      setKeyboardList((prev) => {
        if (prev === null) return prev;
        return prev.filter((keyboard) => keyboard.id !== keyboardId);
      });
      setTotalCount((totalCount) => totalCount - 1);
      addToast({ message: '키보드 삭제 성공', type: 'success', duration: 2000 });
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 403) {
        addToast({
          message: '본인이 추가한 키보드만 삭제 가능합니다.',
          type: 'error',
          duration: 2000,
        });
        return;
      }
      addToast({ message: '키보드 삭제 실패', type: 'error', duration: 2000 });
      throw error;
    }
  };

  const handleEditKeyboard = async (keyboardId: number, values: KeyboardFormValues) => {
    const updateBody = { ...values, price: Number(values.price) };
    try {
      const res = await apiClient.patch(`/${TEAM}/wines/${keyboardId}`, updateBody);

      const { id, name, region, image, price, type, avgRating, reviewCount, userId } = res.data;

      const updateData = {
        id,
        name,
        region,
        image,
        price,
        type,
        avgRating,
        reviewCount,
        userId,
      };

      setKeyboardList((prev) => {
        if (prev === null) return prev;
        return prev.map((keyboard) =>
          keyboard.id === keyboardId ? { ...keyboard, ...updateData } : keyboard,
        );
      });
      addToast({ message: '키보드 수정 성공', type: 'success', duration: 2000 });
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 403) {
        addToast({
          message: '본인이 추가한 키보드만 수정 가능합니다.',
          type: 'error',
          duration: 2000,
        });
        return;
      }
      addToast({ message: '키보드 수정 실패', type: 'error', duration: 2000 });
      throw error;
    }
  };

  const handleAddKeyboard = async (formData: KeyboardFormValues) => {
    const payload = {
      ...formData,
      price: +formData.price,
      type: formData.type ?? KEYBOARD_TYPES_MAP[0].type,
    };
    // 키보드 등록 api
    try {
      const res = await apiClient.post(`/${TEAM}/wines`, payload);
      const data = res?.data;

      setKeyboardList((prev) => (prev === null ? [data] : [...prev, data]));
      setTotalCount((totalCount) => totalCount + 1);
      handleKeyboardModalClose();
      addToast({ message: '키보드 등록 성공', type: 'success', duration: 2000 });
    } catch (err) {
      addToast({ message: '키보드 등록 실패', type: 'error', duration: 2000 });
      throw err; // 폼에 에러 전달
    }
  };

  const handleKeyboardModalOpen = () => setKeyboardOpen(true);
  const handleKeyboardModalClose = () => setKeyboardOpen(false);

  // 데이터 로딩시
  if (keyboardList === null) return <MyListLoading />;

  return (
    <>
      <span className='absolute bottom-[calc(100%+16px)] right-0 text-xs text-primary leading-[26px] md:text-md md:leading-[32px] md:bottom-[calc(100%+22px)]'>
        총 {totalCount}개
      </span>
      {isListEmpty ? (
        <EmptyList desc='등록된 키보드가 없어요.'>
          <ButtonDefault
            onClick={handleKeyboardModalOpen}
            className='inline-flex items-center justify-center px-[15px] w-auto h-[48px] font-semibold text-white bg-primary rounded-xl md:px-[24px]'
          >
            키보드 등록 하기
          </ButtonDefault>
        </EmptyList>
      ) : (
        <>
          <ButtonDefault
            onClick={handleKeyboardModalOpen}
            className={cn(
              'fixed bottom-5 left-5 flex items-center justify-center w-[48px] h-[48px] z-1 rounded-full p-[2px] overflow-hidden bg-transparent',
              'before:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500 before:animate-spin before:duration-[10000ms]',
              'md:w-[56px] md:h-[56px]',
              'lg:static lg:flex lg:w-auto lg:ml-auto lg:mb-5 lg:h-12 lg:rounded-xl lg:px-[15px] lg:bg-primary',
              'lg:before:hidden',
            )}
          >
            <span className='relative block w-full h-full font-semibold text-white bg-[url(/images/KeyboardReviewIcon.svg)] bg-no-repeat bg-center -indent-[9999em] bg-size-[85%] bg-white rounded-full lg:w-auto lg:h-auto lg:indent-0 lg:bg-none lg:bg-transparent'>
              키보드 등록 하기
            </span>
          </ButtonDefault>
          <MyKeyboardList
            keyboardList={keyboardList}
            onDelete={handleDeleteKeyboard}
            onEdit={handleEditKeyboard}
            endRef={targetRef}
            hasNextPage={keyboardList.length !== totalCount && cursor !== null}
          />
        </>
      )}

      <Modal
        open={keyboardOpen}
        onClose={handleKeyboardModalClose}
        title='키보드 등록'
        showCloseButton={true}
      >
        <KeyboardForm onSubmit={handleAddKeyboard} onClose={() => setKeyboardOpen(false)} />
      </Modal>
    </>
  );
};

export default MyKeyboardArea;
