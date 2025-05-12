import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { orderApi } from './api/orderApi';
import authReducer from "./slice/authSlice"
import { recipientApi } from './api/recipientApi';
import { buyForMeApi } from './api/buyForMeApi';


export const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
		[recipientApi.reducerPath]: recipientApi.reducer,
		[buyForMeApi.reducerPath]: buyForMeApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware)
			.concat(orderApi.middleware)
			.concat(buyForMeApi.middleware)
			.concat(recipientApi.middleware),
});
