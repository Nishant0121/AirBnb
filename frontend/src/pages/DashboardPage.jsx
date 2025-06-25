import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card, CardHeader, CardTitle, CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays, Trash2, Pencil, Loader2, ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import Cookies from 'js-cookie';

const DashboardPage = () => {
    const [listingGroups, setListingGroups] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formState, setFormState] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = Cookies.get('authToken');
            const res = await axios.get('http://localhost:5000/api/bookings/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setListingGroups(res.data || []);
        } catch (err) {
            console.error('Failed to fetch listing bookings:', err);
            setListingGroups([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (booking) => {
        setEditingId(booking._id);
        setFormState({
            startDate: booking.startDate.slice(0, 10),
            endDate: booking.endDate.slice(0, 10),
            totalPrice: booking.totalPrice
        });
    };

    const handleUpdate = async (booking) => {
        try {
            const token = Cookies.get('authToken');
            await axios.put(`http://localhost:5000/api/bookings/${booking._id}`, {
                ...formState,
                userId: booking.userId._id,
                listingId: booking.listingId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingId(null);
            fetchData();
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    const handleDelete = async (bookingId) => {
        try {
            const token = Cookies.get('authToken');
            await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-500">
                <Loader2 className="animate-spin w-6 h-6 mr-2" />
                Loading bookings...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Host Dashboard</h1>

            {listingGroups.length === 0 ? (
                <p className="text-gray-500">No listings or bookings found.</p>
            ) : (
                listingGroups.map(({ listing, bookings }) => (
                    <div key={listing._id} className="mb-10">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">{listing.title}</h2>
                            <p className="text-gray-600">{listing.location}</p>
                            <div className="flex gap-2 mt-2 overflow-x-auto">
                                {listing.images.length > 0 ? listing.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt="listing"
                                        className="w-28 h-20 object-cover rounded-md"
                                    />
                                )) : (
                                    <div className="flex items-center text-gray-400"><ImageIcon className="w-6 h-6 mr-2" /> No images</div>
                                )}
                            </div>
                        </div>

                        {bookings.length === 0 ? (
                            <p className="text-sm text-gray-500">No bookings yet.</p>
                        ) : (
                            <div className="space-y-6">
                                {bookings.map((booking) => (
                                    <Card key={booking._id}>
                                        <CardHeader className="flex justify-between items-center">
                                            <CardTitle className="text-sm">
                                                Booking by <span className="text-blue-600 font-medium">{booking.userId.username}</span> ({booking.userId.email})
                                            </CardTitle>
                                            {editingId !== booking._id && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleEdit(booking)}
                                                    >
                                                        <Pencil className="w-4 h-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(booking._id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            )}
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {editingId === booking._id ? (
                                                <>
                                                    <div className="flex gap-4">
                                                        <div className="w-1/2">
                                                            <label className="block text-sm font-medium">Start Date</label>
                                                            <Input
                                                                type="date"
                                                                value={formState.startDate}
                                                                onChange={(e) => setFormState({ ...formState, startDate: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="w-1/2">
                                                            <label className="block text-sm font-medium">End Date</label>
                                                            <Input
                                                                type="date"
                                                                value={formState.endDate}
                                                                onChange={(e) => setFormState({ ...formState, endDate: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium">Total Price</label>
                                                        <Input
                                                            type="number"
                                                            value={formState.totalPrice}
                                                            onChange={(e) => setFormState({ ...formState, totalPrice: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="flex gap-3 pt-3">
                                                        <Button onClick={() => handleUpdate(booking)}>Save</Button>
                                                        <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p>
                                                        <CalendarDays className="inline w-4 h-4 mr-1 text-gray-500" />
                                                        Check-in: <strong>{format(new Date(booking.startDate), 'PPP')}</strong>
                                                    </p>
                                                    <p>
                                                        <CalendarDays className="inline w-4 h-4 mr-1 text-gray-500" />
                                                        Check-out: <strong>{format(new Date(booking.endDate), 'PPP')}</strong>
                                                    </p>
                                                    <p>
                                                        Total Price: <span className="text-green-600 font-bold">${booking.totalPrice}</span>
                                                    </p>
                                                </>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default DashboardPage;
