"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type FormTextAreaProps = {
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  rows?: number;
};

const FormTextArea = ({
  name,
  size,
  value,
  placeholder,
  label,
  rows,
}: FormTextAreaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label ? label : null}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input.TextArea
            rows={rows ? rows : 4}
            size={size}
            {...field}
            value={value ? value : field.value}
            placeholder={placeholder}
          />
        )}
      />

      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormTextArea;
