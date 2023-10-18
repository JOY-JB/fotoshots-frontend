import { IMeta, IService } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/services";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createService: build.mutation({
      query: (data) => ({
        url: SERVICE_URL,
        method: "POST",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    getAllServices: build.query({
      query: (arg: Record<string, any>) => ({
        url: SERVICE_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IService[], meta: IMeta) => ({
        services: response,
        meta,
      }),
      providesTags: [tagTypes.service],
    }),

    getServiceById: build.query({
      query: (id: string) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    getServicesByUser: build.query({
      query: ({
        userId,
        arg,
      }: {
        userId: string;
        arg: Record<string, any>;
      }) => ({
        url: `${SERVICE_URL}/user/${userId}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IService[], meta: IMeta) => ({
        services: response,
        meta,
      }),
      providesTags: [tagTypes.service],
    }),

    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useGetServicesByUserQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
