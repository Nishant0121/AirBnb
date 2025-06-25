// src/layouts/AuthLayout.jsx
import { Outlet } from 'react-router-dom';
import { Card } from '../components/ui/card';

export default function AuthLayout() {
    return (

        <div className="min-h-screen  bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-6">
                <Outlet />
            </Card>
        </div>
    );
}
