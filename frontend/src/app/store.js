import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

// Set up listeners for API queries, enabling additional functionality in components like UsersList and NotesList
setupListeners(store.dispatch)