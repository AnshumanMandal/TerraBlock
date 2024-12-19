import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import RealEstateABI from '../contracts/RealEstateContract.json';
import { CONTRACT_ADDRESS, NETWORK_ID } from '../config';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const checkNetwork = async () => {
        if (window.ethereum) {
            const currentChainId = await window.ethereum.request({
                method: 'eth_chainId'
            });
            if (currentChainId !== NETWORK_ID) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: NETWORK_ID }],
                    });
                } catch (error) {
                    console.error("Error switching network:", error);
                }
            }
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                throw new Error("Please install MetaMask!");
            }
            await checkNetwork();
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccount(accounts[0]);
            await initializeContract();
        } catch (error) {
            console.error("Error connecting wallet:", error);
            throw error;
        }
    };

    const initializeContract = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const realEstateContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                RealEstateABI,
                signer
            );
            setContract(realEstateContract);
            await loadProperties();
        } catch (error) {
            console.error("Error initializing contract:", error);
            throw error;
        }
    };

    const loadProperties = async () => {
        try {
            if (!contract) return;
            setLoading(true);
            const allProperties = await contract.getAllProperties();
            // Transform the properties data as needed
            const formattedProperties = allProperties.map(prop => ({
                id: prop.id.toString(),
                name: prop.name,
                location: prop.location,
                imageUrl: prop.imageUrl,
                price: prop.price,
                tokenPrice: prop.tokenPrice,
                availableTokens: prop.availableTokens,
                isAvailable: prop.isAvailable,
                owner: prop.owner
            }));
            setProperties(formattedProperties);
        } catch (error) {
            console.error("Error loading properties:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if wallet is already connected
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' })
                .then(accounts => {
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                        initializeContract();
                    }
                });

            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    initializeContract();
                } else {
                    setAccount(null);
                    setContract(null);
                }
            });
        }
    }, []);

    return (
        <Web3Context.Provider value={{
            account,
            properties,
            loading,
            connectWallet,
            loadProperties,
            contract
        }}>
            {children}
        </Web3Context.Provider>
    );
};