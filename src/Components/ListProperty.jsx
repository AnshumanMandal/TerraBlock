import React, { useState, useContext } from 'react';
import { Web3Context } from '../context/Web3Context';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const ListProperty = () => {
  const { contract, account } = useContext(Web3Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    imageUrl: '',
    price: '',
    totalTokens: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      setLoading(true);
      const priceInWei = ethers.utils.parseEther(formData.price);
      const tx = await contract.listProperty(
        formData.name,
        formData.location,
        formData.imageUrl,
        priceInWei,
        formData.totalTokens
      );
      await tx.wait();
      alert('Property listed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error listing property:', error);
      alert('Failed to list property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">List New Property</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Property Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price (ETH)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.01"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Total Tokens</label>
          <input
            type="number"
            name="totalTokens"
            value={formData.totalTokens}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Listing Property...' : 'List Property'}
        </button>
      </form>
    </div>
  );
};

export default ListProperty; 