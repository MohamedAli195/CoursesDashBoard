import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = "/api"; // triggers the proxy

interface Ires {
  code: number;
  data: {
    // avatar: string;
    email: string;
    id: number;
    name: string;
//   message: string;
};
  status: boolean;
  token: string;
}


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Ires, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
