// src/store/api/notificationsApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config";

export const notificationsApi = createApi({
    reducerPath: "notificationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL + "/api/notifications",
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Notifications"],
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => "/notify",
            pollingInterval: 10000, // каждые 10 сек
            providesTags: ["Notifications"],
        }),
        markAsRead: builder.mutation({
            query: (data) => ({
                url: `create-notify`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Notifications"],
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useMarkAsReadMutation,
} = notificationsApi;
