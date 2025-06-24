import { useEffect, useState } from "react";
import { getListings } from "../service/listings";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Heart } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import Hero from '../components/Hero';

export function HomePage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    // In a real app, this would come from auth context
    const [userId] = useState("684eee7f702e167943b0fa34");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getListings();
                setListings(data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <div className="h-56 bg-gray-300 rounded-t-lg"></div>
                                <CardContent className="p-4">
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
                                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Hero />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Amazing Stays</h1>
                    <p className="text-lg text-gray-600">Discover unique places to stay around the world</p>
                </div>

                {/* Filters Section */}
                <div className="mb-8 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-blue-100">
                        All Properties
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        Hotels
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        Apartments
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        Villas
                    </Badge>
                </div>

                {/* Listings Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {listings.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))}
                </div>

                {/* Load More Section */}
                {listings.length > 0 && (
                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg">
                            Load More Properties
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}