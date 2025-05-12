// store/api/recipientApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';

export const recipientApi = createApi({
  reducerPath: 'recipientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/common/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRecipients: builder.query({
      query: () => 'recieverList',
    }),
    addRecipient: builder.mutation({
      query: (newRecipient) => ({
        url: 'reciever',
        method: 'POST',
        body: newRecipient,
      }),
    }),
    getCountries: builder.query({
      query: () => 'countryList',
    }),
    getCurrencies: builder.query({
      query: () => 'currencyList',
    }),
    getCategories: builder.query({
      query: () => 'categoryList',
    }),
    getRegions: builder.query({
      query: () => 'regionList',
    }),
  }),
});

export const {
  useGetRecipientsQuery,
  useAddRecipientMutation,
  useGetCountriesQuery,
  useGetCurrenciesQuery,
  useGetCategoriesQuery,
  useGetRegionsQuery,
} = recipientApi;
