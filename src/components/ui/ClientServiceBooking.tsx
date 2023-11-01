"use client";

import { useDebounce } from "@/hooks";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Input,
  Row,
  TimePicker,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import ActionBar from "./ActionBar";
import MyModal from "./MyModal";

const ClientServiceBooking = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { Text } = Typography;

  const query: Record<string, any> = {};

  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  minPrice !== 0 ? (query["minPrice"] = minPrice) : undefined;
  maxPrice !== 0 ? (query["maxPrice"] = maxPrice) : undefined;

  const { data } = useGetAllServicesQuery(query);

  const [CreateBooking] = useCreateBookingMutation();

  const services = data?.services || [];

  const handleOnClick = async (id: string) => {
    setIsBookingModalOpen(true);
    setSelectedServiceId(id);
  };

  const isNotEmpty = (value: string) => {
    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value.trim() !== ""
    );
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    const bookingData = {
      date: bookingDate,
      startTime: startTime,
      endTime: endTime,
      serviceId: selectedServiceId,
    };

    if (
      isNotEmpty(bookingData.date) &&
      isNotEmpty(bookingData.startTime) &&
      isNotEmpty(bookingData.endTime) &&
      isNotEmpty(bookingData.serviceId)
    ) {
      setIsBookingModalOpen(false);

      message.loading("Booking...");

      try {
        const res = await CreateBooking(bookingData);

        if (!!res) {
          message.success("Service Booked successfully.");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      message.error("Please fill in all the required fields.");
    }
  };

  const onDateChange: DatePickerProps["onChange"] = (el) => {
    const localTimezoneOffsetInMinutes = dayjs().utcOffset();

    const date = dayjs(el)
      .subtract(localTimezoneOffsetInMinutes, "minute")
      .format("YYYY-MM-DDTHH:mm:ss[Z]");

    setBookingDate(date);
  };

  const onTimeChange = (el: any) => {
    const localTimezoneOffsetInMinutes = dayjs().utcOffset();

    const startTime = dayjs(el[0])
      .subtract(localTimezoneOffsetInMinutes, "minute")
      .format("YYYY-MM-DDTHH:mm:ss[Z]");
    const endTime = dayjs(el[1])
      .subtract(localTimezoneOffsetInMinutes, "minute")
      .format("YYYY-MM-DDTHH:mm:ss[Z]");

    setStartTime(startTime);
    setEndTime(endTime);
  };

  const handleReset = () => {
    setSearchTerm("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  return (
    <>
      <div>
        <Divider />
        <ActionBar>
          <Input
            type="text"
            value={searchTerm}
            placeholder="Search.."
            style={{
              width: "20%",
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            suffix={<SearchOutlined />}
          />
          <div style={{ display: "flex" }}>
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(
                  Number(e.target.value) ? Number(e.target.value) : undefined
                )
              }
            />
            <Divider type="vertical" />
            <Input
              type="number"
              value={maxPrice}
              placeholder="Max Price"
              onChange={(e) =>
                setMaxPrice(
                  Number(e.target.value) ? Number(e.target.value) : undefined
                )
              }
            />
            <Divider type="vertical" />
            {(!!searchTerm || minPrice || maxPrice) && (
              <Button
                type="dashed"
                style={{ marginRight: "5px" }}
                onClick={handleReset}
              >
                <ReloadOutlined />
              </Button>
            )}
          </div>
        </ActionBar>
        <Divider />
        <Row gutter={16}>
          {services.map((service) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={service.id}>
              <Card
                title={service.title}
                bordered={false}
                onClick={() => handleOnClick(service.id)}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text>{service.description}</Text>
                  <Text strong>Price: {service.price}</Text>
                  <Text italic style={{ textAlign: "end" }}>
                    - {" " + service?.user?.name}
                  </Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <MyModal
        title="Select a date and time to book this service:"
        handleOk={handleOk}
        handleCancel={() => setIsBookingModalOpen(false)}
        isModalOpen={isBookingModalOpen}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "2rem 0",
            alignItems: "center",
          }}
        >
          <DatePicker
            onChange={onDateChange}
            style={{ width: "50%", display: "block" }}
          />
          <br />
          <TimePicker.RangePicker
            use12Hours
            format="h:mm a"
            onChange={onTimeChange}
          />
        </div>
      </MyModal>
    </>
  );
};

export default ClientServiceBooking;
