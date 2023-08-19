import { getCookie } from "@helpers/session";
import { responseTransformer } from "@helpers/util";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recordApiSlice = createApi({
  reducerPath: "record",
  credentials: "same-origin", 
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BACKEND_HOST_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("accesstoken", "test-token");
      headers.set('Access-Control-Allow-Origin', '*')
      return headers;
    },
  }),
  tagTypes: ["list-record"],

  endpoints: (builder) => ({
    getRecordList: builder.query({
      transformResponse: (res) => responseTransformer({ res }),
      query: (params) => ({
        url: `/record`,
        method: "GET",
        params: params,
      }),
      providesTags: ["list-record"],
    }),
    getRecord: builder.query({
      query: (_id) => ({
        url: `/record/${_id}`,
        method: "GET",
      }),
      providesTags: ["list-record"],
    }),
    createRecord: builder.mutation({
      // transformResponse: (res) => responseTransformer({ res }),
      query: (body) => ({
        url: "/record",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["list-record"],
    }),
    updateRecord: builder.mutation({
      // transformResponse: (res) => responseTransformer({ res }),
      query: ({ _id, body }) => ({
        url: `/record/${_id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["list-record"],
    }),
    deleteRecord: builder.mutation({
      query: (_id) => ({
        url: `/record/${_id}`,
        method: "DELETE",
        // body: { id },
      }),
      invalidatesTags: ["list-record"],
    }),
  }),
});

export const {
  useCreateRecordMutation,
  useDeleteRecordMutation,
  useGetRecordListQuery,
  useGetRecordQuery,
  useUpdateRecordMutation,
} = recordApiSlice;
