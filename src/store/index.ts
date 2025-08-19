// Redux store configuration
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Import slices
import authSlice from './slices/authSlice'
import bookingSlice from './slices/bookingSlice'
import propertySlice from './slices/propertySlice'
import roomSlice from './slices/roomSlice'
import guestSlice from './slices/guestSlice'
import notificationSlice from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    booking: bookingSlice,
    property: propertySlice,
    room: roomSlice,
    guest: guestSlice,
    notification: notificationSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector