import { Heart, Star, MapPin, Calendar, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

function ListingCard({ listing }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const nextImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === listing.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? listing.images.length - 1 : prev - 1
        );
    };

    // Calculate some random but consistent values for demo
    const rating = (4.5 + (Math.abs(listing._id.slice(-2)) / 100)).toFixed(2);
    const reviewCount = 20 + Math.abs(listing._id.slice(-2));
    const distance = Math.floor(Math.random() * 500) + 50;

    return (
        <a
            href={`/listing/${listing._id}`}
            className="block group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:bg-white/90"
                style={{
                    background: isHovered
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)'
                        : 'rgba(255,255,255,0.8)'
                }}
            >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                    <div className="relative w-full h-full">
                        <img
                            src={listing.images?.[currentImageIndex] || '/placeholder-image.jpg'}
                            alt={listing.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            onError={(e) => {
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Favorite Heart */}
                    <button
                        onClick={toggleFavorite}
                        className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 border border-white/50"
                    >
                        <Heart
                            className={`h-5 w-5 transition-all duration-300 ${isFavorite
                                ? 'fill-red-500 text-red-500 scale-110'
                                : 'text-gray-600 hover:text-red-400'
                                }`}
                        />
                    </button>

                    {/* Premium Badge */}
                    <div className="absolute top-4 left-4 flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        <span>Premium</span>
                    </div>

                    {/* Image Navigation */}
                    {listing.images && listing.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            >
                                <ChevronRight className="w-4 h-4 text-gray-700" />
                            </button>

                            {/* Image Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
                                {listing.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                            ? 'bg-white shadow-lg scale-125'
                                            : 'bg-white/60 hover:bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                    {/* Location and Rating */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                            <h3 className="font-semibold text-gray-900 truncate text-lg">
                                {listing.location}
                            </h3>
                        </div>
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2.5 py-1 rounded-full shadow-sm">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="text-sm font-medium">{rating}</span>
                        </div>
                    </div>

                    {/* Distance */}
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                        <p className="text-gray-600 text-sm">
                            {distance} kilometers away
                        </p>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <p className="text-gray-600 text-sm">
                            Dec 25 – 30
                        </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                ${listing.pricePerNight}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">/ night</span>
                        </div>

                        {/* Reviews Count */}
                        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                            {reviewCount} reviews
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 px-4 rounded-xl font-medium text-sm text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg hover:shadow-xl">
                            View Details
                        </div>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
            </div>
        </a>
    );
}

export default ListingCard;