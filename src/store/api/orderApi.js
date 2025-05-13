// services/orderApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL + "/api/order",
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem("accessToken");
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: (status) => `/orderList?status=${status || 0}`,
		}),
		createOrEditOrder: builder.mutation({
			query: (formData) => ({
				url: "/createEditOrder",
				method: "POST",
				body: formData,
			}),
		}),
		issueOrder: builder.mutation({
			query: ({ orderId }) => ({
				url: `/api/app/order/issue/${orderId}`,
				method: "POST",
			}),
		}),
	}),
});

export const { useGetOrdersQuery, useCreateOrEditOrderMutation, useIssueOrderMutation } = orderApi;
