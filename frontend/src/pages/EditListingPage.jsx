import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Card, CardHeader, CardTitle, CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, ImageIcon } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditListingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadListing = async () => {
            try {
                const token = Cookies.get('authToken');
                const res = await axios.get(`${BASE_URL}/api/listings/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const lt = res.data;
                reset({
                    title: lt.title,
                    location: lt.location,
                    description: lt.description,
                    pricePerNight: lt.pricePerNight,
                });
            } catch (err) {
                console.error('Error loading listing:', err);
            } finally {
                setLoading(false);
            }
        };

        loadListing();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            const token = Cookies.get('authToken');
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('location', data.location);
            formData.append('description', data.description);
            formData.append('pricePerNight', data.pricePerNight);

            if (data.images) {
                Array.from(data.images).forEach((file) => formData.append('images', file));
            }

            await axios.put(`${BASE_URL}/api/listings/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate('/profile');
        } catch (err) {
            console.error('Error updating listing:', err);
            alert('Failed to update listing.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-500">
                <Loader2 className="animate-spin w-8 h-8 mr-2" />
                Loading listing…
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-3 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Edit Listing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Title */}
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" {...register('title', { required: true })} />
                            </div>

                            {/* Location */}
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" {...register('location', { required: true })} />
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    {...register('description', { required: true })}
                                    className="w-full border rounded p-2"
                                    rows={4}
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <Label htmlFor="pricePerNight">Price Per Night</Label>
                                <Input
                                    id="pricePerNight"
                                    type="number"
                                    step="0.01"
                                    {...register('pricePerNight', { required: true })}
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <Label htmlFor="images" className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Replace Images
                                </Label>
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    {...register('images')}
                                />
                            </div>

                            {/* Submit */}
                            <div>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
                                    Save Changes
                                </Button>
                                <Button variant="ghost" onClick={() => navigate(-1)} className="ml-2">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditListingPage;
