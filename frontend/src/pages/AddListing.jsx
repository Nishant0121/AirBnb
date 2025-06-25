import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
    Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CalendarDays, ImageIcon, Loader2 } from 'lucide-react';
import { addListing } from '../service/profile';

const AddListingPage = () => {
    const {
        register, handleSubmit, reset, formState: { isSubmitting },
    } = useForm();

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (data) => {
        try {
            setSuccessMsg('');
            setErrorMsg('');

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('location', data.location);
            formData.append('description', data.description);
            formData.append('pricePerNight', data.pricePerNight);
            formData.append('availableDates', data.availableDates);

            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }

            const res = await addListing(formData);

            setSuccessMsg('Listing added successfully!');
            reset();
        } catch (error) {
            console.error(error);
            setErrorMsg(error.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Add New Listing</CardTitle>
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

                            {/* Available Date */}
                            <div>
                                <Label htmlFor="availableDates" className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4" />
                                    Available Date
                                </Label>
                                <Input id="availableDates" type="date" {...register('availableDates', { required: true })} />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <Label htmlFor="images" className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Upload Images
                                </Label>
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    {...register('images', { required: true })}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
                                    Add Listing
                                </Button>
                            </div>

                            {/* Success / Error Message */}
                            {successMsg && <p className="text-green-600">{successMsg}</p>}
                            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddListingPage;

