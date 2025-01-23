import{lazy, Suspense} from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const PageNotFound = lazy(() => import('../pages/PageNotFound'))

// Admin Components
const Users = lazy(() => import('../pages/dashboard/admin/users/index'))
const Dashboard = lazy(() => import('../pages/dashboard/admin/home/index'))  
const Applications = lazy(() => import('../pages/dashboard/admin/applications/index'))  
const ApplicationDetails = lazy(() => import('../pages/dashboard/admin/applications-details/index'))
const Reports = lazy(() => import('../pages/dashboard/admin/Reports'))  
const AdminPanel = lazy(() => import('../pages/dashboard/admin/AdminPanel'))
const Pages = lazy(() => import('../pages/dashboard/admin/pages/index'))
const PgFormSettings = lazy(() => import('../pages/dashboard/admin/pg-form-settings/index'))
const SystemSettings = lazy(() => import('../pages/dashboard/admin/system-settings/index'))
const RolesPermissions = lazy(() => import('../pages/dashboard/admin/roles-permissions/index'))

// Students Components
const StudentDashboard = lazy(() => import('../pages/dashboard/student/home/index'))
const ApplicationForm = lazy(() => import('../pages/pg-registration-form/index')) 
const Profile = lazy(() => import('../pages/dashboard/student/profile/index'))

const ProtectedRoutes = () => {

    var {userData} = useContext(UserContext);
    const resetPassword =  userData.userDetails?.password_changed;
    const location = useLocation();

    if (!userData?.token) {
        return <Navigate to="/login" replace />;
    }

    const isSuperAdmin = userData?.role === 'super-admin';
    const isAdmin = userData?.role === 'admin';
    const isManager = userData?.role === 'manager';
    const isStudent = userData?.role === 'student';

    // Combine roles for admin access
    const hasAdminAccess = isSuperAdmin || isAdmin || isManager;

    return (
        <Suspense fallback={<div>Loading....</div>}>
            <Routes>
                <Route 
                    path="/" 
                    element={isStudent ? <StudentDashboard /> : <Dashboard />} 
                />

                {/* Admin-Only Routes */}
                {hasAdminAccess &&
                    <>
                        <Route path="/users" element={<Users />} />
                        <Route path="/applications" element={<Applications />} />
                        <Route path="/application/:id" element={<ApplicationDetails />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/pages" element={<Pages />} />
                        <Route path="/pg-form-settings" element={<PgFormSettings />} />
                        <Route path="/system-settings" element={<SystemSettings />} />
                        <Route path="/roles-permissions" element={<RolesPermissions />} />
                    </>
                }

                {/* Student-Only Routes*/}
                {isStudent && resetPassword && (
                    <>
                        <Route path="/application-form" element={<ApplicationForm />} />
                        <Route path="/profile" element={<Profile />} />
                    </>
                )}
                {isStudent && resetPassword && (
                    <Route
                        path="*"
                        element={<Navigate to="/" replace state={{ from: location }} />}
                    />
                )}

                {/* only superadmin can accesible this route */}
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

                {/* error pages */}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </Suspense>
    )
}

export default ProtectedRoutes