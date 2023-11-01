"use client";

import Form from "@/components/forms/Form";
import {
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { Button, Col, Row, message } from "antd";
import dayjs from "dayjs";
import FormDatePicker from "../forms/FormDatePicker";
import FormTimePicker from "../forms/FormTimePicker";

interface IProps {
  params: {
    id: string;
  };
}

const BookingEditPage = ({ params }: IProps) => {
  const { id } = params;
  const { data } = useGetBookingByIdQuery(id);
  const [updateBooking] = useUpdateBookingMutation();

  const defaultValues = {
    date: data?.date || "",
    startTime: data?.startTime || "",
    endTime: data?.endTime || "",
  };

  const onSubmit = async (data: any) => {
    const localTimezoneOffsetInMinutes = dayjs().utcOffset();
    data["endTime"] = dayjs(data.endTime)
      .subtract(localTimezoneOffsetInMinutes, "minute")
      .format("YYYY-MM-DDTHH:mm:ss[Z]");
    data["startTime"] = dayjs(data.startTime)
      .subtract(localTimezoneOffsetInMinutes, "minute")
      .format("YYYY-MM-DDTHH:mm:ss[Z]");

    try {
      const res = await updateBooking({ id, body: data }).unwrap();

      if (!!res) {
        message.success("Booking updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row
      justify={"center"}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={10}>
        <h1
          style={{
            marginBottom: "1rem",
          }}
        >
          Edit Booking
        </h1>
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <FormDatePicker name="date" label="Date" size="large" />
            <br />
            <br />
            <FormTimePicker name="startTime" label="Start Time" size="large" />
            <br />
            <br />
            <FormTimePicker name="endTime" label="End Time" size="large" />
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
            >
              Save Changes
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default BookingEditPage;
