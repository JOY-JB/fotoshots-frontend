import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedbacks";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFeedback: build.mutation({
      query: (data) => ({
        url: FEEDBACK_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    getFeedbackByService: build.query({
      query: (serviceId: string) => ({
        url: `${FEEDBACK_URL}/service/${serviceId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),
    getFeedbackByUser: build.query({
      query: (userId: string) => ({
        url: `${FEEDBACK_URL}/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),

    updateFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetFeedbackByServiceQuery,
  useGetFeedbackByUserQuery,
  useUpdateFeedbackMutation,
} = feedbackApi;
