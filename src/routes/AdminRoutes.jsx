import{ lazy, Suspense} from 'react'
import { Route, Routes } from 'react-router-dom'

const Users = lazy(() => import('../pages/dashboard/admin/users/index'))
const Dashboard = lazy(() => import('../pages/dashboard/admin/home/index'))  
const Applications = lazy(() => import('../pages/dashboard/admin/applications/index'))  
const ApplicationDetails = lazy(() => import('../pages/dashboard/admin/applications-details/index'))
const AddNewApplication = lazy(() => import('../pages/dashboard/admin/application-addnew/index'))
const Reports = lazy(() => import('../pages/dashboard/admin/Reports'))  
const Pages = lazy(() => import('../pages/dashboard/admin/pages/index'))
const PgFormSettings = lazy(() => import('../pages/dashboard/admin/pg-form-settings/index'))
const SystemSettings = lazy(() => import('../pages/dashboard/admin/system-settings/index'))
const RolesPermissions = lazy(() => import('../pages/dashboard/admin/roles-permissions/index'))
const MaintenanceMode = lazy(() => import('../pages/MaintenanceMode'))
const MyAccount = lazy(() => import('../pages/dashboard/admin/my-acccount/index'))
const Notification = lazy(() => import('../pages/dashboard/admin/Notification/index'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))

const AdminRoutes = () => {
    return(
        <Suspense fallback={<div>Loading....</div>}>
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="applications" element={<Applications />} />
                <Route path="application/:id" element={<ApplicationDetails />} />
                <Route path="application/addnew" element={<AddNewApplication />} />
                <Route path="reports" element={<Reports />} />
                <Route path="pages" element={<Pages />} />
                <Route path="pg-form-settings" element={<PgFormSettings />} />
                <Route path="system-settings" element={<SystemSettings />} />
                <Route path="roles-permissions" element={<RolesPermissions />} />
                <Route path="maintenance-mode" element={<MaintenanceMode />} />
                <Route path="my-account" element={<MyAccount />} />
                <Route path="notifications" element={<Notification />} />
                
                {/* error pages */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    )
}

export default AdminRoutes;