"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import {
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
} from "@/redux/api/reviewApi";
import { Button, Col, Row, message } from "antd";

interface IProps {
  params: {
    id: string;
  };
}

const ReviewEditPage = ({ params }: IProps) => {
  const { id } = params;
  const { data } = useGetReviewByIdQuery(id);
  const [updateReview] = useUpdateReviewMutation();

  const defaultValues = {
    rating: data?.rating || 0,
    comment: data?.comment || "",
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await updateReview({ id, body: data }).unwrap();
      if (!!res) {
        message.success("Review updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row justify={"center"} style={{ minHeight: "100vh" }}>
      <Col sm={12} md={10}>
        <h1 style={{ marginBottom: "1rem" }}>Edit Review</h1>
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <FormInput
              name="rating"
              label="Rating"
              type="number"
              size="large"
            />
            <FormInput
              name="comment"
              label="Comment"
              type="text"
              size="large"
            />
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

export default ReviewEditPage;
