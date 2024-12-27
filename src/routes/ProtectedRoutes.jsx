import{lazy, Suspense} from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const PageNotFound = lazy(() => import('../pages/PageNotFound'))

// Admin Components
const Users = lazy(() => import('../pages/dashboard/admin/Users'))
const Dashboard = lazy(() => import('../pages/dashboard/admin/home/index'))  
const Applications = lazy(() => import('../pages/dashboard/admin/applications/Applications'))  
const Reports = lazy(() => import('../pages/dashboard/admin/Reports'))  
const AdminPanel = lazy(() => import('../pages/dashboard/admin/AdminPanel'))
const PgFormSettings = lazy(() => import('../pages/dashboard/admin/pg-form-settings/index'))
const ApplicationDetails = lazy(() => import('../pages/dashboard/admin/applications-details/index'))

// Students Components
const StudentDashboard = lazy(() => import('../pages/dashboard/student/home/index'))
const ApplicationForm = lazy(() => import('../pages/pg-registration-form/index')) 
const Profile = lazy(() => import('../pages/dashboard/student/profile/index'))


const UserListTable = lazy(() => import('../pages/dashboard/admin/users/index'))

const ProtectedRoutes = () => {

    var {userData} = useContext(UserContext);
    const location = useLocation();

    if (!userData?.token) {
        return <Navigate to="/login" replace />;
    }

    const isSuperAdmin = userData?.role === 'super-admin';
    const isStudent = userData?.role === 'student';

    return (
        <Suspense fallback={<div>Loading....</div>}>
            <Routes>
                <Route 
                    path="/" 
                    element={isStudent ? <StudentDashboard /> : <Dashboard />} 
                />
                <Route path="/users" element={<Users />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/application-detail" element={<ApplicationDetails />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/pg-form-settings" element={<PgFormSettings />} />
                
                <Route path="*" element={<PageNotFound />}/>
                
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

                {/* Student Dashboard Routes*/}
                <Route path="/application-form" element={<ApplicationForm />} />
                <Route path="/profile" element={<Profile />} />


                <Route path="/userlist-table" element={<UserListTable />} />

            </Routes>
        </Suspense>
    )
}

export default ProtectedRoutes