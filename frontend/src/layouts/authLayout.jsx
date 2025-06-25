// src/layouts/AuthLayout.jsx
import { Outlet } from 'react-router-dom';
import { Card } from '../components/ui/card';

export default function AuthLayout() {
    return (
        <div className="min-h-screen  bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center bg-gray-100">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url('/bg.svg')] bg-cover bg-no-repeat bg-center"></div>
            <div className="relative z-10">
                <div className=" flex-col items-center justify-center">

                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">Welcome to Stayfinder</h1>
                </div>
                <Card className="w-full max-w-md p-6 mt-12">
                    <Outlet />
                </Card>
            </div>
        </div>
    );
}

