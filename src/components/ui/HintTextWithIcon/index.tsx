interface Props {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const HintTextWithIcon = ({ text, icon: Icon }: Props) => {
  return (
    <p className='group hint-text'>
      <Icon className='info-icon' />
      {text}
    </p>
  );
};

export default HintTextWithIcon;
