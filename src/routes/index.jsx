import{ lazy, useContext} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import MainLayout from '../layout/MainLayout';
import AdminRoutes from './AdminRoutes';
import StudentRoutes from './StudentRoutes';

const PageNotFound = lazy(() => import('../pages/PageNotFound'))
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/auth/Login'))
const Forgetpassword = lazy(() => import('../pages/auth/Forgetpassword'))
const VerifyOtp = lazy(() => import('../pages/auth/VerifyOtp'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))
const RegistrationForm = lazy(() => import('../pages/pg-registration-form/index'))
const MaintenanceMode = lazy(() => import('../pages/MaintenanceMode'))

const AppRoutes = () => {

    const { userData } = useContext(UserContext);

    const isSuperAdmin = userData?.role === 'super-admin';
    const isAdmin = userData?.role === 'admin';
    const isManager = userData?.role === 'manager';
    const isStudent = userData?.role === 'student';

    // Combine roles for admin access
    const hasAdminAccess = isSuperAdmin || isAdmin || isManager;

    return(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/pg-registration-form" element={userData.token ? <Navigate to="/student" replace /> : <RegistrationForm />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<Forgetpassword />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/maintenance-mode" element={<MaintenanceMode />} />

                {/* Private Routes */}
                {userData?.token ?   
                    <Route element={<MainLayout />}>
                        {hasAdminAccess &&
                            <Route path="/admin/*" element={<AdminRoutes />} />
                        }
                        {isStudent && (
                            <Route path="/student/*" element={<StudentRoutes />} />
                        )}
                    </Route>
                : <Route path="*" element={<Navigate to="/login" replace />} />}

                {/* error pages */}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes