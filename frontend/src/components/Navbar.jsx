import { Link, useNavigate } from 'react-router-dom';
import { Home, User, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '../context/appContext';

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAppContext(); // Assuming you have a logout function in context

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Home className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">StayFinder</span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-lg mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Search destinations..."
                                className="pl-10 w-full"
                            />
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        <Link to="/home">
                            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                                Explore
                            </Button>
                        </Link>

                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="p-2">
                                <User className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="flex items-center space-x-1"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;