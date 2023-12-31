"use client";

import {
  useAdjustBookingMutation,
  useCancelBookingMutation,
  useGetBookingsByUserQuery,
} from "@/redux/api/bookingApi";
import { useCreateFeedbackMutation } from "@/redux/api/feedbackApi";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { getUserInfo } from "@/services/auth.service";
import { BookingStatus, IBooking } from "@/types";
import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Divider,
  Input,
  Rate,
  Select,
  Space,
  TimePicker,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";
import ActionBar from "./ActionBar";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const ClientBookingManagementTable = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isAdjustedModalOpen, setIsAdjustedModalOpen] =
    useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] =
    useState<boolean>(false);

  const [newBookingDate, setNewBookingDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const [rating, setRating] = useState(0);
  const [newEndTime, setNewEndTime] = useState("");

  const [bookingIdToCancelOrAdjust, setBookingIdToCancelOrAdjust] =
    useState("");
  const [serviceIdToReviewOrFeedback, setServiceIdToReviewOrFeedback] =
    useState("");
  const [cancelBooking] = useCancelBookingMutation();
  const [adjustBooking] = useAdjustBookingMutation();

  const [CreateReview] = useCreateReviewMutation();
  const [CreateFeedback] = useCreateFeedbackMutation();

  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<any>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  const { userId } = getUserInfo() as any;

  const query: Record<string, any> = {
    limit: pageLimit,
    page,
    sortBy,
    sortOrder,
  };

  if (dateFilter) {
    query.date = dateFilter;
  }

  if (statusFilter) {
    query.status = statusFilter;
  }

  const { data, isLoading } = useGetBookingsByUserQuery({ userId, arg: query });
  const bookings = data?.bookings;
  const meta = data?.meta;

  const handleReset = () => {
    setSortBy("");
    setSortOrder("");
    setDateFilter(undefined);
    setStatusFilter(undefined);
  };

  const handleOnCancel = (id: string) => {
    setIsCancelModalOpen(true);
    setBookingIdToCancelOrAdjust(id);
  };

  const handleOnAdjust = (id: string) => {
    setIsAdjustedModalOpen(true);
    setBookingIdToCancelOrAdjust(id);
  };

  const handleOnReview = (id: string) => {
    setIsReviewModalOpen(true);
    setServiceIdToReviewOrFeedback(id);
  };
  const handleOnFeedBack = (id: string) => {
    setIsFeedbackModalOpen(true);
    setServiceIdToReviewOrFeedback(id);
  };

  const handleCancel = () => {
    setIsAdjustedModalOpen(false);
    setIsCancelModalOpen(false);
    setIsReviewModalOpen(false);
    setIsFeedbackModalOpen(false);
  };

  const handleCancelBooking = async () => {
    setIsCancelModalOpen(false);
    message.loading("Canceling booking...");
    try {
      const res = await cancelBooking(bookingIdToCancelOrAdjust).unwrap();

      res && message.success("Booking canceled successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const isNotEmpty = (value: string) => {
    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value.trim() !== ""
    );
  };

  const handleAdjustBooking = async () => {
    const newBookingData = {
      date: newBookingDate,
      startTime: newStartTime,
      endTime: newEndTime,
    };

    if (
      isNotEmpty(newBookingData.date) &&
      isNotEmpty(newBookingData.startTime) &&
      isNotEmpty(newBookingData.endTime)
    ) {
      setIsAdjustedModalOpen(false);

      message.loading("Adjusting...");
      try {
        const res = await adjustBooking({
          id: bookingIdToCancelOrAdjust,
          body: newBookingData,
        }).unwrap();

        res && message.success("Booking adjusted successfully");
      } catch (error) {
        console.error(error);
      }
    } else {
      message.error("Please fill in all the required fields.");
    }
  };

  const handleReview = async () => {
    if (rating === 0) {
      message.error("Please select a rating for your review.");
      return;
    }

    if (!reviewText) {
      message.error("Please enter your review text.");
      return;
    }

    const reviewData = {
      rating,
      comment: reviewText,
      serviceId: serviceIdToReviewOrFeedback,
    };

    setIsReviewModalOpen(false);

    try {
      const res = await CreateReview(reviewData).unwrap();

      res && message.success("Review submitted successful");
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error("An error occurred while submitting the review.");
    }
  };

  const handleFeedback = async () => {
    if (!feedbackText) {
      message.error("Please enter your feedback.");
      return;
    }

    const feedbackData = {
      message: feedbackText,
      serviceId: serviceIdToReviewOrFeedback,
    };

    setIsFeedbackModalOpen(false);

    try {
      const res = await CreateFeedback(feedbackData).unwrap();

      res && message.success("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      message.error("An error occurred while submitting the feedback.");
    }
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageLimit(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, short: any) => {
    const { order, field } = short;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const onDateChange: DatePickerProps["onChange"] = (el) => {
    const localTimezoneOffsetInMinutes = dayjs().utcOffset();

    const date = dayjs(el)
      .subtract(localTimezoneOffsetInMinutes, "minute")
      .format("YYYY-MM-DDTHH:mm:ss[Z]");

    setNewBookingDate(date);
  };

  const onTimeChange = (el: any) => {
    const localTimezoneOffsetInMinutes = dayjs().utcOffset();

    const startTime = dayjs(el[0])
      .subtract(localTimezoneOffsetInMinutes, "minute")
      .format("YYYY-MM-DDTHH:mm:ss[Z]");
    const endTime = dayjs(el[1])
      .subtract(localTimezoneOffsetInMinutes, "minute")
      .format("YYYY-MM-DDTHH:mm:ss[Z]");

    setNewStartTime(startTime);
    setNewEndTime(endTime);
  };

  const bookingListColumns = [
    {
      title: "Date",
      dataIndex: "date",
      sorter: true,
      render: (data: string) => {
        return dayjs(data).format("MMM DD, YYYY ");
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (data: string) => {
        return dayjs(data).format("hh:mm A");
      },
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (data: string) => {
        return dayjs(data).format("hh:mm A");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "User Name",
      render: (data: IBooking) => {
        return data?.user?.name;
      },
    },
    {
      title: "Service Title",
      render: (data: IBooking) => {
        return data?.service?.title;
      },
    },
    {
      title: "Action",
      render: (data: any) => (
        <div>
          {data.status === BookingStatus.PENDING ? (
            <>
              <Button danger onClick={() => handleOnCancel(data.id)}>
                Cancel
              </Button>
              <Divider type="vertical" />
              <Button onClick={() => handleOnAdjust(data.id)}>Adjust</Button>
            </>
          ) : data.status === BookingStatus.ADJUSTED ? (
            <Button danger onClick={() => handleOnCancel(data.id)}>
              Cancel
            </Button>
          ) : data.status === BookingStatus.COMPLETED ? (
            <>
              <Button onClick={() => handleOnReview(data.serviceId)}>
                Review
              </Button>
              <Divider type="vertical" />
              <Button onClick={() => handleOnFeedBack(data.serviceId)}>
                Feedback
              </Button>
            </>
          ) : null}
        </div>
      ),
    },
  ];

  const statusOption = [
    { value: BookingStatus.PENDING, label: "Pending" },
    { value: BookingStatus.ACCEPTED, label: "Accepted" },
    { value: BookingStatus.ADJUSTED, label: "Adjusted" },
    { value: BookingStatus.COMPLETED, label: "Completed" },
  ];

  const bookingsData = data?.bookings?.filter((item) => {
    const { status } = item;
    return status !== "CANCELED" && status !== "REJECTED";
  });

  return (
    <>
      <ActionBar title="Bookings List">
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <Space style={{ width: 120 }}>
            <DatePicker
              onChange={(date, dateString) =>
                date
                  ? setDateFilter(dayjs(date).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                  : setDateFilter(undefined)
              }
            />
          </Space>

          <Divider type="vertical" />
          <Select
            style={{ width: 120 }}
            showSearch
            allowClear
            options={statusOption}
            onChange={(data) => setStatusFilter(data)}
            placeholder="Select status"
          />

          <Divider type="vertical" />
          {(!!sortBy || !!sortOrder || dateFilter || statusFilter) && (
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
      <MyTable
        loading={isLoading}
        columns={bookingListColumns}
        dataSource={bookingsData}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        pageSize={pageLimit}
        showSizeChanger={true}
        totalData={bookingsData?.length}
        showPagination={true}
      />

      <MyModal
        title="Confirm Cancel Booking"
        handleOk={handleCancelBooking}
        handleCancel={handleCancel}
        isModalOpen={isCancelModalOpen}
      >
        <p>Are you sure you want to cancel this booking?</p>
      </MyModal>

      <MyModal
        title="Select a date and time to adjust this booking"
        handleOk={handleAdjustBooking}
        handleCancel={handleCancel}
        isModalOpen={isAdjustedModalOpen}
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

      <MyModal
        title="Select a date and time to adjust this booking"
        handleOk={handleAdjustBooking}
        handleCancel={handleCancel}
        isModalOpen={isAdjustedModalOpen}
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

      <MyModal
        title="Leave a Review"
        handleOk={handleReview}
        handleCancel={handleCancel}
        isModalOpen={isReviewModalOpen}
      >
        <div>
          <br />
          <Rate
            defaultValue={0}
            onChange={setRating}
            style={{
              fontSize: 30,
              width: "100%",
              textAlign: "center",
            }}
          />
          <br />
          <br />
          <Input
            placeholder="Your Review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
      </MyModal>

      <MyModal
        title="Give Feedback"
        handleOk={handleFeedback}
        handleCancel={handleCancel}
        isModalOpen={isFeedbackModalOpen}
      >
        <div style={{ margin: "10px 0" }}>
          <TextArea
            maxLength={100}
            placeholder="Your Feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </div>
      </MyModal>
    </>
  );
};

export default ClientBookingManagementTable;
