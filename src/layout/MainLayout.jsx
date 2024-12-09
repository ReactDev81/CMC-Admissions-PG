import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import { Outlet } from 'react-router-dom';

const MainLayout = ({children}) => {
    return(
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar  */}
            <Sidebar />

            {/* Content Area - Start */}
            <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                <Header />
                <main>
                    <div className="w-full py-4 px-5">
                        <Outlet />
                    </div>
                </main>
            </div>
            {/* Content Area - End */}

        </div>
    )
}

export default MainLayout;