import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

function Hero() {
    return (
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Find Your Perfect Stay
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                        Discover amazing places to stay, from cozy apartments to luxury villas,
                        all around the world.
                    </p>
                </div>

                {/* Search Form */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-2">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="pl-10 h-14 border-0 text-gray-900 placeholder-gray-500"
                                />
                            </div>

                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Check-in"
                                    className="pl-10 h-14 border-0 text-gray-900 placeholder-gray-500"
                                />
                            </div>

                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Check-out"
                                    className="pl-10 h-14 border-0 text-gray-900 placeholder-gray-500"
                                />
                            </div>

                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <select className="w-full h-14 pl-10 pr-4 rounded-lg border-0 text-gray-900 bg-white appearance-none cursor-pointer">
                                    <option>1 Guest</option>
                                    <option>2 Guests</option>
                                    <option>3 Guests</option>
                                    <option>4+ Guests</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-2">
                            <Button size="lg" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg font-semibold">
                                <Search className="h-5 w-5 mr-2" />
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                    <div>
                        <div className="text-3xl font-bold mb-2">10,000+</div>
                        <div className="text-blue-100">Properties</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold mb-2">50+</div>
                        <div className="text-blue-100">Countries</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold mb-2">1M+</div>
                        <div className="text-blue-100">Happy Guests</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;