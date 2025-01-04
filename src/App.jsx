import UserContextProvider from './context/UserContext'
import ApplicationProvider from './context/ApplicationContext'
import AppRoutes from './routes'

const App = () => {
  return (
    <UserContextProvider>
      <ApplicationProvider>
        <AppRoutes />
      </ApplicationProvider>
    </UserContextProvider>
  )
}

export default App
