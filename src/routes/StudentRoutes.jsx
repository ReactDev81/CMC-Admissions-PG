import { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const StudentDashboard = lazy(() => import('../pages/dashboard/student/home/index'));
const ApplicationForm = lazy(() => import('../pages/pg-registration-form/index'));
const Profile = lazy(() => import('../pages/dashboard/student/profile/index'));
const Notifications = lazy(() => import('../pages/dashboard/student/Notifications'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const StudentRoutes = () => {

    const { userData } = useContext(UserContext);
    const resetPassword =  userData.userDetails?.password_changed;

    return (
        <Suspense fallback={<div>Loading....</div>}>
            <Routes>
                <Route index element={<StudentDashboard />} />
                {resetPassword ? (
                    <>
                        {userData.userDetails.application_status === "draft" ? 
                            <Route path="application-form" element={<ApplicationForm />} />
                            : <Route path="*" element={<Navigate to="/student" replace />} />
                        }
                        <Route path="profile" element={<Profile />} />
                        <Route path="notifications" element={<Notifications />} />
                    </>
                ) : <Route path="*" element={<Navigate to="/student" replace />} />}
                
                {/* error pages */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    );
};

export default StudentRoutes;