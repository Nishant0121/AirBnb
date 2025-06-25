import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function AppLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            <nav className='sticky z-50 top-0'>
                <Navbar />
            </nav>

            <main className='max-w-[1080px] mx-auto' >
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;

