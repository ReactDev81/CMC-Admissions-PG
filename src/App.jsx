import UserContextProvider from './context/UserContext'
import AppRoutes from './routes'

const App = () => {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  )
}

export default App
