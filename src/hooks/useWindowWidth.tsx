'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

const getSnapShot = () => window.innerWidth;

// 서버에서 해당 훅을 읽을 때, useSyncExternalStore에 임의값을 미리 넘겨줘서 빌드 에러 방지
const getServerSnapshot = () => 0;

const useWindowWidth = () => {
  return useSyncExternalStore(subscribe, getSnapShot, getServerSnapshot);
};

export default useWindowWidth;
