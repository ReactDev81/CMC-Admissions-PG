import{lazy} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import MainLayout from '../layout/MainLayout'

const Login = lazy(() => import('../pages/auth/Login'))
const Forgetpassword = lazy(() => import('../pages/auth/Forgetpassword'))
const VerifyOtp = lazy(() => import('../pages/auth/VerifyOtp'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))
const RegistrationForm = lazy(() => import('../pages/admission/registration-form/index'))

const AppRoutes = () => {
    return(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>

                {/* students pages */}
                <Route path="/registration-form" element={<RegistrationForm />} />

                {/* pages wihtout header, footer and sidebar */}
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<Forgetpassword />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* pages with header, footer and sidebar */}
                <Route element={<MainLayout />}>
                    <Route path="/*" element={<ProtectedRoutes />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes