import  {configureStore,combineReducers}  from '@reduxjs/toolkit'
import reducer from './user/userSlice.js'
import {persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

  const rootReducer = combineReducers({
    user:reducer
  })
   const persistConfig= {
    key:"root",
    storage,
    version:1
   }

   const presistedReducer = persistReducer(persistConfig,rootReducer)
 export const store = configureStore({
  reducer: presistedReducer,
  middleware:(getDefaultMiddleware =>getDefaultMiddleware({serializableCheck:false}))
})

export const presiststore = persistStore(store)