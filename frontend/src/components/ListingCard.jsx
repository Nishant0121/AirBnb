import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Heart } from 'lucide-react';
import { useState } from 'react';

function ListingCard({ listing }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = (e) => {
        e.preventDefault();
        setIsFavorite(!isFavorite);
    };

    return (
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
            <div className="relative">
                <img
                    src={listing.images?.[0] || '/placeholder-image.jpg'}
                    alt={listing.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                    }}
                />

                {/* Favorite Button */}
                <button
                    onClick={toggleFavorite}
                    className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                >
                    <Heart
                        className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                </button>

                {/* Property Type Badge */}
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {listing.propertyType || 'Property'}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {listing.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">
                            {listing.rating || '4.5'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm line-clamp-1">{listing.location}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-gray-900">
                            ${listing.pricePerNight}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">/ night</span>
                    </div>

                    <div className="text-xs text-gray-500">
                        {listing.guests || 2} guests
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Link to={`/listing/${listing._id}`} className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default ListingCard;