// store/api/recipientApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipientApi = createApi({
  reducerPath: 'recipientApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Здесь будет твой серверный API
  endpoints: (builder) => ({
    getRecipients: builder.query({
      query: () => 'recipients',
    }),
    addRecipient: builder.mutation({
      query: (newRecipient) => ({
        url: 'recipients',
        method: 'POST',
        body: newRecipient,
      }),
    }),
  }),
});

export const { useGetRecipientsQuery, useAddRecipientMutation } = recipientApi;
