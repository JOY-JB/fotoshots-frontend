import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const REVIEW_URL = "/reviews";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: REVIEW_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    getReviewByService: build.query({
      query: (serviceId: string) => ({
        url: `${REVIEW_URL}/${serviceId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),

    updateReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    deleteReview: build.mutation({
      query: (id) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewByServiceQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = reviewApi;
