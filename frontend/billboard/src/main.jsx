import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'

import {
  RouterProvider,
} from "react-router-dom";

import { PersistGate } from 'redux-persist/integration/react'

import router from "./router/index";
import { persistor, store } from './store/store'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      {/* Todo: loading 컴포넌트를 지정 */}
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>
      </PersistGate>
      
    </Provider>
    
  // </React.StrictMode>,
)
