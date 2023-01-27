import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Profile",
    "Customer",
    "Transaction",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),

    getProfile: build.query({
      query: () => "profile",
      providesTags: ["Profile"],
    }),

    getCustomer: build.query({
      query: () => "customer",
      providesTags: ["Customer"],
    }),

    getTransaction: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "transaction",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transaction"],
    }),

    getGeography: build.query({
      query: () => "geography",
      providesTags: ["Geography"],
    }),

    getSales: build.query({
      query: () => "sales",
      providesTags: ["Sales"],
    }),

    getAdmins: build.query({
      query: () => "admin",
      providesTags: ["Admins"],
    }),

    getPerfomance: build.query({
      query: (id) => `performance/${id}`,
      providesTags: ["Performance"]
    }),

    getDashboard: build.query({
      query: () => "dashboard",
      providesTags: ["Dashboard"]
    }),

  }),
});

export const {
  useGetUserQuery,
  useGetProfileQuery,
  useGetCustomerQuery,
  useGetTransactionQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetPerfomanceQuery,
  useGetDashboardQuery
} = api;
