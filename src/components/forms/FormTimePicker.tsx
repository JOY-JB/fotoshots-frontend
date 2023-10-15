"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

interface IFormDatePicker {
  name: string;
  size?: "large" | "small";
  value?: Dayjs;
  label?: string;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
}

const FormTimePicker = ({ name, size, label }: IFormDatePicker) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  let errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label ? label : null}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TimePicker
            size={size}
            defaultValue={dayjs(field.value ? field.value : "00:00", "HH:mm")}
            format={"HH:mm"}
            onChange={(el, value) => {
              setValue(name, value);
            }}
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

export default FormTimePicker;
