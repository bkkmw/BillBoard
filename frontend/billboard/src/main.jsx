import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      {/* Todo: loading 컴포넌트를 지정 */}
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
      
    </Provider>
    
  // </React.StrictMode>,
)