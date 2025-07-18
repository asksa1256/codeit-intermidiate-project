import { Field, Label, Input } from "@headlessui/react";
import InputComponent from "@/components/ui/Input";

const LoginForm = () => {
  return (
    <form action="">
      <Field>
        <Label>아이디</Label>
        <InputComponent name="full_name" type="text" />
      </Field>
    </form>
  );
};

export default LoginForm;
