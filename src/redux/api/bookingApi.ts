import { IBooking, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (data) => ({
        url: BOOKING_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    getAllBookings: build.query({
      query: (arg: Record<string, any>) => ({
        url: BOOKING_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IBooking[], meta: IMeta) => ({
        bookings: response,
        meta,
      }),
      providesTags: [tagTypes.booking],
    }),

    getBookingById: build.query({
      query: (bookingId: string) => ({
        url: `${BOOKING_URL}/${bookingId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),

    getBookingsByService: build.query({
      query: (serviceId: string) => ({
        url: `${BOOKING_URL}/service/${serviceId}`,
        method: "GET",
      }),
      transformResponse: (response: IBooking[], meta: IMeta) => ({
        bookings: response,
        meta,
      }),
      providesTags: [tagTypes.booking],
    }),

    getBookingsByUser: build.query({
      query: ({
        userId,
        arg,
      }: {
        userId: string;
        arg: Record<string, any>;
      }) => ({
        url: `${BOOKING_URL}/user/${userId}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IBooking[], meta: IMeta) => ({
        bookings: response,
        meta,
      }),
      providesTags: [tagTypes.booking],
    }),

    getBookingsByPhotographer: build.query({
      query: ({
        userId,
        arg,
      }: {
        userId: string;
        arg: Record<string, any>;
      }) => ({
        url: `${BOOKING_URL}/photographer/${userId}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IBooking[], meta: IMeta) => ({
        bookings: response,
        meta,
      }),
      providesTags: [tagTypes.booking],
    }),

    updateBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    cancelBooking: build.mutation({
      query: (bookingId: string) => ({
        url: `${BOOKING_URL}/cancel/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    acceptBooking: build.mutation({
      query: (bookingId: string) => ({
        url: `${BOOKING_URL}/accept/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    adjustBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/adjust/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    rejectBooking: build.mutation({
      query: (bookingId: string) => ({
        url: `${BOOKING_URL}/reject/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    completeBooking: build.mutation({
      query: (bookingId: string) => ({
        url: `${BOOKING_URL}/complete/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    deleteBooking: build.mutation({
      query: (bookingId: string) => ({
        url: `${BOOKING_URL}/delete/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetBookingsByServiceQuery,
  useGetBookingByIdQuery,
  useGetBookingsByUserQuery,
  useGetBookingsByPhotographerQuery,
  useUpdateBookingMutation,
  useCancelBookingMutation,
  useAcceptBookingMutation,
  useAdjustBookingMutation,
  useRejectBookingMutation,
  useCompleteBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
