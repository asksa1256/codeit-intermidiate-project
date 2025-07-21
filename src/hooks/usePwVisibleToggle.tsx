import { useState } from 'react';

const usePwVisibleToggle = () => {
  const [isPwVisible, setIsPwVisible] = useState(false);

  return { isPwVisible, setIsPwVisible };
};

export default usePwVisibleToggle;
