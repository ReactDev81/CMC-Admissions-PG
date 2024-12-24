import Sidebar from '../components/common/sidebar/index';
import Header from '../components/common/Header'
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return(
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar  */}
            <Sidebar />

            {/* Content Area - Start */}
            <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                <Header />
                <main className='h-screen'>
                    <div className="w-full py-4 px-5">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
            {/* Content Area - End */}

        </div>
    )
}

export default MainLayout;