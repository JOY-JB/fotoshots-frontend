import { IContent, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BLOG_URL = "/contents/blog";
const FAQ_URL = "/contents/faq";

export const contentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlogPost: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    updateBlogPostById: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    deleteBlogPostById: build.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    getAllBlogPosts: build.query({
      query: () => ({
        url: BLOG_URL,
        method: "GET",
      }),
      transformResponse: (response: IContent[], meta: IMeta) => ({
        blogs: response,
        meta,
      }),
      providesTags: [tagTypes.blog],
    }),

    // FAQ

    createFAQ: build.mutation({
      query: (data) => ({
        url: FAQ_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    updateFAQById: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    deleteFAQById: build.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    getAllFAQs: build.query({
      query: () => ({
        url: FAQ_URL,
        method: "GET",
      }),
      transformResponse: (response: IContent[], meta: IMeta) => ({
        faqs: response,
        meta,
      }),
      providesTags: [tagTypes.faq],
    }),

    getContentById: build.query({
      query: (id) => ({
        url: `/contents/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog, tagTypes.faq],
    }),
  }),
});

export const {
  useCreateBlogPostMutation,
  useUpdateBlogPostByIdMutation,
  useDeleteBlogPostByIdMutation,
  useGetAllBlogPostsQuery,

  useGetContentByIdQuery,

  useCreateFAQMutation,
  useUpdateFAQByIdMutation,
  useDeleteFAQByIdMutation,
  useGetAllFAQsQuery,
} = contentApi;
