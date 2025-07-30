import { Button } from '@headlessui/react';

import { cn } from '@/utils/style';
interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'button';
  rounded?: boolean;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconReverse?: boolean;
  disabled?: boolean;
}

const IconButton = ({
  type = 'button',
  rounded,
  icon: Icon,
  iconReverse,
  disabled = false,
  onClick,
  ...props
}: IconButtonProps) => {
  const IconButtonBase = `group flex items-center justify-center w-[48px] h-[48px] bg-white border border-gray-300 hover:bg-primary-10 hover:border-primary transition-all ${rounded ? 'rounded-full' : 'rounded-md'} ${disabled && 'opacity-0 invisible'}`;
  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn(IconButtonBase, props.className)}
      disabled={disabled}
      style={props.style}
    >
      <Icon
        className={`text-gray-500 group-hover:text-primary ${iconReverse ? 'rotate-y-180' : ''}`}
      />
    </Button>
  );
};

export default IconButton;
