import UserContextProvider from './context/UserContext';
import ApplicationProvider from './context/ApplicationContext';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <UserContextProvider>
      <ApplicationProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <AppRoutes />
      </ApplicationProvider>
    </UserContextProvider>
  )
}

export default App
