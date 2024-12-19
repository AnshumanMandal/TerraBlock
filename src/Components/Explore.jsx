import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../context/Web3Context';
import PropertyMap from './Map/PropertyMap';

const Explore = () => {
    const { properties, loadProperties, purchaseTokens, account, connectWallet } = useContext(Web3Context);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            if (loadProperties) {
                await loadProperties();
            }
            setLoading(false);
        };
        init();
    }, [loadProperties]);

    const filteredProperties = properties?.filter(property => {
        if (selectedFilter === 'all') return true;
        return property.type === selectedFilter;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Filter Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Explore Properties</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setSelectedFilter('all')}
                        className={`px-4 py-2 rounded-full ${
                            selectedFilter === 'all' ? 'bg-[#E7D54E] text-black' : 'bg-[#8C8C8C] text-white'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSelectedFilter('residential')}
                        className={`px-4 py-2 rounded-full ${
                            selectedFilter === 'residential' ? 'bg-[#E7D54E] text-black' : 'bg-[#8C8C8C] text-white'
                        }`}
                    >
                        Residential
                    </button>
                    <button
                        onClick={() => setSelectedFilter('commercial')}
                        className={`px-4 py-2 rounded-full ${
                            selectedFilter === 'commercial' ? 'bg-[#E7D54E] text-black' : 'bg-[#8C8C8C] text-white'
                        }`}
                    >
                        Commercial
                    </button>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Loading properties...</p>
                    </div>
                ) : (
                    filteredProperties?.map((property) => (
                        <div key={property.id} className="bg-[#222222] rounded-lg overflow-hidden">
                            <img
                                src={property.imageUrl}
                                alt={property.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white">{property.name}</h3>
                                <p className="text-gray-400">{property.location}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <p className="text-[#E7D54E] font-bold">{property.price} ETH</p>
                                    <button
                                        onClick={() => purchaseTokens(property.id, 1)}
                                        className="bg-[#E7D54E] text-black px-4 py-2 rounded-full hover:bg-[#cfc047] transition-colors"
                                    >
                                        Buy Tokens
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Map Section */}
            <div className="my-20">
                <h2 className="text-3xl font-bold mb-6 text-white">Property Locations</h2>
                <PropertyMap properties={filteredProperties} />
            </div>
        </div>
    );
};

export default Explore;
