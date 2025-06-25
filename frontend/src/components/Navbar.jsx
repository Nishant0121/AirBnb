import { Link, useNavigate } from 'react-router-dom';
import { Home, User, LogOut, Search, ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '../context/appContext';
import { logout } from '../service/auth';

function Navbar() {

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white shadow-md border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Home className="h-8 w-8 text-gradient from-purple-600 via-pink-600 to-orange-500" />
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">StayFinder</span>
                        </Link>
                    </div>



                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        <Link to="/explore">
                            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                                Explore
                            </Button>
                        </Link>

                        {/* Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex items-center p-2">
                                    <User className="h-4 w-4" />
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="w-full">
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    Logout
                                    <LogOut className="ml-auto h-4 w-4 text-red-500" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
