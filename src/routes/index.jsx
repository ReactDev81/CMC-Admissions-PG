import{lazy} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import MainLayout from '../layout/MainLayout'
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Login = lazy(() => import('../pages/auth/Login'))
const Forgetpassword = lazy(() => import('../pages/auth/Forgetpassword'))
const VerifyOtp = lazy(() => import('../pages/auth/VerifyOtp'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))
const RegistrationForm = lazy(() => import('../pages/pg-registration-form/index'))

const AppRoutes = () => {

    const {userData} = useContext(UserContext);

    return(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>

                {/* students pages */}
                <Route
                    path="/pg-registration-form"
                    element={
                        userData.token ? <Navigate to="/" replace /> : <RegistrationForm />
                    }
                />

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