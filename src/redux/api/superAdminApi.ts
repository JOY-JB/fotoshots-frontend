import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SUPER_ADMIN_URL = "/superadmins";

export const superAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSuperAdminById: build.query({
      query: (id: string) => ({
        url: `${SUPER_ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.super_admin],
    }),

    updateSuperAdmin: build.mutation({
      query: (data) => ({
        url: `${SUPER_ADMIN_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.super_admin],
    }),

    createSuperAdmin: build.mutation({
      query: (data) => ({
        url: SUPER_ADMIN_URL,
        method: "POST",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.super_admin],
    }),
  }),
});

export const {
  useGetSuperAdminByIdQuery,
  useUpdateSuperAdminMutation,
  useCreateSuperAdminMutation,
} = superAdminApi;
