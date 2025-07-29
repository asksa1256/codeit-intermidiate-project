'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

const getSnapShot = () => window.innerWidth;

const useWindowWidth = () => {
  return useSyncExternalStore(subscribe, getSnapShot);
};

export default useWindowWidth;
