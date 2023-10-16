import { IMeta, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CLIENT_URL = "/clients";

export const clientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.query({
      query: (arg: Record<string, any>) => ({
        url: CLIENT_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IUser[], meta: IMeta) => ({
        clients: response,
        meta,
      }),

      providesTags: [tagTypes.client],
    }),

    getClientById: build.query({
      query: (id: string) => ({
        url: `${CLIENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.client],
    }),

    updateClient: build.mutation({
      query: (data) => ({
        url: `${CLIENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.client],
    }),

    deleteClient: build.mutation({
      query: (id) => ({
        url: `${CLIENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.client],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useDeleteClientMutation,
  useGetClientByIdQuery,
  useUpdateClientMutation,
} = clientApi;
