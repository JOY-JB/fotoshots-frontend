"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IFormDatePicker {
  name: string;
  size?: "large" | "small";
  value?: Dayjs;
  label?: string;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
}

const FormDatePicker = ({
  name,
  size,
  value,
  label,
  picker = "date",
  onChange,
}: IFormDatePicker) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [date, setDate] = useState(undefined);

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;

    setValue(name, date);
  };

  let errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label ? label : null}

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          if (field.value) {
            setDate(field.value);
          }

          return (
            <DatePicker
              size={size}
              value={dayjs(date)}
              onChange={handleOnChange}
              style={{
                width: "100%",
              }}
              picker={picker}
            />
          );
        }}
      />

      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormDatePicker;
