import React, { useEffect, useState } from 'react';
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    CalendarDays, MapPin, DollarSign, User, Mail, Crown, Pencil, Trash2,
} from 'lucide-react';
import { fetchUserData, deleteListing } from '../service/profile';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchUserData();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this listing?')) return;
        try {
            setUserData((prev) => ({
                ...prev,
                listings: prev.listings.filter((l) => l._id !== id),
            }));
        } catch (err) {
            console.error('Failed to delete listing:', err);
            alert('Failed to delete listing. Try again later.');
        }
    };

    const navigate = (path) => {
        console.log(`Navigating to: ${path}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
                <div className="max-w-6xl mx-auto space-y-6 p-6">
                    <Skeleton className="h-8 w-64" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Skeleton className="h-64 col-span-1" />
                        <Skeleton className="h-64 col-span-2" />
                    </div>
                </div>
            </div>
        );
    }

    if (!userData || !userData.user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center overflow-hidden">
                <Card className="w-96">
                    <CardContent className="p-6 text-center">
                        <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No user data found</h3>
                        <p className="text-gray-600">Please try refreshing the page or contact support.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const { user, bookings = [], listings = [] } = userData;
    const isHost = user.isHost;
    const items = isHost ? listings : bookings;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-x-hidden">
            <div className="bg-white shadow-sm border-b mt-6 rounded-xl mx-4 lg:mx-6">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-xl font-semibold bg-blue-100 text-blue-600">
                                {user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.username}</h1>
                            <p className="text-gray-600 mt-1">Manage your profile and {isHost ? 'listings' : 'bookings'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-4 lg:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Profile Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Email</p>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Crown className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Account Type</p>
                                        <Badge variant={isHost ? 'default' : 'secondary'} className="mt-1">
                                            {isHost ? 'Host' : 'Guest'}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="flex items-center gap-3">
                                        <CalendarDays className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                {isHost ? 'Total Listings' : 'Total Bookings'}
                                            </p>
                                            <p className="text-2xl font-bold text-blue-600">{items.length}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        {isHost && (
                                            <>
                                                <a href="/add-listing">
                                                    <Button variant="default" className="w-full text-white">
                                                        Add New Listing
                                                    </Button>
                                                </a>
                                                <a href="/dashboard">
                                                    <Button variant="outline" className="w-full mt-2">
                                                        View Dashboard
                                                    </Button>
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Listings or Bookings Section */}
                    <div className="lg:col-span-2 flex flex-col min-h-0">
                        <Card className="flex-1 flex flex-col min-h-0">
                            <CardHeader className="flex-shrink-0">
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarDays className="h-5 w-5" />
                                    {isHost ? 'Your Listings' : 'Your Bookings'}
                                </CardTitle>
                                <CardDescription>
                                    {isHost
                                        ? 'Manage your property listings and availability'
                                        : 'View and manage your accommodation bookings'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-hidden">
                                {items.length === 0 ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <CalendarDays className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                No {isHost ? 'listings' : 'bookings'} yet
                                            </h3>
                                            <p className="text-gray-600">
                                                {isHost
                                                    ? 'List your first property to start hosting!'
                                                    : 'Start exploring and book your first stay!'}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                                        <div className="space-y-6 pb-4">
                                            {items.map((item) => {
                                                const listing = isHost ? item : item.listingId;
                                                const startDate = isHost ? null : new Date(item.startDate);
                                                const endDate = isHost ? null : new Date(item.endDate);
                                                const nights = isHost
                                                    ? null
                                                    : Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

                                                return (
                                                    <Card key={item._id} className="overflow-hidden">
                                                        <div className="md:flex">
                                                            <div className="md:w-1/3">
                                                                <div className="relative h-48 md:h-full">
                                                                    <img
                                                                        src={listing.images?.[0]}
                                                                        alt={listing.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                    {!isHost && (
                                                                        <div className="absolute top-3 right-3">
                                                                            <Badge
                                                                                variant="secondary"
                                                                                className="bg-white/90 text-gray-800"
                                                                            >
                                                                                {nights} night{nights !== 1 ? 's' : ''}
                                                                            </Badge>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="md:w-2/3 p-6">
                                                                <div className="flex justify-between items-start mb-4">
                                                                    <div>
                                                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                                            {listing.title}
                                                                        </h3>
                                                                        <div className="flex items-center gap-1 text-gray-600 mb-2">
                                                                            <MapPin className="h-4 w-4" />
                                                                            <span className="text-sm">{listing.location}</span>
                                                                        </div>
                                                                        <p className="text-gray-600 text-sm mb-4">
                                                                            {listing.description}
                                                                        </p>
                                                                    </div>
                                                                    {!isHost && (
                                                                        <div className="text-right">
                                                                            <div className="flex items-center gap-1 text-green-600">
                                                                                <DollarSign className="h-4 w-4" />
                                                                                <span className="text-2xl font-bold">
                                                                                    {item.totalPrice}
                                                                                </span>
                                                                            </div>
                                                                            <p className="text-sm text-gray-500">total</p>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {!isHost && (
                                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                        <div className="flex items-center gap-1">
                                                                            <CalendarDays className="h-4 w-4" />
                                                                            <span>Check-in: {startDate.toLocaleDateString()}</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <CalendarDays className="h-4 w-4" />
                                                                            <span>Check-out: {endDate.toLocaleDateString()}</span>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {isHost && (
                                                                    <div className="mt-4 flex gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => navigate(`/edit-listing/${listing._id}`)}
                                                                        >
                                                                            <Pencil className="w-4 h-4 mr-1" />
                                                                            Edit
                                                                        </Button>
                                                                        <Button
                                                                            variant="destructive"
                                                                            size="sm"
                                                                            onClick={() => handleDelete(listing._id)}
                                                                        >
                                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                )}

                                                                {listing.images?.length > 1 && (
                                                                    <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                                                        {listing.images.slice(1, 4).map((img, idx) => (
                                                                            <img
                                                                                key={idx}
                                                                                src={img}
                                                                                alt={`${listing.title} ${idx + 2}`}
                                                                                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                                                            />
                                                                        ))}
                                                                        {listing.images.length > 4 && (
                                                                            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                                                                                <span className="text-xs text-gray-500">
                                                                                    +{listing.images.length - 4}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-thin {
                    scrollbar-width: thin;
                }
                .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 9999px;
                }
                .scrollbar-track-gray-100::-webkit-scrollbar-track {
                    background-color: #f3f4f6;
                    border-radius: 9999px;
                }
                .hover\\:scrollbar-thumb-gray-400:hover::-webkit-scrollbar-thumb {
                    background-color: #9ca3af;
                }
                ::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                ::-webkit-scrollbar-track {
                    background-color: #f3f4f6;
                    border-radius: 9999px;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 9999px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background-color: #9ca3af;
                }
            `}</style>
        </div>
    );
};

export default ProfilePage;