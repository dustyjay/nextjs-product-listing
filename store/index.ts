import { configureStore } from '@reduxjs/toolkit';
import ListingReducer from '@/store/listing.store';

export const store = configureStore({
  reducer: {
    listing: ListingReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
