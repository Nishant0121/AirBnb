import { useEffect, useState } from "react";
import { getListings } from "../service/listings";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ListingCard from "../components/ListingCard";
import { Input } from "@/components/ui/input";
import {
    Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, DollarSign, Sparkles } from "lucide-react";

export function ExplorePage() {
    const [allListings, setAllListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getListings();
                setAllListings(data);
                setFilteredListings(data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = allListings;

        // Apply text search
        if (searchQuery.trim()) {
            filtered = filtered.filter(listing =>
                listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                listing.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply location filter
        if (locationFilter) {
            filtered = filtered.filter(listing => listing.location === locationFilter);
        }

        // Apply price filter
        if (priceFilter) {
            const [min, max] = priceFilter.split("-").map(Number);
            filtered = filtered.filter(listing =>
                listing.pricePerNight >= min && listing.pricePerNight <= max
            );
        }

        setFilteredListings(filtered);
    }, [searchQuery, locationFilter, priceFilter, allListings]);

    const uniqueLocations = [...new Set(allListings.map(listing => listing.location))];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
                        <Sparkles className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Discovering amazing stays...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                            <Sparkles className="w-5 h-5 text-white animate-pulse" />
                            <span className="text-white font-medium">Discover Your Perfect Stay</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Find Your Dream
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                Destination
                            </span>
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Explore handpicked accommodations that turn your travels into unforgettable experiences
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 hidden sm:block left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
                <div className="absolute top-1/2 right-0 hidden sm:block w-48 h-48 bg-white/5 rounded-full translate-x-24 animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 left-1/3 hidden sm:block w-24 h-24 bg-white/10 rounded-full translate-y-12 animate-pulse delay-500"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                {/* Search and Filter Section */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-12">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                {filteredListings.length} Amazing Stays
                            </h2>
                            <p className="text-gray-600">Perfect matches for your next adventure</p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                                <Input
                                    placeholder="Search your perfect stay..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 w-full sm:w-72 h-12 bg-white/80 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder:text-gray-400"
                                />
                            </div>

                            <div className="relative group">
                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors z-10" />
                                <Select onValueChange={(val) => setLocationFilter(val === "all" ? "" : val)}>
                                    <SelectTrigger className="pl-12 w-full sm:w-48 h-12 bg-white/80 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300">
                                        <SelectValue placeholder="Choose location" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-xl">
                                        <SelectItem value="all" className="rounded-xl">All Locations</SelectItem>
                                        {uniqueLocations.map((loc, idx) => (
                                            <SelectItem key={idx} value={loc} className="rounded-xl">{loc}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="relative group">
                                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors z-10" />
                                <Select onValueChange={(val) => setPriceFilter(val === "all" ? "" : val)}>
                                    <SelectTrigger className="pl-12 w-full sm:w-48 h-12 bg-white/80 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300">
                                        <SelectValue placeholder="Price range" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-xl">
                                        <SelectItem value="all" className="rounded-xl">All Prices</SelectItem>
                                        <SelectItem value="0-100" className="rounded-xl">$0 - $100</SelectItem>
                                        <SelectItem value="101-200" className="rounded-xl">$101 - $200</SelectItem>
                                        <SelectItem value="201-300" className="rounded-xl">$201 - $300</SelectItem>
                                        <SelectItem value="301-1000" className="rounded-xl">$301+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listings Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-16">
                    {filteredListings.map((listing, index) => (
                        <div
                            key={listing._id}
                            className="transform hover:scale-105 transition-all duration-500 hover:z-10 relative"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <ListingCard listing={listing} />
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {filteredListings.length > 0 && (
                    <div className="text-center pb-16">
                        <div className="inline-block">
                            <Button
                                size="lg"
                                className="group relative  px-2  py-2 sm:py-4 sm:px-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 border-0 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative flex items-center space-x-3">
                                    <Sparkles className="w-5 hidden sm:block h-5 animate-pulse" />
                                    <span>Continue exploring amazing stays</span>
                                    <Sparkles className="w-5 hidden sm:block h-5 animate-pulse" />
                                </span>
                            </Button>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredListings.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <div className="space-y-6">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                <Search className="w-12 h-12 text-purple-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-gray-700">No stays found</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Try adjusting your search criteria or explore different locations to find your perfect stay.
                                </p>
                            </div>
                            <Button
                                onClick={() => {
                                    setSearchQuery("");
                                    setLocationFilter("");
                                    setPriceFilter("");
                                }}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-8 py-3 transition-all duration-300"
                            >
                                Clear all filters
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}