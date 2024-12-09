import{lazy, Suspense} from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Users = lazy(() => import('../pages/dashboard/Users'))
const Dashboard = lazy(() => import('../pages/dashboard/home/index'))  
const Applications = lazy(() => import('../pages/dashboard/applications/Applications'))  
const Reports = lazy(() => import('../pages/dashboard/Reports'))  
const AdminPanel = lazy(() => import('../pages/dashboard/AdminPanel'))
const PgFormSettings = lazy(() => import('../pages/dashboard/pg-form-settings/index'))
const ApplicationDetails = lazy(() => import('../pages/dashboard/applications-details/index'))

const ProtectedRoutes = () => {

    var {userData} = useContext(UserContext);
    const location = useLocation();

    if (!userData?.token) {
        return <Navigate to="/login" replace />;
    }

    const isSuperAdmin = userData?.role === 'super-admin';

    return (
        <Suspense fallback={<div>Loading....</div>}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/application-detail" element={<ApplicationDetails />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/pg-form-settings" element={<PgFormSettings />} />
                
                <Route
                    path="/admin-panel"
                    element={
                        isSuperAdmin ? (
                            <AdminPanel />
                        ) : (
                            <Navigate to="/" replace state={{ from: location }} />
                        )
                    }
                />
            </Routes>
        </Suspense>
    )
}

export default ProtectedRoutes