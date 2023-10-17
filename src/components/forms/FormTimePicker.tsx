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
        render={({ field }) => {
          return (
            <TimePicker
              size={size}
              // defaultValue={dayjs("00:00", "HH:mm")}
              value={dayjs(field.value)}
              format={"h:mm a"}
              onChange={(el, value) => {
                // setValue(name, dayjs(el).format("YYYY-MM-DDTHH:mm:ss"));
                setValue(name, dayjs(el));
              }}
              style={{
                width: "100%",
              }}
            />
          );
        }}
      />

      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormTimePicker;
