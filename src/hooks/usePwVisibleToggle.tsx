import { useState } from 'react';

import EyeCloseIcon from '@/assets/icons/EyeCloseIcon.svg';
import EyeIcon from '@/assets/icons/EyeIcon.svg';

const usePwVisibleToggle = () => {
  const [isPwVisible, setIsPwVisible] = useState(false);

  const ToggleIcon = ({ isPwVisible }: { isPwVisible: boolean }) => {
    return isPwVisible ? (
      <EyeIcon className='input-icon-btn' />
    ) : (
      <EyeCloseIcon className='input-icon-btn' />
    );
  };

  return { isPwVisible, setIsPwVisible, ToggleIcon };
};

export default usePwVisibleToggle;
