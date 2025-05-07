import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { orderApi } from './api/orderApi';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware)
			.concat(orderApi.middleware),
});
