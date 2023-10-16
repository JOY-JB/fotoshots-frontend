import { IMeta, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ADMIN_URL = "/admins";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query({
      query: (arg: Record<string, any>) => ({
        url: ADMIN_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IUser[], meta: IMeta) => ({
        admins: response,
        meta,
      }),
      providesTags: [tagTypes.admin],
    }),

    getAdminById: build.query({
      query: (id: string) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    updateAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
} = adminApi;
