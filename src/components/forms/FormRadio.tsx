"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import type { RadioChangeEvent } from "antd";
import { Radio, Typography } from "antd";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const { Text } = Typography;

interface IInput {
  name: string;
  size?: "large" | "small";
  defaultValue?: string;
  id?: string;
  label?: string;
  items: {
    label: string;
    value: string;
  }[];
  onChange?: (e: RadioChangeEvent) => void;
}

const FormRadio = ({
  name,
  size,
  defaultValue,
  id,
  items,
  onChange,
  label,
}: IInput) => {
  const [showError, setShowError] = useState(true);
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  let errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleOnChange = (e: RadioChangeEvent) => {
    onChange ? onChange(e) : null;
    setValue(name, e.target.value);
    setShowError(false);
  };

  return (
    <div style={{ margin: "8px 0px" }}>
      {label ? (
        <Text strong style={{ marginRight: "20px" }}>
          {label}
        </Text>
      ) : null}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Radio.Group
            size={size}
            // defaultValue={defaultValue ? defaultValue : field.value}
            value={defaultValue ? defaultValue : field.value}
            onChange={handleOnChange}
          >
            {items.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        )}
      />

      {showError && <small style={{ color: "red" }}>{errorMessage}</small>}
    </div>
  );
};

export default FormRadio;
