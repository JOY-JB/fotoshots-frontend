import { IMeta, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PHOTOGRAPHER_URL = "/photographers";

export const photographerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPhotographers: build.query({
      query: (arg: Record<string, any>) => ({
        url: PHOTOGRAPHER_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IUser[], meta: IMeta) => ({
        photographers: response,
        meta,
      }),
      providesTags: [tagTypes.photographer],
    }),

    getPhotographerById: build.query({
      query: (id: string) => ({
        url: `${PHOTOGRAPHER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.photographer],
    }),

    updatePhotographer: build.mutation({
      query: (data) => ({
        url: `${PHOTOGRAPHER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.photographer],
    }),

    deletePhotographer: build.mutation({
      query: (id) => ({
        url: `${PHOTOGRAPHER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.photographer],
    }),
  }),
});

export const {
  useGetPhotographersQuery,
  useDeletePhotographerMutation,
  useGetPhotographerByIdQuery,
  useUpdatePhotographerMutation,
} = photographerApi;
