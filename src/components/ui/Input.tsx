import { Input } from "@headlessui/react";
interface InputProps {
  type?: string;
  value?: string;
  name: string;
}

const InputComponent = ({ type = "text", value, ...props }: InputProps) => {
  return <Input type={type} value={value} name={props.name} />;
};

export default InputComponent;
