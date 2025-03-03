import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authReducer from '~/store/reducers/authReducer'
import counterReducer from '~/store/reducers/counterReducer'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  counter: counterReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// Use persistor
export const persistor = persistStore(store)

export default store
