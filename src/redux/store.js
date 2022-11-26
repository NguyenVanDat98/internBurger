import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { burger } from './actionburger'
import { user } from './actionUser'



const store = configureStore({
  reducer: {burger:burger.reducer,user:user.reducer},
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false,
  })
})
export default store