"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export type SelectOption = { value: string; label: string };

type SelectFieldProps = {
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  options: SelectOption[];
  defaultValue?: SelectOption;
  mode?: "multiple" | "tags";
  allowClear?: boolean;
  handleChange?: (e: string) => void;
};

const FormSelectField = ({
  name,
  size,
  value,
  placeholder,
  label,
  options,
  defaultValue,
  mode,
  allowClear = false,
  handleChange,
}: SelectFieldProps) => {
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
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={handleChange ? handleChange : onChange}
            value={value}
            size={size}
            placeholder={placeholder}
            options={options}
            mode={mode}
            allowClear={allowClear}
            style={{
              width: "100%",
            }}
          />
        )}
      />

      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormSelectField;
