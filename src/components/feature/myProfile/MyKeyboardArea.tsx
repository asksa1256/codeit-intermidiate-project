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
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 403) {
        alert('삭제 권한이 없습니다.');
        return;
      }

      alert('키보드 삭제에 실패 하였습니다.');
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
    } catch (error) {
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
      addToast({ message: '키보드 등록 성공!', type: 'success', duration: 2000 });
    } catch (err) {
      alert('키보드 등록에 실패하였습니다.');
      addToast({ message: '키보드 등록 실패...💀', type: 'error', duration: 2000 });
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
        <MyKeyboardList
          keyboardList={keyboardList}
          onDelete={handleDeleteKeyboard}
          onEdit={handleEditKeyboard}
          endRef={targetRef}
          hasNextPage={keyboardList.length !== totalCount}
        />
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
