import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createClient: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-client`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.client],
    }),

    createPhotographer: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-photographer`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.photographer],
    }),

    createAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-admin`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateClientMutation,
  useCreatePhotographerMutation,
  useCreateAdminMutation,
  useUpdateProfileMutation,
} = userApi;
